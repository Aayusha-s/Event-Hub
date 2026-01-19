import Link from "next/link";

const Footer = () => {
    const legalLinks = [
        { name: 'Terms of Service', href: '/termsofservice' },
        { name: 'Privacy Policy', href: '/privacypolicy' },
        { name: 'Cookie Policy', href: '/cookiepolicy' },
        { name: 'Legal Disclaimer', href: '/legaldisclaimer' }
    ]

    const supportLinks = [
        { name: 'Help Center', href: '/helpcenter' },
        { name: 'Contact Us', href: '/contactus' },
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
        <footer className='w-full bg-brown-light text-text-dark py-5 mt-10 border-t border-brown-normal'>
            <div className='mx-5 px-4 grid lg:grid-cols-6 gap-8 '>

                {/* Logo & Description */}
                <div className='lg:col-span-2'>
                    <div className='mb-4'>
                        <img
                            src="/images/logo.png"
                            alt="EventHub Logo"
                            className='w-[130px] h-auto cursor-pointer'
                        />
                    </div>
                    <p className='text-text-light max-w-[300px] mb-6'>
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
                        <h3 className="text-brown-darker font-semibold text-lg mb-4">Platform</h3>
                        <ul className="space-y-2">
                            {platformLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href}
                                        className='text-text-light 
                                    hover:text-brown-darker
                                    transition-all duration-300 ease-in-out
                                    hover:translate-x-2 hover:scale-105'>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-brown-darker font-semibold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href}
                                        className='text-text-light 
                                    hover:text-brown-darker 
                                    transition-all duration-300 ease-in-out'>
                                        {link.name}</Link>
                                </li>
                            )
                            )}


                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-brown-darker font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href}
                                        className='text-text-light 
                                    hover:text-brown-darker 
                                    transition-all duration-300 ease-in-out'>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-brown-darker font-semibold text-lg mb-4">Support</h3>
                        <ul className="space-y-2">
                            {supportLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href}
                                        className='text-text-light 
                                    hover:text-brown-darker 
                                    transition-all duration-300 ease-in-out'>
                                        {link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    
                </div>

            </div>

            {/* Bottom Section - Social & Copyright */}
            <div className='mx-5 px-4 mt-10 pt-8 border-t border-brown-normal'>
                <div className='flex flex-col justify-between gap-4 lg:flex-row md:flex-row '>
                    
                    {/* Copyright */}
                    <div className= "flex items-center justify-center text-text-light text-sm lg:justify-start">
                        <p>© 2024 EventHub. All rights reserved.</p>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4 items-center justify-center lg:justify-end md:justify-end">
                        {socialLinks.map((link) => (
                            <div key={link.name}>
                                <Link href={link.href}
                                    className="w-8 h-8 rounded-full 
                                bg-brown-normal 
                                hover:bg-brown-normal-hover 
                                text-white 
                                flex items-center justify-center  
                                transition-all duration-300 ease-in-out
                                hover:-translate-y-1 hover:shadow-lg"
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