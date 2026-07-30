import { UserRole } from "@/types";

export type NavItem = {
	label: string;
	href: string;
};

export const guestNav: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Events", href: "/explore-events" },
	{ label: "Vendors", href: "/vendors" },
	{ label: "Login", href: "/login" },
	{ label: "Register", href: "/signup" },
];

export const attendeeNav: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Events", href: "/explore-events" },
	{ label: "My Tickets", href: "/userdashboard" },
	{ label: "Profile", href: "/userprofile" },
	{ label: "Settings", href: "/settings/profile" },
];

export const organizerNav: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Events", href: "/explore-events" },
	{ label: "Create Event", href: "/create-event/step-1" },
	{ label: "My Events", href: "/explore-events?organizer=me" },
	{ label: "Organizer Dashboard", href: "/organizerdashboard" },
	{ label: "Profile", href: "/userprofile" },
	{ label: "Settings", href: "/settings/profile" },
];

export const vendorNav: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Events", href: "/explore-events" },
	{ label: "Vendor Dashboard", href: "/vendordashboard" },
	{ label: "Create Stall", href: "/vendor/vendorapplication-1" },
	{ label: "My Stalls", href: "/vendordashboard#stalls" },
	{ label: "Bookings", href: "/vendordashboard#bookings" },
	{ label: "Profile", href: "/userprofile" },
];

export const ticketCheckerNav: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Scan QR", href: "/ticket-checker" },
	{ label: "Check In", href: "/ticket-checker" },
	{ label: "Profile", href: "/userprofile" },
];

export const adminNav: NavItem[] = [
	{ label: "Dashboard", href: "/admin" },
	{ label: "Manage Users", href: "/admin/users" },
	{ label: "Manage Events", href: "/admin/events" },
	{ label: "Manage Vendors", href: "/admin/vendors" },
	{ label: "Analytics", href: "/analytics" },
	{ label: "Reports", href: "/admin/reports" },
	{ label: "Settings", href: "/settings/profile" },
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
