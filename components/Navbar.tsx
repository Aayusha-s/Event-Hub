"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import {
	Bell,
	CalendarPlus,
	ChevronDown,
	CircleUserRound,
	ClipboardCheck,
	LayoutDashboard,
	LogOut,
	MessageSquare,
	Menu,
	PlusCircle,
	Settings,
	ShieldCheck,
	Store,
	Ticket,
	Trophy,
	Users,
	X,
} from "lucide-react";
import Button from "@/components/Button";
import Searchbar from "@/components/Searchbar";
import ManageRoles from "@/components/ManageRoles";
import { UserRole } from "@/types";
import { cn } from "@/lib/utils";

type DropdownLink = {
	label: string;
	href: string;
	icon: React.ReactNode;
};

type NavLink = {
	label: string;
	href: string;
};

const iconSize = 16;

/** Top-level nav links (left side, next to the logo) per role. */
const NAV_LINKS: Record<"guest" | UserRole, NavLink[]> = {
	guest: [
		{ label: "Home", href: "/" },
		{ label: "Explore", href: "/explore-events" },
	],
	attendee: [
		{ label: "Home", href: "/" },
		{ label: "Explore", href: "/explore-events" },
	],
	organizer: [
		{ label: "Dashboard", href: "/organizerdashboard" },
		{ label: "Explore", href: "/explore-events" },
	],
	vendor: [
		{ label: "Dashboard", href: "/vendordashboard" },
		{ label: "Explore", href: "/explore-events" },
	],
	admin: [
		{ label: "Dashboard", href: "/admin" },
		{ label: "Users", href: "/admin/users" },
		{ label: "Events", href: "/admin/events" },
		{ label: "Reports", href: "/analytics" },
		{ label: "Analytics", href: "/analytics" },
	],
	ticket_checker: [
		{ label: "Dashboard", href: "/ticket-checker" },
		{ label: "Scanner", href: "/ticket-checker" },
		{ label: "Manual Check", href: "/ticket-checker" },
		{ label: "Attendance Log", href: "/ticket-checker" },
	],
};

/** User-menu dropdown links per role. */
const DROPDOWN_LINKS: Record<UserRole, DropdownLink[]> = {
	attendee: [
		{ label: "My Profile", href: "/userprofile", icon: <CircleUserRound size={iconSize} /> },
		{ label: "My Tickets", href: "/userdashboard", icon: <Ticket size={iconSize} /> },
		{ label: "Saved Events", href: "/explore-events?saved=true", icon: <Trophy size={iconSize} /> },
		{ label: "Community", href: "/community", icon: <Users size={iconSize} /> },
		{ label: "Challenges", href: "/challenges", icon: <Trophy size={iconSize} /> },
		{ label: "Settings", href: "/settings/profile", icon: <Settings size={iconSize} /> },
	],
	organizer: [
		{ label: "My Profile", href: "/userprofile", icon: <CircleUserRound size={iconSize} /> },
		{ label: "My Events", href: "/explore-events?organizer=me", icon: <CalendarPlus size={iconSize} /> },
		{ label: "Organizer Dashboard", href: "/organizerdashboard", icon: <LayoutDashboard size={iconSize} /> },
		{ label: "Settings", href: "/settings/profile", icon: <Settings size={iconSize} /> },
	],
	vendor: [
		{ label: "My Profile", href: "/userprofile", icon: <CircleUserRound size={iconSize} /> },
		{ label: "Vendor Dashboard", href: "/vendordashboard", icon: <LayoutDashboard size={iconSize} /> },
		{ label: "My Stalls", href: "/vendordashboard", icon: <Store size={iconSize} /> },
		{ label: "Settings", href: "/settings/profile", icon: <Settings size={iconSize} /> },
	],
	admin: [
		{ label: "My Profile", href: "/userprofile", icon: <CircleUserRound size={iconSize} /> },
		{ label: "System Settings", href: "/settings/account", icon: <ShieldCheck size={iconSize} /> },
	],
	ticket_checker: [
		{ label: "My Profile", href: "/userprofile", icon: <CircleUserRound size={iconSize} /> },
	],
};

