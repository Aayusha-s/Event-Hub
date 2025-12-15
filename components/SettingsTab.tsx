import {
    UserRound,
    Lock,
    Bell,
    Shield,
    CreditCard
} from 'lucide-react';

const SettingsTab = () => {
    return (
        <div className='lg:flex flex-col gap-4 border border-brown-normal rounded-xl p-4 hidden h-full'>
            <div className='flex flex-row items-center justify-start gap-4 font-bold text-lg cursor-pointer transform transition duration-300 hover:bg-brown-light hover:scale-105 rounded-md p-1'>
                <UserRound />
                Profile
            </div>
            <div className='flex flex-row items-center justify-start gap-4 font-bold text-lg cursor-pointer transform transition duration-300 ease-in-out hover:scale-105  hover:bg-brown-light rounded-md p-1'>
                <Lock />Account</div>
            <div className='flex flex-row items-center justify-start gap-4 font-bold text-lg cursor-pointer transform transition duration-300 ease-in-out hover:scale-105  hover:bg-brown-light rounded-md p-1'>
                <Bell />Notification</div>
            <div className='flex flex-row items-center justify-start gap-4 font-bold text-lg cursor-pointer transform transition duration-300 ease-in-out hover:scale-105  hover:bg-brown-light rounded-md p-1'>
                <Shield />Privacy</div>
            <div className='flex flex-row items-center justify-start gap-4 font-bold text-lg cursor-pointer transform transition duration-300 ease-in-out hover:scale-105  hover:bg-brown-light rounded-md p-1'>
                <CreditCard />Billing</div>
        </div>
    )
}

export default SettingsTab
