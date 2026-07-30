import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const withAuth = async (request: NextRequest) => {
	return getToken({
		req: request,
		secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
	});
};
