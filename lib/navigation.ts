import { UserRole } from "@/types";

export type NavItem = {
	label: string;
	href: string;
};

export const guestNav: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Explore", href: "/explore-events" },
	{ label: "Community", href: "/community" },
	{ label: "Login", href: "/login" },
	{ label: "Sign Up", href: "/signup" },
];

export const attendeeNav: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Explore", href: "/explore-events" },
	{ label: "My Tickets", href: "/userdashboard" },
	{ label: "Saved Events", href: "/explore-events" },
	{ label: "Community", href: "/community" },
	{ label: "Challenges", href: "/challenges" },
	{ label: "Messages", href: "/messages" },
	{ label: "Notifications", href: "/notification" },
	{ label: "Profile", href: "/userprofile" },
];

export const organizerNav: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Explore", href: "/explore-events" },
	{ label: "Create Event", href: "/create-event/step-1" },
	{ label: "My Events", href: "/organizerdashboard/events" },
	{ label: "Organizer Dashboard", href: "/organizerdashboard" },
	{ label: "Messages", href: "/messages" },
	{ label: "Notifications", href: "/notification" },
	{ label: "Profile", href: "/userprofile" },
];

export const vendorNav: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Explore", href: "/explore-events" },
	{ label: "Vendor Dashboard", href: "/vendordashboard" },
	{ label: "My Events", href: "/vendor/events" },
	{ label: "Vendor Profile", href: "/vendor/profile" },
	{ label: "Messages", href: "/messages" },
	{ label: "Notifications", href: "/notification" },
	{ label: "Profile", href: "/userprofile" },
];

export const ticketCheckerNav: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Check In", href: "/ticket-checker" },
	{ label: "Scan QR", href: "/ticket-checker" },
	{ label: "Messages", href: "/messages" },
	{ label: "Notifications", href: "/notification" },
	{ label: "Profile", href: "/userprofile" },
];

export const adminNav: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Admin Dashboard", href: "/admin" },
	{ label: "Manage Users", href: "/admin/users" },
	{ label: "Manage Events", href: "/admin/events" },
	{ label: "Reports", href: "/analytics" },
	{ label: "Notifications", href: "/notification" },
];

export const getNavItemsForRole = (role?: UserRole | null): NavItem[] => {
	switch (role) {
		case "admin":
			return adminNav;
		case "organizer":
			return organizerNav;
		case "vendor":
			return vendorNav;
		case "ticket_checker":
			return ticketCheckerNav;
		case "attendee":
			return attendeeNav;
		default:
			return guestNav;
	}
};
