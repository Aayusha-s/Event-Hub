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

const getEnv = (key: string, fallbackKey?: string) => {
	const value = process.env[key] ?? (fallbackKey ? process.env[fallbackKey] : undefined);
	return value?.trim() || undefined;
};

export const authOptions: NextAuthOptions = {
	secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		
		maxAge: 60 * 60 * 24 * 30,
		updateAge: 60 * 60 * 24,
	},
	pages: {
		signIn: "/login",
	},
	providers: [
		...(getEnv("GOOGLE_CLIENT_ID", "GOOGLE_ID") && getEnv("GOOGLE_CLIENT_SECRET", "GOOGLE_SECRET")
			? [GoogleProvider({
					clientId: getEnv("GOOGLE_CLIENT_ID", "GOOGLE_ID")!,
					clientSecret: getEnv("GOOGLE_CLIENT_SECRET", "GOOGLE_SECRET")!,
				})]
			: []),
		...(getEnv("GITHUB_ID", "GITHUB_CLIENT_ID") && getEnv("GITHUB_SECRET", "GITHUB_CLIENT_SECRET")
			? [GitHubProvider({
					clientId: getEnv("GITHUB_ID", "GITHUB_CLIENT_ID")!,
					clientSecret: getEnv("GITHUB_SECRET", "GITHUB_CLIENT_SECRET")!,
					authorization: { params: { scope: "read:user user:email" } },
					allowDangerousEmailAccountLinking: true,
					profile(profile) {
						const email = profile.email ?? `${profile.login}@users.noreply.github.com`;
						return {
							id: String(profile.id),
							name: profile.name ?? profile.login,
							email,
							image: profile.avatar_url ?? null,
							role: "attendee",
						};
					},
				})]
			: []),
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
			// Allow credentials sign-in
			if (!account || account.provider === "credentials") return true;
			
			// Require email for OAuth providers
			if (!user.email) return false;
			
			await dbConnect();
			
			// Find or create user from OAuth
			const existingUser = await User.findOne({ email: user.email }).select("_id role status").exec();
			
			// Check if account is suspended
			if (existingUser?.status === "suspended") return false;
			
			// If user exists, link the OAuth account
			if (existingUser) {
				user.id = existingUser._id.toString();
				user.role = existingUser.role;
				return true;
			}
			
			// Create new user for OAuth signup
			const newUser = await User.create({
				name: user.name ?? "Vivnt member",
				email: user.email,
				// Generate random password for OAuth users
				password: await bcrypt.hash(randomBytes(32).toString("hex"), 12),
				role: "attendee",
				status: "active",
				interests: [],
				profileImage: user.image ?? undefined,
			});
			
			user.id = newUser._id.toString();
			user.role = newUser.role;
			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = (user.role as UserRole) ?? "attendee";
				token.name = user.name;
				token.email = user.email;
				token.picture = (user as { image?: string | null }).image ?? null;
				token.suspended = false;
			}
			if (token.id) {
				await dbConnect();
				const currentUser = await User.findById(token.id).select("name email role profileImage status").lean().exec();
				if (!currentUser || currentUser.status === "suspended") {
					token.suspended = true;
					return token;
				}

				token.suspended = false;
				token.role = currentUser.role as UserRole;
				token.name = currentUser.name;
				token.email = currentUser.email;
				token.picture = currentUser.profileImage ?? null;
			}
			return token;
		},
		async session({ session, token }) {
			if (token.suspended) {
				session.user = undefined;
				return session;
			}

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
