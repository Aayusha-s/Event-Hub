import DashboardBox from '../../components/DashboardBox';
import Button from '../../components/Button';
import { Award, Calendar, Goal, Star, TrendingUp, MapPin, Eye, CircleCheckBig, Clock, TrendingDown } from "lucide-react";
import { Camera } from "lucide-react";
import { File } from "lucide-react";
import { Crown } from "lucide-react";
import { DollarSign } from "lucide-react";
import VendorCards from '@/components/VendorCards';

const page = () => {
    return (
        <section className='font-cause text-text-dark my-6 mx-5 px-4 flex flex-col'>
            {/*  */}
            <DashboardBox
                title="Vendor Dashboard"
                description="You have 3 upcoming booth bookings and 3 new leads">
            </DashboardBox>


            {/* upgrade to premium vendor */}
            <div className='w-full border border-brown-normal rounded-xl px-10 py-6 mt-6 space-y-4'>
                <h3 className='font-dynapuff'> <Crown className='inline-block mr-2' />Upgrade to Premium Vendor</h3>
                <p>Get priority matching, verified badge, unlimited portfolio uploads, direct leads, and business tools for $39/month</p>
                <div className='mt-4 space-y-2 flex flex-row flex-wrap gap-5 font-bold'>
                    <p><Award className='inline-block mr-1' /> Verified Badge</p>
                    <p><Goal className='inline-block mr-1' /> Priority Matching</p>
                    <p><Camera className='inline-block mr-1' /> Unlimited Portfolio Uploads</p>
                    <p><File className='inline-block mr-1' /> Direct Leads</p>
                </div>

                <div>
                    <Button text="Upgrade Now - $39/month" variant="cta" iconRight={<i className="fa-solid fa-arrow-right ml-2 "></i>}>
                    </Button>
                </div>
            </div>

            <div className='grid grid-cols-1 ms:grid-cols-4 lg:grid-cols-4 lg:flex justify-between'>

                {/* vendor cards */}
                <VendorCards
                    icon1={<DollarSign className='text-3xl text-green-500' />}
                    count={30800}
                    label="Total Earnings"
                    icon2={<TrendingUp className='inline mr-2 text-green-500' />}
                    subLabel="+12% from last period"
                >
                </VendorCards>

                <VendorCards
                    icon1={<Calendar className='text-3xl text-blue-500' />}
                    count={3}
                    label="Active Bookings"
                    subLabel="Upcoming events"
                >
                </VendorCards>

                <VendorCards
                    icon1={<Star className='text-3xl text-yellow-500' />}
                    count={4.7}
                    label="Average Rating"
                    subLabel="From 3 reviews"
                >
                </VendorCards>

                <VendorCards
                    icon1={<Goal className='text-3xl text-purple-500' />}
                    count={2}
                    label="New Leads"
                    subLabel="Awaiting Response"
                >
                </VendorCards>

            </div>

            <div className='flex flex-row gap-6 justify-between'>

                {/* upcoming booth bookings */}
                <div className='flex flex-row justify-between'>
                    <div className='border border-brown-normal rounded-xl mt-10 p-4 px-6 py-6 w-[650px]
                grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-6 justify-items-center'>
                        {/* card 1 */}
                        <div className='flex flex-row justify-between items-center w-[650px] px-6'>
                            <h2 className='font-dynapuff text-2xl font-medium'>
                                Upcoming Booth Bookings
                            </h2>
                            <Button text='View All'
                                variant='cta'
                                iconRight={<i className="fa-solid fa-arrow-right ml-2 "></i>}>
                            </Button>
                        </div>

                        {/* card 1 */}
                        <div className='p-6  w-[600px]  border border-brown-normal rounded-xl space-y-1'>
                            <div className='flex flex-row gap-4  '>
                                <img src="/images/party.png" className='w-[200px] rounded-2xl' />

                                <div className='flex flex-col flex-1 gap-2'>
                                    <h3 className='font-bold text-lg'>Tech Expo 2024</h3>
                                    <p className='text-md'><Calendar className='inline mr-1' /> March 15-17, 2024</p>
                                    <p className='text-md'><MapPin className='inline mr-1' /> San Francisco, CA</p>
                                </div>
                                <Button
                                    text='Confirmed'
                                    variant='tag'
                                    size='md'
                                    iconLeft=<CircleCheckBig className='font-sm text-green-500' /> >
                                </Button>

                            </div>
                            <div className='flex justify-end '>
                                <Button text=' Details'
                                    variant='cta'
                                    iconLeft={<Eye />}>
                                </Button>
                            </div>
                        </div>

                        {/* card 2 */}
                        <div className='p-6  w-[600px]  border border-brown-normal rounded-xl space-y-1'>
                            <div className='flex flex-row gap-4  '>
                                <img src="/images/party.png" className='w-[200px] rounded-2xl' />

                                <div className='flex flex-col flex-1 gap-2'>
                                    <h3 className='font-bold text-lg'>Tech Expo 2024</h3>
                                    <p className='text-md'><Calendar className='inline mr-1' /> March 15-17, 2024</p>
                                    <p className='text-md'><MapPin className='inline mr-1' /> San Francisco, CA</p>
                                </div>
                                <Button
                                    text='Pending'
                                    variant='tag'
                                    size='md'
                                    iconLeft={<Clock className='font-sm text-yellow-500' />} >
                                </Button>

                            </div>
                            <div className='flex justify-end '>
                                <Button text=' Details'
                                    variant='cta'
                                    iconLeft={<Eye />}>
                                </Button>
                            </div>
                        </div>

                        {/* card 3 */}
                        <div className='p-6  w-[600px]  border border-brown-normal rounded-xl space-y-1'>
                            <div className='flex flex-row gap-4  '>
                                <img src="/images/party.png" className='w-[200px] rounded-2xl' />

                                <div className='flex flex-col flex-1 gap-2'>
                                    <h3 className='font-bold text-lg'>Tech Expo 2024</h3>
                                    <p className='text-md'><Calendar className='inline mr-1' /> March 15-17, 2024</p>
                                    <p className='text-md'><MapPin className='inline mr-1' /> San Francisco, CA</p>
                                </div>
                                <Button
                                    text='Confirmed'
                                    variant='tag'
                                    size='md'
                                    iconLeft=<CircleCheckBig className='font-sm text-green-500' /> >
                                </Button>

                            </div>
                            <div className='flex justify-end '>
                                <Button text=' Details'
                                    variant='cta'
                                    iconLeft={<Eye />}>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>



                {/* sales performance */}
                <div className='flex flex-row justify-between'>
                    <div className='border border-brown-normal rounded-xl mt-10 p-4 px-6 py-6 w-[450px] justify-items-center'>
                        {/* card 1 */}
                        <div className='flex flex-row justify-between w-[450px] px-6'>
                            <h2 className='font-dynapuff text-2xl font-medium'>
                                Sales Performance
                            </h2>
                            <Button text='View All'
                                variant='cta'
                                iconRight={<i className="fa-solid fa-arrow-right ml-2 "></i>}>
                            </Button>
                        </div>


                        {/* card 1 */}
                        <div className='p-6 w-full'>
                            <div className='flex flex-row gap-4  '>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <h3 className='font-bold text-xl'>Nov 2024</h3>
                                    <p className='text-lg'> $ 8,500</p>
                                    <p className='text-lg'>2 events</p>
                                </div>
                                <div>
                                    <TrendingUp className='text-green-500 inline' />
                                    <p>+12%</p>
                                </div>
                            </div>
                        </div>

                        {/* divider */}
                        <div className='w-full h-0.5 bg-brown-light-active'></div>

                        {/* card 2 */}
                        <div className='p-6 w-full'>
                            <div className='flex flex-row gap-4  '>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <h3 className='font-bold text-xl'>Nov 2024</h3>
                                    <p className='text-lg'> $ 8,500</p>
                                    <p className='text-lg'>2 events</p>
                                </div>
                                <div>
                                    <TrendingUp className='text-green-500 inline' />
                                    <p>+12%</p>
                                </div>
                            </div>
                        </div>

                        {/* divider */}
                        <div className='w-full h-0.5 bg-brown-light-active'></div>


                        {/* card 3 */}
                        <div className='p-6 w-full'>
                            <div className='flex flex-row gap-4  '>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <h3 className='font-bold text-xl'>Nov 2024</h3>
                                    <p className='text-lg'> $ 8,500</p>
                                    <p className='text-lg'>2 events</p>
                                </div>
                                <div>
                                    <TrendingDown className='text-red-500 inline' />
                                    <p>-12%</p>
                                </div>
                            </div>
                        </div>

                        {/* divider */}
                        <div className='w-full h-0.5 bg-brown-light-active'></div>

                        {/* card 4 */}
                        <div className='p-6 w-full'>
                            <div className='flex flex-row gap-4  '>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <h3 className='font-bold text-xl'>Nov 2024</h3>
                                    <p className='text-lg'> $ 8,500</p>
                                    <p className='text-lg'>2 events</p>
                                </div>
                                <div>
                                    <TrendingUp className='text-green-500 inline' />
                                    <p>+12%</p>
                                </div>
                            </div>
                        </div>

                        {/* divider */}
                        <div className='w-full h-0.5 bg-brown-light-active'></div>

                        {/* card 5 */}
                        <div className='p-6 w-full'>
                            <div className='flex flex-row gap-4  '>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <h3 className='font-bold text-xl'>Nov 2024</h3>
                                    <p className='text-lg'> $ 8,500</p>
                                    <p className='text-lg'>2 events</p>
                                </div>
                                <div>
                                    <TrendingUp className='text-green-500 inline' />
                                    <p>+12%</p>
                                </div>
                            </div>
                        </div>

                        {/* divider */}
                        <div className='w-full h-0.5 bg-brown-light-active mb-6'></div>

                        <Button text='View Detailed Analytics'
                            variant='cta'>
                        </Button>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default page
