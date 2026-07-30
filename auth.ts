import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { UserRole } from "@/types";
import { validateLoginInput } from "@/utils/auth/validation";

export const authOptions: NextAuthOptions = {
	secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 30,
	},
	pages: {
		signIn: "/login",
	},
	providers: [
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
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = (user.role as UserRole) ?? "attendee";
				token.name = user.name;
				token.email = user.email;
				token.picture = (user as { image?: string | null }).image ?? null;
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
