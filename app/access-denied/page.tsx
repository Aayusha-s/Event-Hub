import Link from "next/link";
import Button from "@/components/Button";

export default function AccessDeniedPage() {
	return (
		<section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
			<h1 className="font-dynapuff text-3xl font-bold text-text-dark">Access Denied</h1>
			<p className="mt-4 text-text-light">
				You do not have permission to access this page. Please sign in with the correct account or contact support.
			</p>
			<div className="mt-8 flex gap-4">
				<Link href="/">
					<Button text="Go Home" variant="secondary" />
				</Link>
				<Link href="/login">
					<Button text="Sign In" variant="cta" />
				</Link>
			</div>
		</section>
	);
}
