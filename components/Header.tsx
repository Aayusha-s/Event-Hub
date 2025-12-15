import Link from "next/link"
import Image from "next/image" 
import Button from "./Button"
import { Search, Filter, Mic } from 'lucide-react' 

const Header = () => {
    return (
        <header className='fixed top-0 left-0 right-0 w-full bg-brown-light z-50 shadow-sm'>
            
            <div className='mx-auto px-4 flex justify-between items-center h-[70px] max-w-7xl'>
                
                <div className='nav-left'>
                    <Link href="/">
                        <div className="relative w-[120px] h-[60px] cursor-pointer">
                            
                            <Image
                                src="/images/logo.png"
                                alt="EventHub Logo"
                                fill
                                style={{ objectFit: 'contain' }}
                                sizes="130px"
                            />
                        </div>
                    </Link>
                </div>

                {/* Search Bar  */}
                <div className='hidden md:flex flex-1 max-w-xl mx-6'>
                    
                    <div className='w-full h-[42px] bg-brown-light border border-brown-normal/80 rounded-lg flex items-center px-4'>
                        
                        <div className='flex items-center gap-3 flex-1'>
                            
                            <Search className="w-4 h-4 text-text-light" />
                            <input
                                type="text"
                                placeholder='Search events, venues, artists...'
                                className='w-full bg-transparent text-text-light placeholder:text-text-light/70 focus:outline-none'
                            />
                        </div>

                        <div className='flex items-center gap-3 border-l border-brown-normal pl-3'>
                            <button className="text-text-light hover:text-text-dark transition-colors">
                                <Filter className="w-4 h-4" />
                            </button>
                            <button className="text-text-light hover:text-text-dark transition-colors">
                                <Mic className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>


                <div className='nav-right flex items-center gap-4'>
                    <Link href="/login">
                        <Button text="Log In" variant="cta" size="sm" />
                    </Link>
                    <Link href="/signup">
                        <Button text="Sign Up" variant="cta" size="sm" />
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header