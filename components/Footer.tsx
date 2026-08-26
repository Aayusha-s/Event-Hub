import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    const legalLinks = [
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
        { name: 'Legal Disclaimer', href: '/legal-disclaimer' }
    ]

    const supportLinks = [
        { name: 'Help Center', href: '/helpcenter' },
        { name: 'Contact Us', href: '/contact-us' },
        { name: 'Community', href: '/community' }
    ]

    const companyLinks = [
        { name: 'About Us', href: '/aboutus' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' }

    ]

    const platformLinks = [
        { name: 'Browse Events', href: '/browseevents' },
        { name: 'Create Events', href: '/createevents' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Categories', href: '/categories' },
    ]

    const socialLinks = [
        { name: 'Facebook', href: 'https://facebook.com', icon: <i className="fa-brands fa-facebook"></i> },
        { name: 'Twitter', href: 'https://twitter.com', icon: <i className="fa-brands fa-twitter"></i> },
        { name: 'Instagram', href: 'https://instagram.com', icon: <i className="fa-brands fa-instagram"></i> },
        { name: 'LinkedIn', href: 'https://linkedin.com', icon: <i className="fa-brands fa-linkedin"></i> },
        { name: 'YouTube', href: 'https://youtube.com', icon: <i className="fa-brands fa-youtube"></i> }
    ]
    return (
        <footer className='mt-10 w-full border-t border-border bg-surface text-text-dark'>
            <div className='mx-5 grid gap-10 px-4 py-10 lg:grid-cols-6'>

                {/* Logo & Description */}
                <div className='lg:col-span-2'>
                    <div className='mb-5'>
                        <Image
                            src="/VivntLogo.png"
                            alt="Vivnt"
                            width={145}
                            height={52}
                            className='h-auto w-[145px] cursor-pointer'
                        />
                    </div>
                    <p className='mb-6 max-w-[320px] text-text-light'>
                        Discover, create, and manage unforgettable events.
                        Connect with your community and make memories that last.
                    </p>
                    <div className="space-y-2 text-text-light">
                        <p className='flex items-center gap-2'>
                            <i className="fa-solid fa-envelope w-4"></i>
                            hello@eventhub.com
                        </p>
                        <p className='flex items-center gap-2'>
                            <i className="fa-solid fa-phone w-4"></i>
                            9882763428
                        </p>
                        <p className='flex items-center gap-2'>
                            <i className="fa-solid fa-location-dot w-4"></i>
                            Kuleshwor, Kathmandu
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:col-span-4">
                    {/* Platform Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-text-dark">Platform</h3>
                        <ul className="space-y-2">
                            {platformLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href}
                                        className='text-text-light transition-colors duration-200 ease-in-out hover:text-primary'>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-text-dark">Legal</h3>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href}
                                        className='text-text-light transition-colors duration-200 ease-in-out hover:text-primary'>
                                        {link.name}</Link>
                                </li>
                            )
                            )}


                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-text-dark">Company</h3>
                        <ul className="space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href}
                                        className='text-text-light transition-colors duration-200 ease-in-out hover:text-primary'>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-text-dark">Support</h3>
                        <ul className="space-y-2">
                            {supportLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href}
                                        className='text-text-light transition-colors duration-200 ease-in-out hover:text-primary'>
                                        {link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    
                </div>

            </div>

            {/* Bottom Section - Social & Copyright */}
            <div className='mx-5 mt-6 border-t border-divider px-4 py-6'>
                <div className='flex flex-col justify-between gap-4 md:flex-row lg:flex-row'>
                    
                    {/* Copyright */}
                    <div className= "flex items-center justify-center text-sm text-text-light lg:justify-start">
                        <p>© 2024 EventHub. All rights reserved.</p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-3 md:justify-end lg:justify-end">
                        {socialLinks.map((link) => (
                            <div key={link.name}>
                                <Link href={link.href}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-sm"
                                >
                                    {link.icon}
                                </Link>
                            </div>
                        ))}
                    </div>

                    
                </div>
            </div>
        </footer>
    )
}

export default Footer
