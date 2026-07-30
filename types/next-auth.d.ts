import "next-auth";
import "next-auth/jwt";
import { UserRole } from "@/types/auth/roles";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			role: UserRole;
		} & DefaultSession["user"];
	}

	interface User {
		role: UserRole;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id?: string;
		role?: UserRole;
	}
}
