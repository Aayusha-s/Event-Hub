import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { UserRole } from "@/types";

const roleProtectedRoutes: Array<{ prefix: string; roles: UserRole[] }> = [
	{ prefix: "/analytics", roles: ["admin", "organizer"] },
	{ prefix: "/admin", roles: ["admin"] },
	{ prefix: "/organizerdashboard", roles: ["organizer"] },
	{ prefix: "/vendordashboard", roles: ["vendor"] },
	{ prefix: "/vendor/events", roles: ["vendor"] },
	{ prefix: "/vendor/profile", roles: ["vendor"] },
	{ prefix: "/create-event", roles: ["organizer"] },
	{ prefix: "/ticket-checker", roles: ["ticket_checker"] },
];

const authRequiredPrefixes = [
	"/userdashboard",
	"/userprofile",
	"/settings",
	"/notification",
	"/messages",
	"/create-event",
	"/booknow",
	"/premium",
	"/ticket-checker",
	"/api/payments/esewa/callback",
	"/analytics",
	"/admin",
	"/organizerdashboard",
	"/vendordashboard",
];

const publicRoutes = [
	"/login",
	"/signup",
	"/access-denied",
	"/privacy-policy",
	"/terms-of-service",
	"/cookie-policy",
	"/legal-disclaimer",
	"/contact-us",
	"/",
	"/explore-events",
	"/community",
	"/categories",
	"/challenges",
	"/event-tags",
	"/event-details",
	"/organizer",
	"/vendor/vendorapplication-1",
	"/vendor/vendorapplication-2",
	"/vendor/vendorapplication-3",
];

const isPathMatch = (pathname: string, prefix: string) => pathname === prefix || pathname.startsWith(`${prefix}/`);
const isPublicRoute = (pathname: string) => publicRoutes.some((route) => isPathMatch(pathname, route));

const getRouteAccess = (pathname: string) => {
	const roleProtectedRoute = roleProtectedRoutes.find(({ prefix }) => isPathMatch(pathname, prefix));
	if (roleProtectedRoute) {
		return { type: "role" as const, roles: roleProtectedRoute.roles };
	}

	if (authRequiredPrefixes.some((prefix) => isPathMatch(pathname, prefix))) {
		return { type: "auth" as const };
	}

	return { type: "public" as const };
};

export default withAuth(
	function middleware(request) {
		const pathname = request.nextUrl.pathname;
		if (isPublicRoute(pathname)) {
			return NextResponse.next();
		}

		const routeAccess = getRouteAccess(pathname);
		const role = request.nextauth.token?.role as UserRole | undefined;

		if (routeAccess.type === "public") {
			return NextResponse.next();
		}

		if (!role) {
			const loginUrl = new URL("/login", request.url);
			loginUrl.searchParams.set("callbackUrl", request.url);
			return NextResponse.redirect(loginUrl);
		}

		if (routeAccess.type === "role" && !routeAccess.roles.includes(role)) {
			return NextResponse.redirect(new URL("/access-denied", request.url));
		}

		return NextResponse.next();
	},
	{
		secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
		callbacks: {
			authorized: ({ token, req }) => {
				const pathname = req.nextUrl.pathname;
				if (isPublicRoute(pathname)) {
					return true;
				}

				const routeAccess = getRouteAccess(pathname);
				if (routeAccess.type === "public") {
					return true;
				}

				if (!token) {
					return false;
				}

				if (routeAccess.type === "role") {
					return routeAccess.roles.includes(token.role as UserRole);
				}

				return true;
			},
		},
	}
);

export const config = {
	matcher: [
		"/analytics/:path*",
		"/admin/:path*",
		"/organizerdashboard/:path*",
		"/vendordashboard/:path*",
		"/vendor/events/:path*",
		"/vendor/profile/:path*",
		"/userdashboard/:path*",
		"/userprofile/:path*",
		"/settings/:path*",
		"/notification/:path*",
		"/messages/:path*",
		"/create-event/:path*",
		"/booknow/:path*",
		"/premium/:path*",
		"/ticket-checker/:path*",
	],
};
