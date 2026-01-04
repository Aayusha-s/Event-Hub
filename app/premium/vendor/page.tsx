'use client'
import Button from '@/components/Button'
import PremiumCard from '@/components/PremiumCard'
import TrendingTopics from '@/components/TrendingTopics'
import { Badge, Camera, Crown, DollarSign, File, FileText, Goal, Shield, Star } from 'lucide-react'
import React, { use } from 'react'
import { useState } from 'react'


const page = () => {
    const [activeTab, setActiveTab] = useState('monthly');
    return (
        <section className='flex flex-col
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>
            <div className='border border-brown-normal rounded-xl p-4 mx-auto'>

                <div className='border border-brown-normal bg-brown-light rounded-xl p-4'>
                    <div className='flex flex-row gap-4 items-center mb-2'>
                        <Crown />
                        <h3>Upgrade to Premium Vendor</h3>
                    </div>
                    <p>Get exclusive perks and rewards</p>
                </div>

                <div className='flex flex-row items-center justify-center gap-4 mt-4'>

                    <Button
                        text="Monthly"
                        variant="cta"
                        size='sm'
                        onClick={() => setActiveTab('monthly')}
                        isActive={activeTab === 'monthly'}
                    />

                    <Button
                        text="Annually"
                        variant="cta"
                        size='sm'
                        onClick={() => setActiveTab('annually')}
                        isActive={activeTab === 'annually'}
                    />
                </div>

                {activeTab === 'monthly' && (
                    <>
                        <p className='text-xl text-center mt-2 font-bold'>$39/month</p>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>

                            <PremiumCard
                                title='Priority Matching'
                                description='Get matched with organizers first'
                                icon={<Goal className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Portfolio Showcase'
                                description='Upload unlimited photos & videos'
                                icon={<Camera className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='"Verified" Badge'
                                description='Build trust with verified status'
                                icon={<Shield className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Direct Leads/RFPs'
                                description='Receive exclusive opportunities'
                                icon={<FileText className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Business Tools'
                                description='Invoicing, contracts, and more'
                                icon={<FileText className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Premium Support'
                                description='24/7 priority customer support'
                                icon={<Crown className='text-purple-500' />}
                            />
                        </div>

                        <div className='flex flex-col justify-center items-center mt-4 gap-4'>
                            <Button text='Upgrade to Premium' iconLeft={<Crown />} ></Button>
                            <p className='text-md text-center'>Cancel anytime. No long-term commitment.</p>
                        </div>
                    </>
                )}


                {activeTab === 'annually' && (
                    <>

                        <p className='text-xl text-center mt-2 font-bold'>$33/month</p>
                        <p className='text-md text-center mt-2'>Billed annually at $390</p>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>

                            <PremiumCard
                                title='Priority Matching'
                                description='Get matched with organizers first'
                                icon={<Goal className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Portfolio Showcase'
                                description='Upload unlimited photos & videos'
                                icon={<Camera className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='"Verified" Badge'
                                description='Build trust with verified status'
                                icon={<Shield className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Direct Leads/RFPs'
                                description='Receive exclusive opportunities'
                                icon={<FileText className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Business Tools'
                                description='Invoicing, contracts, and more'
                                icon={<FileText className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Premium Support'
                                description='24/7 priority customer support'
                                icon={<Crown className='text-purple-500' />}
                            />
                        </div>

                        <div className='flex flex-col justify-center items-center mt-4 gap-4'>
                            <Button text='Upgrade to Premium' iconLeft={<Crown />} ></Button>
                            <p className='text-md text-center'>Cancel anytime. No long-term commitment.</p>
                        </div>

                    </>
                )}
            </div>
        </section>
    )
}

export default page
