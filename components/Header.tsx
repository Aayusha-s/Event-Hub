import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import Searchbar from "./Searchbar";

const Header = () => {
    return (
        <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-border bg-surface/95 shadow-sm backdrop-blur-md">
            <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="nav-left">
                    <Link href="/">
                        <div className="relative h-[60px] w-[120px] cursor-pointer">
                            <Image
                                src="/images/logo.png"
                                alt="EventHub Logo"
                                fill
                                style={{ objectFit: "contain" }}
                                sizes="130px"
                            />
                        </div>
                    </Link>
                </div>

                <div className="hidden flex-1 max-w-3xl md:flex mx-6">
                    <Searchbar />
                </div>

                <div className="nav-right flex items-center gap-4">
                    <Link href="/login">
                        <Button text="Log In" variant="cta" size="sm" />
                    </Link>
                    <Link href="/signup">
                        <Button text="Sign Up" variant="cta" size="sm" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;