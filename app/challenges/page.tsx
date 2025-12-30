'use client'
import React, { useState } from 'react'
import DashboardBox from '@/components/DashboardBox'
import { Award, Badge, Calendar, Circle, CheckCircle, Zap, CircleCheckBig, Crown, Flame, Gift, Timer, Trophy, Target, Music, Utensils } from 'lucide-react'
import Button from '@/components/Button'
import VendorCards from '@/components/VendorCards'
import { DollarSign, Goal, Star, Ticket, TrendingUp } from 'lucide-react'
import DailyChallengeCard from '@/components/DailyChallengeCard'
import ActiveChallenges from '@/components/ActiveChallenges'
import BadgeCard from '@/components/BadgeCard'
import RewardCard from '@/components/RewardCard'
import Leaderboard from '@/components/Leaderboard'

const page = () => {

    const [activeTab, setActiveTab] = useState('challenges');

    return (
        <section className='
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>

            <div className='w-full border border-brown-normal rounded-xl p-4 space-y-4'>
                <h3 className='font-dynapuff text-center text-lg md:text-xl lg:text-2xl font-semibold'> Level Up Your Experience</h3>
                <p className='text-center text-lg md:text-xl lg:text-xl font-semibold'>Complete challenges, earn badges, and redeem amazing rewards</p>

                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 lg:gap-4 justify-between'>

                    {/*  cards */}

                    <VendorCards
                        icon1={<Star className='text-3xl text-green-500' />}
                        count={"5420"}
                        label="Total Points"
                        icon2={<TrendingUp className='inline mr-2 text-green-500' />}
                        subLabel="Rank #5">
                    </VendorCards>

                    <VendorCards
                        icon1={<Flame className='text-3xl text-blue-500' />}
                        count={"15 Days"}
                        label="Current Streak"
                        subLabel="Keep it up!">
                    </VendorCards>

                    <VendorCards
                        icon1={<Award className='text-3xl text-yellow-500' />}
                        count={4 / 16}
                        label="Badges Unlocked"
                        subLabel="25% complete">
                    </VendorCards>

                    <VendorCards
                        icon1={<Goal className='text-3xl text-purple-500' />}
                        count={"4"}
                        label="Active Challenges"
                        subLabel="In Progress">
                    </VendorCards>

                </div>
            </div>


            <div className='flex flex-row flex-wrap gap-4 mt-4'>
                <Button
                    text='Challenges'
                    variant='secondary'
                    size='md'
                    iconLeft={<Goal />}
                    onClick={() => setActiveTab('challenges')}>

                </Button>
                <Button
                    text='Badges'
                    variant='secondary'
                    size='md'
                    iconLeft={<Award />}
                    onClick={() => setActiveTab('badges')}>
                </Button>

                <Button
                    text='Rewards'
                    variant='secondary'
                    size='md'
                    iconLeft={<Gift />}
                    onClick={() => setActiveTab('rewards')}>
                </Button>

                <Button
                    text='Leaderboard'
                    variant='secondary'
                    size='md'
                    iconLeft={<Trophy />}
                    onClick={() => setActiveTab('leaderboard')}>
                </Button>
            </div>

            {activeTab === 'challenges' && (
                <>
                    <div className='flex flex-col border border-brown-normal rounded-xl p-4 mt-6'>
                        <div className='flex flex-row gap-4 items-center'>
                            <div className='relative bg-brown-normal p-4 rounded-md w-12 h-12 flex items-center justify-center'>
                                <Calendar className='absolute text-white' />
                            </div>

                            <div>
                                <h3 className='font-dynapuff text-md md:text-xl lg:text-2xl font-semibold'> Daily Challenges</h3>
                                <p className='text-lg md:text-xl lg:text-xl font-semibold'> Reset in 6 hours</p>
                            </div>
                        </div>



                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>

                            {/* Daily challenges */}
                            <DailyChallengeCard
                                title="Daily Login"
                                description="Login to EventHub"
                                points={100}
                                status="Completed"
                                statusIcon={<CheckCircle size={12} />}
                                statusColor="bg-green-100 text-green-700"
                                cardColor="border-green-200 bg-green-50"
                                buttonText="Claimed"
                                buttonIcon={<CheckCircle size={14} />}
                            />

                            <DailyChallengeCard
                                title='Community Engagement'
                                description='Like 5 community posts'
                                points={75}
                                status='In Progress'
                                statusIcon={<Target size={12} />}
                                statusColor='bg-blue-100 text-blue-700'
                                cardColor='border-blue-200 bg-blue-50'
                                buttonText='Complete'
                                buttonIcon={<Zap size={14} />}
                            />


                            <DailyChallengeCard
                                title='Event Discovery'
                                description='Browse 10 events'
                                points={100}
                                status='Not Started'
                                statusIcon={<Circle size={12} />}
                                statusColor='bg-gray-100 text-gray-700'
                                cardColor='border-gray-200 bg-white'
                                buttonText='Start Challenge'
                                buttonIcon={<Zap size={14} />}
                            />

                        </div>
                    </div>

                    <div className='flex flex-col border border-brown-normal rounded-xl p-4 mt-6'>
                        <h3 className='font-bold mb-6 text-lg md:text-xl lg:text-xl'>Active Challenges</h3>
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-1 xl:grid-cols-2'>

                            {/* Challenge 1 - IN PROGRESS */}

                            <ActiveChallenges
                                title='Event Explorer'
                                diffculty='easy'
                                cardColor='border-gray-200 bg-white'
                                diffcultyColor='bg-green-100 text-green-700'
                                points={500}
                                description='Attend 5 different events'
                                tags={['Events', 'Ongoing']}
                                currentProgress={3}
                                totalProgress={5}
                            />

                            <ActiveChallenges
                                title='Social Butterfly'
                                diffculty='medium'
                                cardColor='border-gray-200 bg-white'
                                diffcultyColor='bg-yellow-100 text-yellow-700'
                                points={300}
                                description='Share 10 posts in community'
                                tags={['Community', 'Ongoing']}
                                currentProgress={7}
                                totalProgress={10}
                            />

                            <ActiveChallenges
                                title='Review Master'
                                diffculty='hard'
                                cardColor='border-gray-200 bg-white'
                                diffcultyColor='bg-red-100 text-red-700'
                                points={800}
                                description='Write 20 event reviews'
                                tags={['Engagement', 'Ongoing']}
                                currentProgress={12}
                                totalProgress={20}
                            />

                            <ActiveChallenges
                                title='Early Bird Special'
                                diffculty='easy'
                                cardColor="border-gray-200 bg-white"
                                diffcultyColor='bg-green-100 text-green-700'
                                points={400}
                                description='Write 20 event reviews'
                                tags={['Tickets', 'Resets Monthly']}
                                currentProgress={1}
                                totalProgress={4}
                            />

                            <ActiveChallenges
                                title='VIP Status'
                                diffculty='hard'
                                cardColor="border-yellow-200 bg-yellow-50"
                                diffcultyColor='bg-red-100 text-red-700'
                                points={2000}
                                description='Attend 50 events total'
                                tags={['Events', 'Ongoing']}
                                currentProgress={23}
                                totalProgress={50}
                            />

                        </div>

                    </div>
                </>
            )}


            {/* badges */}
            {activeTab === 'badges' && (
                <>
                    <div className='border border-brown-normal rounded-xl p-4 mt-6 mb-10'>
                        <h3 className='font-bold mb-6 text-lg md:text-xl lg:text-xl'>Unlocked Badges (3)</h3>
                        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>

                            {/* Badge 1 */}
                            <BadgeCard
                                title='Early Adopter'
                                description='Joined EventHub in the first month'
                                rarity='Legendary'
                                unlockedDate='Unlocked Nov 2024'
                                cardColor='border-yellow-500 bg-yellow-50'
                                icon={<Star className='text-yellow-500 text-4xl mb-2' />}
                            />


                            {/* Badge 2 */}
                            <BadgeCard
                                title='Music Lover'
                                description='Attended 10 music events'
                                rarity='Rare'
                                unlockedDate='Unlocked Dec 2024'
                                cardColor='border-blue-500 bg-blue-50'
                                icon={<Music className='text-yellow-500 text-4xl mb-2' />}
                            />

                            {/* Badge 3 */}
                            <BadgeCard
                                title='Foodie Explorer'
                                description='Attended 10 food events'
                                rarity='Rare'
                                unlockedDate='Unlocked Jan 2025'
                                cardColor='border-purple-500 bg-purple-50'
                                icon={<Utensils className='text-yellow-500 text-4xl mb-2' />}
                            />
                            {/* Badge 3 */}
                            <BadgeCard
                                title='Foodie Explorer'
                                description='Attended 10 food events'
                                rarity='Rare'
                                unlockedDate='Unlocked Jan 2025'
                                cardColor='border-purple-500 bg-purple-50'
                                icon={<Utensils className='text-yellow-500 text-4xl mb-2' />}
                            />

                        </div>
                    </div>


                    {/* locked badges */}
                    <div className='border border-brown-normal rounded-xl p-4 mt-6 mb-10'>
                        <h3 className='font-bold mb-6 text-lg md:text-xl lg:text-xl'>Locked Badges (3)</h3>
                        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>

                            {/* Badge 1 */}
                            <BadgeCard
                                title='Early Adopter'
                                description='Joined EventHub in the first month'
                                rarity='Legendary'
                                unlockedDate='Unlocked Nov 2024'
                                cardColor='border-gray-500 bg-gray-50'
                                icon={<Star className='text-gray-500 text-4xl mb-2' />}
                            />



                            {/* Badge 2 */}
                            <BadgeCard
                                title='Music Lover'
                                description='Attended 10 music events'
                                rarity='Rare'
                                unlockedDate='Unlocked Dec 2024'
                                cardColor='border-gray-500 bg-gray-50'
                                icon={<Music className='text-gray-500 text-4xl mb-2' />}
                            />


                            {/* Badge 3 */}
                            <BadgeCard
                                title='Foodie Explorer'
                                description='Attended 10 food events'
                                rarity='Rare'
                                unlockedDate='Unlocked Jan 2025'
                                cardColor='border-gray-500 bg-gray-50'
                                icon={<Utensils className='text-gray-500 text-4xl mb-2' />}
                            />


                            {/* Badge 3 */}
                            <BadgeCard
                                title='Foodie Explorer'
                                description='Attended 10 food events'
                                rarity='Rare'
                                unlockedDate='Unlocked Jan 2025'
                                cardColor='border-gray-500 bg-gray-50'
                                icon={<Utensils className='text-gray-500 text-4xl mb-2' />}
                            />


                            {/* Badge 4 */}
                            <BadgeCard
                                title='Foodie Explorer'
                                description='Attended 10 food events'
                                rarity='Rare'
                                unlockedDate='Unlocked Jan 2025'
                                cardColor='border-gray-500 bg-gray-50'
                                icon={<Utensils className='text-gray-500 text-4xl mb-2' />}
                            />


                            {/* Badge 5 */}
                            <BadgeCard
                                title='Foodie Explorer'
                                description='Attended 10 food events'
                                rarity='Rare'
                                unlockedDate='Unlocked Jan 2025'
                                cardColor='border-gray-500 bg-gray-50'
                                icon={<Utensils className='text-gray-500 text-4xl mb-2' />}
                            />


                            {/* Badge 6 */}
                            <BadgeCard
                                title='Foodie Explorer'
                                description='Attended 10 food events'
                                rarity='Rare'
                                unlockedDate='Unlocked Jan 2025'
                                cardColor='border-gray-500 bg-gray-50'
                                icon={<Utensils className='text-gray-500 text-4xl mb-2' />}
                            />
                        </div>
                    </div>
                </>
            )}


            {activeTab === 'rewards' && (
                <>
                    <div className='border border-brown-normal rounded-xl p-4 mt-6'>
                        <h3 className='font-bold mb-6 text-lg md:text-xl lg:text-xl'>Available Rewards</h3>
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>



                            <RewardCard
                                title='10% Off Event Tickets'
                                description='Get a 10% discount on your next event ticket purchase.'
                                pointsRequired={500}
                                icon={<Star className='text-yellow-600' />}
                            />
                            <RewardCard
                                title='Free Merchandise'
                                description='Redeem for exclusive EventHub merchandise.'
                                pointsRequired={1000}
                                icon={<Star className='text-yellow-600' />}
                            />
                            <RewardCard
                                title='VIP Event Access'
                                description='Gain VIP access to select events.'
                                pointsRequired={2000}
                                icon={<Star className='text-yellow-600' />}
                            />
                            <RewardCard
                                title='Backstage Pass'
                                description='Get backstage access at a music event.'
                                pointsRequired={3000}
                                icon={<Star className='text-yellow-600' />}
                            />
                        </div>
                    </div>
                </>
            )}


            {activeTab === 'leaderboard' && (
                <>
                    <div className='flex flex-col gap-4 border border-brown-normal rounded-xl p-4 mt-6'>
                        <h3 className='font-bold text-lg md:text-xl lg:text-xl'>Leaderboard</h3>

                        <Leaderboard
                            nameAbv='AB'
                            name='Alice Brown'
                            streakDays={15}
                            points={5420}
                            cardColor='border-brown-normal'
                        />

                        <Leaderboard
                            nameAbv='JS'
                            name='John Smith'
                            streakDays={12}
                            points={4980}
                            cardColor='border-brown-normal'
                        />

                        <Leaderboard
                            nameAbv='MW'
                            name='Mary Williams'
                            streakDays={10}
                            points={4500}
                            cardColor='border-purple-500 bg-purple-50'
                        />

                        <Leaderboard
                            nameAbv='DR'
                            name='David Rodriguez'
                            streakDays={8}
                            points={4200}
                            cardColor='border-brown-normal'
                        />

                        <Leaderboard
                            nameAbv='EL'
                            name='Emma Lee'
                            streakDays={7}
                            points={4000}
                            cardColor='border-brown-normal'
                        />
                    </div>


                </>
            )}


        </section>
    )
}

export default page