const Navbar = () => {
	const { data: session, status } = useSession();
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [isRolePopupOpen, setIsRolePopupOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const avatarButtonRef = useRef<HTMLButtonElement>(null);
	const userMenuRef = useRef<HTMLDivElement>(null);
	const notificationRef = useRef<HTMLDivElement>(null);
	const notificationButtonRef = useRef<HTMLButtonElement>(null);

	const isAuthenticated = status === "authenticated" && Boolean(session?.user);
	const role = (isAuthenticated ? (session?.user?.role as UserRole | undefined) : undefined) ?? undefined;
	const navLinks = NAV_LINKS[role ?? "guest"];
	const dropdownLinks = role ? DROPDOWN_LINKS[role] : [];
	const displayName = session?.user?.name ?? "Guest";
	const profileImage = (session?.user?.image as string | undefined) ?? undefined;

	useEffect(() => {
		const handlePointerDown = (event: MouseEvent) => {
			const target = event.target as Node;
			if (userMenuOpen && userMenuRef.current && !userMenuRef.current.contains(target) && !avatarButtonRef.current?.contains(target)) {
				setUserMenuOpen(false);
			}
			if (
				isNotificationOpen &&
				notificationRef.current &&
				!notificationRef.current.contains(target) &&
				!notificationButtonRef.current?.contains(target)
			) {
				setIsNotificationOpen(false);
			}
			if (menuOpen && !(event.target instanceof Node)) {
				return;
			}
			if (menuOpen && !(event.target as HTMLElement).closest("header")) {
				setMenuOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setUserMenuOpen(false);
				setMenuOpen(false);
				setIsNotificationOpen(false);
			}
		};

		document.addEventListener("mousedown", handlePointerDown);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("mousedown", handlePointerDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [menuOpen, userMenuOpen, isNotificationOpen]);

	const handleLogout = async () => {
		await fetch("/api/auth/logout", { method: "POST" });
		await signOut({ callbackUrl: "/" });
	};

	if (pathname === "/login" || pathname === "/signup") {
		return null;
	}

	const isLinkActive = (href: string) => {
		const [base] = href.split("?");
		return pathname === base || (base !== "/" && pathname.startsWith(`${base}/`));
	};

	return (
		<header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-border bg-surface/95 text-text-dark shadow-sm backdrop-blur-md">
			<div className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link href="/" className="shrink-0">
					<div className="relative h-[60px] w-[120px] cursor-pointer">
						<Image src="/images/logo.png" alt="EventHub Logo" fill style={{ objectFit: "contain" }} sizes="130px" />
					</div>
				</Link>

				{/* Primary nav links */}
				<nav className="hidden shrink-0 items-center gap-1 lg:flex">
					{navLinks.map((item) => (
						<Link
							key={item.href + item.label}
							href={item.href}
							className={cn(
								"whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-hover hover:text-primary",
								isLinkActive(item.href) ? "text-primary" : "text-text-dark"
							)}
						>
							{item.label}
						</Link>
					))}

					{/* Organizer: Create Event button */}
					{isAuthenticated && role === "organizer" && (
						<Link href="/create-event/step-1">
							<Button text="Create Event" variant="cta" size="sm" iconLeft={<PlusCircle size={16} />} />
						</Link>
					)}

					{/* Vendor: Create Stall button */}
					{isAuthenticated && role === "vendor" && (
						<Link href="/vendordashboard">
							<Button text="Create Stall" variant="cta" size="sm" iconLeft={<Store size={16} />} />
						</Link>
					)}
				</nav>

				{/* Centered search bar */}
				<div className="hidden min-w-0 flex-1 md:flex md:justify-center">
					<div className="w-full max-w-xl">
						<Suspense fallback={<div className="h-11 w-full rounded-full border border-border bg-surface" />}>
							<Searchbar compact />
						</Suspense>
					</div>
				</div>

				{/* Right-side actions */}
				<div className="flex shrink-0 items-center gap-1.5">
					{!isAuthenticated ? (
						<div className="hidden items-center gap-2 sm:flex">
							<Link href="/login">
								<Button text="Log In" variant="secondary" size="sm" />
							</Link>
							<Link href="/signup">
								<Button text="Sign Up" variant="cta" size="sm" />
							</Link>
						</div>
					) : (
						<>
							{/* Message icon: hidden for admin per spec */}
							{role !== "admin" && (
								<Link
									href="/messages"
									className="hidden rounded-full p-2 transition-colors hover:bg-surface-hover hover:text-primary sm:block"
									aria-label="Messages"
								>
									<MessageSquare size={20} />
								</Link>
							)}

							{/* Notification icon (all authenticated roles) */}
							<div className="relative hidden sm:block">
								<button
									type="button"
									ref={notificationButtonRef}
									onClick={() => setIsNotificationOpen((open) => !open)}
									className={cn(
										"rounded-full p-2 transition-colors hover:bg-surface-hover hover:text-primary",
										isNotificationOpen && "bg-surface-hover text-primary"
									)}
									aria-label="Notifications"
									aria-expanded={isNotificationOpen}
								>
									<Bell size={20} />
								</button>

								{isNotificationOpen && (
									<div
										ref={notificationRef}
										className="absolute right-0 top-[calc(100%+10px)] z-60 w-80 rounded-2xl border border-border bg-surface shadow-xl"
									>
										<div className="px-4 pt-4">
											<p className="mb-2 text-base font-semibold text-text-dark">Notifications</p>
											<div className="border-t border-divider" />
										</div>
										<div className="p-4 text-sm text-text-light">No new notifications.</div>
										<Link
											href="/notification"
											className="block px-4 pb-4 text-center text-sm text-primary hover:underline"
											onClick={() => setIsNotificationOpen(false)}
										>
											View All Notifications
										</Link>
									</div>
								)}
							</div>

							{/* User dropdown trigger */}
							<button
								type="button"
								ref={avatarButtonRef}
								className="flex items-center gap-1 rounded-full p-1.5 transition-colors hover:bg-surface-hover"
								onClick={() => setUserMenuOpen((open) => !open)}
								aria-expanded={userMenuOpen}
							>
								{profileImage ? (
									<Image src={profileImage} alt={displayName} width={32} height={32} unoptimized className="h-8 w-8 rounded-full object-cover" />
								) : (
									<CircleUserRound size={32} strokeWidth={1.3} />
								)}
								<span className="hidden max-w-[110px] truncate text-sm font-medium md:inline">{displayName}</span>
								<ChevronDown size={16} className={cn("transition-transform", userMenuOpen && "rotate-180")} />
							</button>
						</>
					)}

					{/* Mobile menu toggle */}
					<button
						type="button"
						className="rounded-lg p-2 lg:hidden"
						onClick={() => setMenuOpen((open) => !open)}
						aria-label="Toggle menu"
					>
						{menuOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>
			</div>

			{/* Mobile: search bar + nav links */}
			{menuOpen && (
				<div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
					<div className="mb-4 md:hidden">
						<Suspense fallback={<div className="h-11 w-full rounded-full border border-border bg-surface" />}>
							<Searchbar compact />
						</Suspense>
					</div>

					<nav className="flex flex-col gap-1">
						{navLinks.map((item) => (
							<Link
								key={item.href + item.label}
								href={item.href}
								className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-hover"
								onClick={() => setMenuOpen(false)}
							>
								{item.label}
							</Link>
						))}

						{isAuthenticated && role === "organizer" && (
							<Link href="/create-event/step-1" className="rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-surface-hover" onClick={() => setMenuOpen(false)}>
								Create Event
							</Link>
						)}
						{isAuthenticated && role === "vendor" && (
							<Link href="/vendordashboard" className="rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-surface-hover" onClick={() => setMenuOpen(false)}>
								Create Stall
							</Link>
						)}

						{isAuthenticated && role !== "admin" && (
							<Link href="/messages" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-hover" onClick={() => setMenuOpen(false)}>
								Messages
							</Link>
						)}
						{isAuthenticated && (
							<Link href="/notification" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-hover" onClick={() => setMenuOpen(false)}>
								Notifications
							</Link>
						)}

						{isAuthenticated &&
							dropdownLinks.map((item) => (
								<Link
									key={item.href + item.label}
									href={item.href}
									className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-hover"
									onClick={() => setMenuOpen(false)}
								>
									{item.label}
								</Link>
							))}

						{!isAuthenticated ? (
							<>
								<Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-hover" onClick={() => setMenuOpen(false)}>
									Login
								</Link>
								<Link href="/signup" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-surface-hover" onClick={() => setMenuOpen(false)}>
									Sign Up
								</Link>
							</>
						) : (
							<button type="button" className="rounded-lg px-3 py-2 text-left text-sm font-medium text-error hover:bg-surface-hover" onClick={handleLogout}>
								Logout
							</button>
						)}
					</nav>
				</div>
			)}

			{/* User dropdown menu */}
			{userMenuOpen && isAuthenticated && (
				<div ref={userMenuRef} className="absolute right-4 top-[72px] z-60 w-64 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl transition-all duration-200">
					<div className="flex items-center gap-3 border-b border-divider px-4 py-4">
						{profileImage ? (
							<Image src={profileImage} alt={displayName} width={48} height={48} unoptimized className="h-12 w-12 rounded-full object-cover" />
						) : (
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-hover text-text-dark">
								<CircleUserRound size={24} />
							</div>
						)}
						<div className="min-w-0">
							<p className="truncate text-base font-semibold text-text-dark">{displayName}</p>
							<p className="truncate text-sm capitalize text-text-light">{role?.replace("_", " ")}</p>
						</div>
					</div>

					{role === "attendee" && (
						<button
							type="button"
							className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-3 text-left transition hover:bg-surface-hover"
							onClick={() => {
								setUserMenuOpen(false);
								setIsRolePopupOpen(true);
							}}
						>
							<ClipboardCheck size={iconSize} />
							Manage Roles
						</button>
					)}

					{dropdownLinks.map((item) => (
						<Link key={item.href + item.label} href={item.href} onClick={() => setUserMenuOpen(false)}>
							<div className="flex cursor-pointer items-center gap-2.5 px-4 py-3 transition hover:bg-surface-hover">
								{item.icon}
								{item.label}
							</div>
						</Link>
					))}

					<button
						type="button"
						className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-3 text-error transition hover:bg-surface-hover"
						onClick={handleLogout}
					>
						<LogOut size={iconSize} />
						Logout
					</button>
				</div>
			)}

			<ManageRoles
				isOpen={isRolePopupOpen}
				onClose={() => {
					setIsRolePopupOpen(false);
					setUserMenuOpen(false);
				}}
			/>
		</header>
	);
};

export default Navbar;
