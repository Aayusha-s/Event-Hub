import {
    UserRound,
    Lock,
    Bell,
    Shield,
    CreditCard
} from 'lucide-react';
import Link from 'next/link';

const SettingsTab = () => {
    return (
        <div className='lg:flex flex-col gap-4 border border-brown-normal rounded-xl p-4 hidden h-full'>
            <Link href="/settings/profile">
                <div className='flex flex-row items-center justify-start gap-4 font-bold text-lg cursor-pointer transform transition duration-300 hover:bg-brown-light hover:scale-105 rounded-md p-1'>
                    <UserRound />
                    Profile
                </div>
            </Link>
            <Link href="/settings/account">
                <div className='flex flex-row items-center justify-start gap-4 font-bold text-lg cursor-pointer transform transition duration-300 ease-in-out hover:scale-105  hover:bg-brown-light rounded-md p-1'>
                    <Lock />Account</div></Link>
            <Link href="/settings/notification">
                <div className='flex flex-row items-center justify-start gap-4 font-bold text-lg cursor-pointer transform transition duration-300 ease-in-out hover:scale-105  hover:bg-brown-light rounded-md p-1'>
                    <Bell />Notification</div></Link>
            <Link href="/settings/privacy">
                <div className='flex flex-row items-center justify-start gap-4 font-bold text-lg cursor-pointer transform transition duration-300 ease-in-out hover:scale-105  hover:bg-brown-light rounded-md p-1'>
                    <Shield />Privacy</div></Link>
            <Link href="/settings/billing">
                <div className='flex flex-row items-center justify-start gap-4 font-bold text-lg cursor-pointer transform transition duration-300 ease-in-out hover:scale-105  hover:bg-brown-light rounded-md p-1'>
                    <CreditCard />Billing</div></Link>
        </div>
    )
}

export default SettingsTab
