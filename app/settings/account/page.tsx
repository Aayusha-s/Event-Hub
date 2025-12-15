import SettingsHeading from '@/components/SettingsHeading'
import SettingsTab from '@/components/SettingsTab'
import Button from '../../../components/Button';
import { Settings } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <section className='my-2 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>

            <SettingsHeading />

            <div className='flex flex-row justify-start items-start gap-12'>

                <SettingsTab />

                <div className='border border-brown-normal rounded-xl p-4 w-full
                    lg:p-6
                    xl:p-8
                    2xl:p-10'>

                    {/* titles */}
                    <div className='space-y-2 mb-6'>
                        <h3 className='font-dynapuff text-xl'>Profile Information</h3>
                        <p className='text-lg font-bold'>Update your personal information and profile picture</p>
                    </div>

                    {/* two factor authentication */}
                    <div className='bg-brown-light border border-brown-normal rounded-xl p-4 mt-3 mb-6 space-y-2'>
                        <h3 className='font-bold text-xl'>Two Factor Authentication</h3>
                        <p>Add an extra layer of security to your account by enabling two-factor authentication.</p>
                        <Button text="Enable 2FA" variant="cta"></Button>
                    </div>

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-4'></div>

                    {/* form */}
                    <div className='flex flex-col gap-4 mt-4'>
                        <h3 className='font-bold text-xl'>Change Password</h3>

                        <div className='flex flex-col justify-between gap-4'>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Current Password</label>
                                <input type="password" className=' w-[full] border border-brown-normal rounded-md p-2' placeholder='********' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>New Password</label>
                                <input type="password" className=' w-[full] border border-brown-normal rounded-md p-2' placeholder='********' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Confirm New Password</label>
                                <input type="password" className=' w-[full] border border-brown-normal rounded-md p-2' placeholder='********' />
                            </div>
                        </div>
                    </div>


                    {/* save changes button */}
                    <div className='flex justify-end mt-4'>
                        <Button text="Update Password" variant="cta"></Button>
                    </div>


                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-4'></div>

                    {/* delete account */}
                    <div className='flex flex-col mt-4 gap-2'>
                        <h3 className='font-bold text-xl'>Delete Account</h3>
                        <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
                    </div>
                    <div className='flex justify-end mt-3'>
                        <Button text="Delete Account" variant="cta" status="danger"></Button>
                    </div>


                </div>



            </div>


        </section>
    )
}

export default page
