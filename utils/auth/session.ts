import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import { IUser } from "@/models/User";

const sessionMaxAge = 60 * 60 * 24 * 30;

const getSecret = () => {
	const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
	if (!secret) {
		throw new Error("Missing AUTH_SECRET or NEXTAUTH_SECRET.");
	}
	return secret;
};

const usesSecureCookies = () =>
	process.env.NEXTAUTH_URL?.startsWith("https://") || process.env.VERCEL === "1";

const getSessionCookieName = () =>
	usesSecureCookies() ? "__Secure-next-auth.session-token" : "next-auth.session-token";

export const createSession = async (response: NextResponse, user: IUser & { _id: { toString(): string } }) => {
	const token = await encode({
		secret: getSecret(),
		maxAge: sessionMaxAge,
		token: {
			sub: user._id.toString(),
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			role: user.role,
		},
	});

	response.cookies.set(getSessionCookieName(), token, {
		httpOnly: true,
		secure: usesSecureCookies(),
		sameSite: "lax",
		path: "/",
		maxAge: sessionMaxAge,
	});
};

export const destroySession = (response: NextResponse) => {
	response.cookies.set(getSessionCookieName(), "", {
		httpOnly: true,
		secure: usesSecureCookies(),
		sameSite: "lax",
		path: "/",
		maxAge: 0,
	});
};
