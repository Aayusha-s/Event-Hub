'use client'
import Button from '@/components/Button'
import PremiumCard from '@/components/PremiumCard'
import TrendingTopics from '@/components/TrendingTopics'
import { Badge, Camera, Crown, DollarSign, File, FileText, Goal, Megaphone, Shield, Star, TrendingUp, Zap } from 'lucide-react'
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
                        <h3>Upgrade to Premium Organizer</h3>
                    </div>
                    <p>Maximize your event success</p>
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
                        <p className='text-xl text-center mt-2 font-bold'>$49/month</p>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>

                            <PremiumCard
                                title='Featured Placement in Listings'
                                description='Get top visibility for your events'
                                icon={<Star className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Promotion Tools'
                                description='Email blasts and social media boosts'
                                icon={<Megaphone className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Advanced Analytics'
                                description='Track who is buying, when, and why'
                                icon={<TrendingUp className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Lower Commission Fees'
                                description='Save up to 50% on platform fees'
                                icon={<DollarSign className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Early Payout Option'
                                description='Get paid before your event ends'
                                icon={<Zap className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Premium Badge'
                                description='Stand out as a verified organizer'
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

                        <p className='text-xl text-center mt-2 font-bold'>$41/month</p>
                        <p className='text-md text-center mt-2'>Billed annually at $490</p>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>

                            <PremiumCard
                                title='Featured Placement in Listings'
                                description='Get top visibility for your events'
                                icon={<Star className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Promotion Tools'
                                description='Email blasts and social media boosts'
                                icon={<Megaphone className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Advanced Analytics'
                                description='Track who is buying, when, and why'
                                icon={<TrendingUp className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Lower Commission Fees'
                                description='Save up to 50% on platform fees'
                                icon={<DollarSign className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Early Payout Option'
                                description='Get paid before your event ends'
                                icon={<Zap className='text-purple-500' />}
                            />
                            <PremiumCard
                                title='Premium Badge'
                                description='Stand out as a verified organizer'
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
