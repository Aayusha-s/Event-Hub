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
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.role = token.role as UserRole;
			}
			return session;
		},
	},
};
