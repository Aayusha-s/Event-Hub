import Link from "next/link"
import Button from "./Button"


const Header = () => {
    return (
        <header className='fixed top-0 left-0 right-0 w-full bg-brown-light z-50'>
            <div className='mx-5 px-4 flex justify-between items-center h-[70px] '>
                <div className='nav-left'>
                    <Link href="/"><img className='w-[130px] h-[70px] cursor-pointer' src="/images/logo.png" alt="EventHub Logo" /></Link>
                </div>

                <div className='flex-1 max-w-[470px] h-[42px] bg-brown-light border border-[rgba(214,185,149,0.814)] rounded-[10px] flex items-center justify-between mx-5 px-4'>
                    <div className='flex items-center gap-4 flex-1'>
                        <i className="fa-solid fa-magnifying-glass text-text-light"></i>
                        <p className='text-text-light'>Search Events....</p>
                    </div>

                    <div className='flex items-center justify-center gap-[1.4rem] border-l border-brown-normal-hover pl-3'>
                        <i className="fa-solid fa-filter filter text-text-light hover:text-text-dark cursor-pointer"></i>
                        <i className="fa-solid fa-microphone microphone text-text-light hover:text-text-dark cursor-pointer"></i>
                    </div>
                </div>

                <div className='nav-right flex items-center gap-6'>
                    {/* login Button */}
                    <Button 
                    text="Log In"
                    variant="cta">
                    </Button>

                    {/* sign up Button */}
                    <Button text="Sign Up"
                    variant="cta">
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header