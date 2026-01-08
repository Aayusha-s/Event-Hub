'use client';
import DashboardBox from '../../components/DashboardBox';
import Button from '../../components/Button';
import {
    Calendar,
    Goal,
    Star,
    TrendingUp,
    MapPin,
    Clock,
    Crown,
    DollarSign,
    Zap,
    ChartColumn,
    Megaphone,
    Ticket,
    Plus,
    SquarePen,
    Users,
    ArrowRight,
    CircleCheck,
    CircleCheckBig
} from "lucide-react";
import { useRouter } from 'next/navigation';

import VendorCards from '@/components/VendorCards';

const page = () => {

    const router = useRouter();
    return (
        <section className='flex flex-col
        my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>


            <DashboardBox
                title="Organizer Dashboard"
                description="Managing 3 upcoming events with 1,170 tickets sold"
                buttonText="Create New Events"
                buttonIcon={<Plus />}
                buttonLink="/createnewevent"

            >
            </DashboardBox>





            {/* upgrade to premium organizer */}
            <div className='w-full border border-brown-normal rounded-xl p-4 mt-6 space-y-4'>
                <h3 className='font-dynapuff'> <Crown className='inline-block mr-2' />Upgrade to Premium Organizer</h3>
                <p>Get featured placement, advanced analytics, promotion tools, lower fees, and early payouts for $49/month</p>
                <div className='mt-4 space-y-2 flex flex-row flex-wrap gap-5 font-bold'>
                    <p><Star className='inline-block  mr-1 text-blue-500' />Featured Placement</p>
                    <p><ChartColumn className='inline-block mr-1' />Advanced Analytics</p>
                    <p><Megaphone className='inline-block mr-1' />Promotion Tools</p>
                    <p><Zap className='inline-block mr-1' /> Early Payouts</p>
                </div>

                <div>
                    <Button text="Upgrade Now - $49/month" variant="cta" iconRight={<i className="fa-solid fa-arrow-right ml-2 "></i>}>
                    </Button>
                </div>
            </div>

            <div className='flex flex-col md:flex-row md:gap-4 lg:gap-6 justify-between'>

                {/* organizer cards */}
                <VendorCards
                    icon1={<DollarSign className='text-3xl text-green-500' />}
                    count={"$137500"}
                    label="Total Revenue"
                    icon2={<TrendingUp className='inline mr-2 text-green-500' />}
                    subLabel="+24% from last month"
                >
                </VendorCards>

                <VendorCards
                    icon1={<Ticket className='text-3xl text-blue-500' />}
                    count={1620}
                    label="Tickets Sold"
                    subLabel="Across all events"
                >
                </VendorCards>

                <VendorCards
                    icon1={<Star className='text-3xl text-yellow-500' />}
                    count={4.8}
                    label="Average Rating"
                    subLabel="From 156 reviews"
                >
                </VendorCards>

                <VendorCards
                    icon1={<Goal className='text-3xl text-purple-500' />}
                    count={"68%"}
                    label="Conversion Rate"
                    subLabel="Views to purchases"
                >
                </VendorCards>

            </div>

            <div className='flex flex-col gap-6 justify-between'>

                {/* upcoming events */}
                <div className='flex flex-col justify-between mt-10'>
                    <div className='flex flex-row items-center justify-between'>
                        <h2 className=' text-xl md:text-xl lg:text-2xl font-bold'>
                            Upcoming Events
                        </h2>
                        <Button text='View All'
                            variant='secondary'
                            size='sm'
                            iconRight={<ArrowRight size={18} />}>
                        </Button>
                    </div>




                    <div className='border border-brown-normal rounded-xl mt-6 p-4 w-full
                        grid grid-cols-1 xl:grid-cols-2 gap-4'>

                        {/* card 1 */}
                        <div className='p-4 w-full border border-brown-normal rounded-xl space-y-1'>
                            <div className='flex flex-col md:flex-row gap-4 w-full'>
                                <img src="/images/party.png" className='rounded-2xl w-[200px] h-auto object-cover ' />

                                <div className='flex-1'>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-row gap-4'>
                                            <h3 className='font-bold text-lg'>Summer Music Festival</h3>
                                            
                                            <div className={`flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full text-xs font-medium`}>
                                                <CircleCheckBig size={14} className='text-green-700' /> 
                                                <p className='text-green-700'>Active</p>
                                            </div>
                                        </div>

                                        <div className='flex flex-col md:flex-row gap-4'>
                                            <p className='text-sm'><Calendar className='inline mr-1' size={18} /> March 15-17, 2024 at 6:00 PM</p>
                                            <p className='text-sm'><MapPin className='inline mr-1' size={18} /> San Francisco, CA</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-row justify-between mt-4'>
                                        <p className='text-sm'> 850/1000 tickets sold</p>
                                        <p className='text-sm'>85%</p>
                                    </div>

                                    <div className='h-2 bg-gray-300 w-full rounded-full mt-1'>
                                        <div className='bg-green-500 h-2 w-[85%] rounded-full' >
                                        </div>
                                    </div>

                                    <div className='mt-4 flex flex-col md:flex-row gap-4 justify-between items-center'>
                                        <p className='text-lg font-bold'><DollarSign className='inline text-green-500' size={18} /> 42,500</p>
                                        <div className='flex flex-row gap-2 justify-between items-center '>
                                            <Button text='Analytics' variant='cta' size='sm' iconLeft={<TrendingUp size={18} />} onClick={() => router.push('/analytics')}></Button>
                                            {/* <Button text='Promote' variant='cta' size='sm' iconLeft={<Megaphone size={18} />} onClick={() => router.push('')}></Button> */}
                                            <Button text='Edit' variant='cta' size='sm' iconLeft={<SquarePen size={18} />} onClick={() => router.push('')}></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* card 2 */}
                        <div className='p-4 w-full border border-brown-normal rounded-xl space-y-1'>
                            <div className='flex flex-col md:flex-row gap-4 w-full'>
                                <img src="/images/party.png" className='rounded-2xl w-[200px] h-auto object-cover overflow-x-auto' />

                                <div className='flex-1'>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-row gap-4'>
                                            <h3 className='font-bold text-lg'>Summer Music Festival</h3>
                                            
                                            <div className={`flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-xs font-medium`}>
                                                <Clock size={14} className='text-gray-700' /> 
                                                <p className='text-gray-700'>Draft</p>
                                            </div>
                                        </div>

                                        <div className='flex flex-col md:flex-row gap-4'>
                                            <p className='text-sm'><Calendar className='inline mr-1' size={18} /> March 15-17, 2024 at 6:00 PM</p>
                                            <p className='text-sm'><MapPin className='inline mr-1' size={18} /> San Francisco, CA</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-row justify-between mt-4'>
                                        <p className='text-sm'> 0/700 tickets sold</p>
                                        <p className='text-sm'>0%</p>
                                    </div>

                                    <div className='h-2 bg-gray-300 w-full rounded-full mt-1'>
                                        <div className='bg-green-300 h-2 w-[0%] rounded-full' >
                                        </div>
                                    </div>

                                    <div className='mt-4 flex flex-col md:flex-row gap-4 justify-between items-center'>
                                        <p className='text-lg font-bold'><DollarSign className='inline text-green-500' size={18} /> 0</p>
                                        <div className='flex flex-row gap-2 justify-between items-center '>
                                            <Button text='Analytics' variant='cta' size='sm' iconLeft={<TrendingUp size={18} />} onClick={() => router.push('/analytics')}></Button>
                                            {/* <Button text='Promote' variant='cta' size='sm' iconLeft={<Megaphone size={18} />} onClick={() => router.push('')}></Button> */}
                                            <Button text='Edit' variant='cta' size='sm' iconLeft={<SquarePen size={18} />} onClick={() => router.push('')}></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>

                    </div>
                </div>



                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>


                    {/* past events  performance */}
                    <div className='flex flex-col mt-10'>

                        {/* title and button */}
                        <div className='flex flex-row items-center justify-between'>
                            <h2 className='text-lg md:text-xl lg:text-2xl font-bold'>
                                Sales Performance
                            </h2>
                            <Button text='View All'
                                variant='secondary'
                                size='sm'
                                iconRight={<ArrowRight size={18} />}>
                            </Button>
                        </div>

                        <div className='border border-brown-normal rounded-xl mt-6 p-4 w-full justify-items-center'>

                            {/* card 1 */}
                            <div className='w-full'>
                                <div className='flex flex-row gap-4 justify-between items-center'>
                                    <h3 className='text-lg font-bold'>Jazz Night Live</h3>
                                    <div className='flex flex-row items-center gap-1'>
                                        <Star className='text-yellow-500' size={18} />
                                        <h3>4.8 (89)</h3>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-sm'>Nov 2024</h3>

                                </div>


                                <div className='flex flex-row justify-between mt-4'>
                                    {/* attendees */}
                                    <div>
                                        <h3>Attendees</h3>
                                        <div className='flex flex-row items-center gap-2'>
                                            <Users size={18} />
                                            <p>750</p>
                                        </div>
                                    </div>

                                    {/* revenue */}
                                    <div>
                                        <h3>Revenue</h3>
                                        <div className='flex flex-row items-center gap-2'>
                                            <DollarSign size={18} className='text-green-500' />
                                            <p>18,000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* divider */}
                            <div className='w-full h-0.5 bg-brown-light-hover mb-6 mt-4'></div>


                            {/* card 2 */}
                            <div className='w-full'>
                                <div className='flex flex-row gap-4 justify-between items-center'>
                                    <h3 className='text-lg font-bold'>Jazz Night Live</h3>
                                    <div className='flex flex-row items-center gap-1'>
                                        <Star className='text-yellow-500' size={18} />
                                        <h3>4.8 (89)</h3>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-sm'>Nov 2024</h3>

                                </div>


                                <div className='flex flex-row justify-between mt-4'>
                                    {/* attendees */}
                                    <div>
                                        <h3>Attendees</h3>
                                        <div className='flex flex-row items-center gap-2'>
                                            <Users size={18} />
                                            <p>750</p>
                                        </div>
                                    </div>

                                    {/* revenue */}
                                    <div>
                                        <h3>Revenue</h3>
                                        <div className='flex flex-row items-center gap-2'>
                                            <DollarSign size={18} className='text-green-500' />
                                            <p>18,000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* divider */}
                            <div className='w-full h-0.5 bg-brown-light-hover mb-6 mt-4'></div>

                            {/* card 3 */}
                            <div className='w-full'>
                                <div className='flex flex-row gap-4 justify-between items-center'>
                                    <h3 className='text-lg font-bold'>Jazz Night Live</h3>
                                    <div className='flex flex-row items-center gap-1'>
                                        <Star className='text-yellow-500' size={18} />
                                        <h3>4.8 (89)</h3>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-sm'>Nov 2024</h3>

                                </div>


                                <div className='flex flex-row justify-between mt-4'>
                                    {/* attendees */}
                                    <div>
                                        <h3>Attendees</h3>
                                        <div className='flex flex-row items-center gap-2'>
                                            <Users size={18} />
                                            <p>750</p>
                                        </div>
                                    </div>

                                    {/* revenue */}
                                    <div>
                                        <h3>Revenue</h3>
                                        <div className='flex flex-row items-center gap-2'>
                                            <DollarSign size={18} className='text-green-500' />
                                            <p>18,000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* divider */}
                            <div className='w-full h-0.5 bg-brown-light-hover mb-6 mt-4'></div>

                            {/* card 4 */}
                            <div className='w-full'>
                                <div className='flex flex-row gap-4 justify-between items-center'>
                                    <h3 className='text-lg font-bold'>Jazz Night Live</h3>
                                    <div className='flex flex-row items-center gap-1'>
                                        <Star className='text-yellow-500' size={18} />
                                        <h3>4.8 (89)</h3>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-sm'>Nov 2024</h3>

                                </div>


                                <div className='flex flex-row justify-between mt-4'>
                                    {/* attendees */}
                                    <div>
                                        <h3>Attendees</h3>
                                        <div className='flex flex-row items-center gap-2'>
                                            <Users size={18} />
                                            <p>750</p>
                                        </div>
                                    </div>

                                    {/* revenue */}
                                    <div>
                                        <h3>Revenue</h3>
                                        <div className='flex flex-row items-center gap-2'>
                                            <DollarSign size={18} className='text-green-500' />
                                            <p>18,000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* divider */}
                            <div className='w-full h-0.5 bg-brown-light-hover mb-6 mt-4'></div>


                            <Button
                                text='View All Past Events'
                                variant='cta'>
                            </Button>

                        </div>

                    </div>




                    {/* recent activity */}

                    <div className='flex flex-col  mt-10'>

                        <div className='flex flex-row items-center justify-between'>
                            <h2 className='text-lg md:text-xl lg:text-2xl font-bold'>
                                Recent Activity
                            </h2>
                            <Button text='View All'
                                variant='secondary'
                                size='sm'
                                iconRight={<ArrowRight size={18} />}>
                            </Button>
                        </div>


                        <div className='border border-brown-normal rounded-xl mt-6 p-4 w-full justify-items-center'>

                            {/* card 1 */}
                            <div className='w-full flex flex-row gap-4 items-center'>
                                <div className='w-10 h-10 bg-green-50 rounded-[50px] flex items-center justify-center'>
                                    <Ticket className='text-green-500' size={18} />
                                </div>

                                <div className='flex flex-col'>
                                    <p className='font-semibold'>12 tickets sold for Summer Music Festival</p>
                                    <p className='text-sm text-gray-500'>5 minutes ago</p>

                                </div>
                            </div>

                            {/* divider */}
                            <div className='w-full h-0.5 bg-brown-light-hover my-4'></div>


                            {/* card 2 */}
                            <div className='w-full flex flex-row gap-4 items-center'>
                                <div className='w-10 h-10 bg-yellow-50 rounded-[50px] flex items-center justify-center'>
                                    <Star className='text-yellow-500' size={18} />
                                </div>

                                <div className='flex flex-col'>
                                    <p className='font-semibold'>New 5-star review for Jazz Night Live</p>
                                    <p className='text-sm text-gray-500'>2 hours ago</p>

                                </div>
                            </div>

                            {/* divider */}
                            <div className='w-full h-0.5 bg-brown-light-hover my-4'></div>


                            {/* card 3 */}
                            <div className='w-full flex flex-row gap-4 items-center'>
                                <div className='w-10 h-10 bg-blue-50 rounded-[50px] flex items-center justify-center'>
                                    <Users className='text-blue-500' size={18} />
                                </div>

                                <div className='flex flex-col'>
                                    <p className='font-semibold'>New vendor application for Tech Summit</p>
                                    <p className='text-sm text-gray-500'>5 hours ago</p>

                                </div>
                            </div>

                            {/* divider */}
                            <div className='w-full h-0.5 bg-brown-light-hover my-4'></div>


                            {/* card 4 */}
                            <div className='w-full flex flex-row gap-4 items-center'>
                                <div className='w-10 h-10 bg-green-50 rounded-[50px] flex items-center justify-center'>
                                    <Ticket className='text-green-500' size={18} />
                                </div>

                                <div className='flex flex-col'>
                                    <p className='font-semibold'>8 tickets sold for Tech Summit 2025</p>
                                    <p className='text-sm text-gray-500'>3 days ago</p>

                                </div>
                            </div>

                            {/* divider */}
                            <div className='w-full h-0.5 bg-brown-light-hover my-4'></div>


                            {/* card 5 */}
                            <div className='w-full flex flex-row gap-4 items-center'>
                                <div className='w-10 h-10 bg-yellow-50 rounded-[50px] flex items-center justify-center'>
                                    <Star className='text-yellow-500' size={18} />
                                </div>

                                <div className='flex flex-col'>
                                    <p className='font-semibold'>New 5-star review for Jazz Night Live</p>
                                    <p className='text-sm text-gray-500'>1 week ago</p>

                                </div>
                            </div>

                            {/* divider */}
                            <div className='w-full h-0.5 bg-brown-light-hover my-4'></div>



                            <Button text='View All Activities'
                                variant='cta'>
                            </Button>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default page
