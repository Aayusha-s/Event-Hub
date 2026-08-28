import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { randomBytes } from "crypto";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { UserRole } from "@/types";
import { validateLoginInput } from "@/utils/auth/validation";

export const authOptions: NextAuthOptions = {
	secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		// NextAuth keeps its signed, HttpOnly session cookie valid for this period.
		maxAge: 60 * 60 * 24 * 30,
		updateAge: 60 * 60 * 24,
	},
	pages: {
		signIn: "/login",
	},
	providers: [
		...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET })] : []),
		...(process.env.GITHUB_ID && process.env.GITHUB_SECRET ? [GitHubProvider({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET })] : []),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = validateLoginInput(credentials);
				await dbConnect();

				const user = await User.findOne({ email }).select("+password").exec();
				if (user?.status === "suspended") return null;
				if (!user || !(await bcrypt.compare(password, user.password))) {
					return null;
				}
				return {
					id: user._id.toString(),
					name: user.name,
					email: user.email,
					role: user.role as UserRole,
					image: user.profileImage ?? null,
				};
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (!account || account.provider === "credentials") return true;
			if (!user.email) return false;
			await dbConnect();
			const existing = await User.findOne({ email: user.email }).select("_id role").exec();
			const linked = existing ?? await User.create({ name: user.name ?? "Vivnt member", email: user.email, password: await bcrypt.hash(randomBytes(32).toString("hex"), 12), role: "attendee", interests: [] });
			user.id = linked._id.toString();
			user.role = linked.role as UserRole;
			return true;
		},
		async jwt({ token, user, trigger }) {
			if (user) {
				token.id = user.id;
				token.role = (user.role as UserRole) ?? "attendee";
				token.name = user.name;
				token.email = user.email;
				token.picture = (user as { image?: string | null }).image ?? null;
			}
			if (trigger === "update" && token.id) {
				await dbConnect();
				const currentUser = await User.findById(token.id).select("name email role profileImage").lean().exec();
				if (currentUser) {
					token.role = currentUser.role as UserRole;
					token.name = currentUser.name;
					token.email = currentUser.email;
					token.picture = currentUser.profileImage ?? null;
				}
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = (token.id as string) ?? "";
				session.user.role = (token.role as UserRole) ?? "attendee";
				session.user.name = (token.name as string) ?? session.user.name;
				session.user.email = (token.email as string | null) ?? session.user.email;
				session.user.image = (token.picture as string | null) ?? session.user.image ?? null;
			}
			return session;
		},
	},
};
