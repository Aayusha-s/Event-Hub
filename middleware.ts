import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { UserRole } from "@/types";

const roleProtectedRoutes: Array<{ prefix: string; roles: UserRole[] }> = [
	{ prefix: "/analytics", roles: ["admin"] },
	{ prefix: "/admin", roles: ["admin"] },
	{ prefix: "/organizerdashboard", roles: ["admin", "organizer"] },
	{ prefix: "/vendordashboard", roles: ["admin", "vendor"] },
	{ prefix: "/create-event", roles: ["admin", "organizer"] },
	{ prefix: "/ticket-checker", roles: ["admin", "ticket_checker"] },
];

export default withAuth(
	function middleware(request) {
		const protectedRoute = roleProtectedRoutes.find(({ prefix }) => request.nextUrl.pathname.startsWith(prefix));
		const role = request.nextauth.token?.role as UserRole | undefined;

		if (protectedRoute && (!role || !protectedRoute.roles.includes(role))) {
			return NextResponse.redirect(new URL("/access-denied", request.url));
		}

		return NextResponse.next();
	},
	{
		secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
		callbacks: {
			authorized: ({ token }) => Boolean(token),
		},
	}
);

export const config = {
	matcher: [
		"/analytics/:path*",
		"/admin/:path*",
		"/organizerdashboard/:path*",
		"/vendordashboard/:path*",
		"/userdashboard/:path*",
		"/settings/:path*",
		"/notification/:path*",
		"/messages/:path*",
		"/create-event/:path*",
		"/booknow/:path*",
		"/premium/:path*",
		"/ticket-checker/:path*",
	],
};
