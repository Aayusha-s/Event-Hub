"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, CircleUserRound, LogOut, Menu, X } from "lucide-react";
import Button from "@/components/Button";
import Searchbar from "@/components/Searchbar";
import ManageRoles from "@/components/ManageRoles";
import { getNavItemsForRole } from "@/lib/navigation";
import { UserRole } from "@/types";

const Navbar = () => {
	const { data: session, status } = useSession();
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [isRolePopupOpen, setIsRolePopupOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const avatarButtonRef = useRef<HTMLButtonElement>(null);
	const userMenuRef = useRef<HTMLDivElement>(null);

	const isAuthenticated = status === "authenticated" && Boolean(session?.user);
	const role = session?.user?.role as UserRole | undefined;
	const navItems = getNavItemsForRole(isAuthenticated ? role : null);
	const displayName = session?.user?.name ?? "Guest";
	const profileImage = (session?.user?.image as string | undefined) ?? undefined;

	useEffect(() => {
		const handlePointerDown = (event: MouseEvent) => {
			const target = event.target as Node;
			if (userMenuOpen && userMenuRef.current && !userMenuRef.current.contains(target) && !avatarButtonRef.current?.contains(target)) {
				setUserMenuOpen(false);
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
	}, [menuOpen, userMenuOpen]);

	const handleLogout = async () => {
		await fetch("/api/auth/logout", { method: "POST" });
		await signOut({ callbackUrl: "/" });
	};

	if (pathname === "/login" || pathname === "/signup") {
		return null;
	}

	return (
		<header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-border bg-surface/95 text-text-dark shadow-sm backdrop-blur-md">
			<div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-4">
					<Link href="/">
						<div className="relative h-[60px] w-[120px] cursor-pointer">
							<Image src="/images/logo.png" alt="EventHub Logo" fill style={{ objectFit: "contain" }} sizes="130px" />
						</div>
					</Link>

					<nav className="hidden items-center gap-1 lg:flex">
						{navItems
							.filter((item) => !["Login", "Sign Up", "Register", "Logout"].includes(item.label))
							.map((item) => (
								<Link
									key={item.href + item.label}
									href={item.href}
									className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-hover hover:text-primary ${
										pathname === item.href || pathname.startsWith(`${item.href}/`) ? "text-primary" : "text-text-dark"
									}`}
								>
									{item.label}
								</Link>
							))}
					</nav>
				</div>

				<div className="hidden flex-1 max-w-2xl md:flex mx-4">
					<Suspense fallback={<div className="h-10 w-full rounded-full border border-border bg-surface" />}>
						<Searchbar />
					</Suspense>
				</div>

				<div className="flex items-center gap-2">
					{!isAuthenticated ? (
						<div className="hidden items-center gap-3 sm:flex">
							<Link href="/login">
								<Button text="Log In" variant="secondary" size="sm" />
							</Link>
							<Link href="/signup">
								<Button text="Sign Up" variant="cta" size="sm" />
							</Link>
						</div>
					) : (
						<>
							<Link href="/notification" className="hidden rounded-full p-2 transition-colors hover:bg-surface-hover hover:text-primary sm:block">
								<Bell size={22} />
							</Link>

							<button
								type="button"
								ref={avatarButtonRef}
								className="flex items-center gap-1 rounded-full p-1.5 transition-colors hover:bg-surface-hover"
								onClick={() => setUserMenuOpen(!userMenuOpen)}
							>
								{profileImage ? (
									<img src={profileImage} alt={displayName} className="h-8 w-8 rounded-full object-cover" />
								) : (
									<CircleUserRound size={32} strokeWidth={1.3} />
								)}
								<span className="hidden max-w-[120px] truncate text-sm font-medium md:inline">{displayName}</span>
								<ChevronDown size={18} />
							</button>
						</>
					)}

					<button
						type="button"
						className="rounded-lg p-2 lg:hidden"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label="Toggle menu"
					>
						{menuOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>
			</div>

			{menuOpen && (
				<div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
					<nav className="flex flex-col gap-1">
						{navItems
							.filter((item) => !["Login", "Sign Up", "Register", "Logout"].includes(item.label))
							.map((item) => (
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
									Register
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

			{userMenuOpen && isAuthenticated && (
				<div ref={userMenuRef} className="absolute right-4 top-[72px] z-[60] w-64 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl transition-all duration-200">
					<div className="flex items-center gap-3 border-b border-divider px-4 py-4">
						{profileImage ? (
							<img src={profileImage} alt={displayName} className="h-12 w-12 rounded-full object-cover" />
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
							className="w-full cursor-pointer px-4 py-3 text-left transition hover:bg-surface-hover"
							onClick={() => {
								setUserMenuOpen(false);
								setIsRolePopupOpen(true);
							}}
						>
							Manage Roles
						</button>
					)}

					<Link href="/settings/profile" onClick={() => setUserMenuOpen(false)}>
						<div className="cursor-pointer px-4 py-3 transition hover:bg-surface-hover">Settings</div>
					</Link>

					<button
						type="button"
						className="flex w-full cursor-pointer items-center gap-1 px-4 py-3 text-error transition hover:bg-surface-hover"
						onClick={handleLogout}
					>
						<LogOut size={18} />
						Logout
					</button>
				</div>
			)}

			{isNotificationOpen && (
				<div className="absolute right-6 top-[72px] z-50 w-80 rounded-2xl border border-border bg-surface shadow-lg md:right-20">
					<div className="px-4 pt-4">
						<p className="mb-2 text-lg font-semibold text-text-dark">Notifications</p>
						<div className="border-t border-divider" />
					</div>
					<div className="p-4 text-sm text-text-light">No new notifications.</div>
					<Link href="/notification" className="block px-4 pb-4 text-center text-primary hover:underline">
						View All Notifications
					</Link>
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
