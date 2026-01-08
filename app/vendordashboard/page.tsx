import DashboardBox from '../../components/DashboardBox';
import Button from '../../components/Button';
import { Award, Calendar, Goal, Star, TrendingUp, MapPin, Eye, CircleCheckBig, Clock, TrendingDown, TriangleAlert, ArrowRight, Ticket, Users } from "lucide-react";
import { Camera } from "lucide-react";
import { File } from "lucide-react";
import { Crown } from "lucide-react";
import { DollarSign } from "lucide-react";
import VendorCards from '@/components/VendorCards';
import Link from 'next/link';

const page = () => {
    return (
        <section className='flex flex-col
        my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>

            {/*  */}
            <DashboardBox
                title="Vendor Dashboard"
                description="You have 3 upcoming booth bookings and 3 new leads"
                buttonText="Explore New Events"
            >
            </DashboardBox>



            {/* upgrade to premium vendor */}
            <div className='w-full border border-brown-normal rounded-xl p-4  mt-6 space-y-4'>
                <h3 className='font-dynapuff'> <Crown className='inline-block mr-2' />Upgrade to Premium Vendor</h3>
                <p>Get priority matching, verified badge, unlimited portfolio uploads, direct leads, and business tools for $39/month</p>
                <div className='mt-4 space-y-2 flex flex-row items-center flex-wrap gap-5 font-bold'>
                    <p><Award className='inline-block mr-1' /> Verified Badge</p>
                    <p><Goal className='inline-block mr-1' /> Priority Matching</p>
                    <p><Camera className='inline-block mr-1' /> Unlimited Portfolio Uploads</p>
                    <p><File className='inline-block mr-1' /> Direct Leads</p>
                </div>

                <div>
                </div>
                <Link href="/premium/vendor">
                    <Button text="Upgrade Now - $39/month" variant="cta"
                        iconRight={<i className="fa-solid fa-arrow-right ml-2 "></i>}>
                    </Button>
                </Link>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 lg:gap-4 justify-between'>

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



            <div className='flex flex-col gap-6 justify-between'>

                {/* upcoming booth bookings */}
                <div className='flex flex-col justify-between mt-10'>
                    <div className='flex flex-row items-center justify-between'>
                        <h2 className=' text-xl md:text-xl lg:text-2xl font-bold'>
                            Upcoming Booth Bookings
                        </h2>
                        <Button text='View All'
                            variant='secondary'
                            size='sm'
                            iconRight={<ArrowRight size={18} />}>
                        </Button>
                    </div>
                    <div className='border border-brown-normal rounded-xl mt-6 p-4 w-full
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-6 justify-items-center'>

                        {/* card 1 */}
                        <div className='p-4 w-full border border-brown-normal rounded-xl space-y-1'>
                            <div className='flex flex-col lg:flex-row gap-4'>
                                <img src="/images/party.png" className='w-full h-auto lg:max-w-[200px] rounded-2xl' />

                                <div className='flex flex-col flex-1 gap-2'>
                                    <h3 className='font-bold text-lg'>Tech Expo 2024</h3>
                                    <p className='text-md'><Calendar className='inline mr-1' /> March 15-17, 2024</p>
                                    <p className='text-md'><MapPin className='inline mr-1' /> San Francisco, CA</p>
                                </div>

                                <div>
                                    <Button
                                        text='Confirmed'
                                        variant='tag'
                                        size='sm'
                                        status='success'
                                        iconLeft={<CircleCheckBig size={18} />} >
                                    </Button>
                                </div>

                            </div>
                            <div className='flex justify-end'>
                                <Button text='Details'
                                    variant='cta'
                                    iconLeft={<Eye />}>
                                </Button>
                            </div>
                        </div>

                        {/* card 2 */}
                        <div className='p-4 w-full border border-brown-normal rounded-xl space-y-1'>
                            <div className='flex flex-col lg:flex-row gap-4'>
                                <img src="/images/party.png" className='w-full h-auto lg:max-w-[200px] rounded-2xl' />

                                <div className='flex flex-col flex-1 gap-2'>
                                    <h3 className='font-bold text-lg'>Tech Expo 2024</h3>
                                    <p className='text-md'><Calendar className='inline mr-1' /> March 15-17, 2024</p>
                                    <p className='text-md'><MapPin className='inline mr-1' /> San Francisco, CA</p>
                                </div>
                                <div>

                                    <Button
                                        text='Pending'
                                        variant='tag'
                                        size='sm'
                                        status='warning'
                                        iconLeft={<Clock size={18} />} >
                                    </Button>
                                </div>

                            </div>
                            <div className='flex justify-end '>
                                <Button text='Details'
                                    variant='cta'
                                    iconLeft={<Eye />}>
                                </Button>
                            </div>
                        </div>

                        {/* card 3 */}
                        <div className='p-4 w-full border border-brown-normal rounded-xl space-y-1'>
                            <div className='flex flex-col lg:flex-row gap-4'>
                                <img src="/images/party.png" className='w-full h-auto lg:max-w-[200px] rounded-2xl' />

                                <div className='flex flex-col flex-1 gap-2'>
                                    <h3 className='font-bold text-lg'>Tech Expo 2024</h3>
                                    <p className='text-md'><Calendar className='inline mr-1' /> March 15-17, 2024</p>
                                    <p className='text-md'><MapPin className='inline mr-1' /> San Francisco, CA</p>
                                </div>
                                <div>

                                    <Button
                                        text='Confirmed'
                                        variant='tag'
                                        size='sm'
                                        status='success'
                                        iconLeft={<CircleCheckBig size={18} />}>
                                    </Button>
                                </div>

                            </div>
                            <div className='flex justify-end '>
                                <Button text=' Details'
                                    variant='cta'
                                    iconLeft={<Eye />}>
                                </Button>
                            </div>
                        </div>


                        {/* card 4 */}
                        <div className='p-4 w-full border border-brown-normal rounded-xl space-y-1'>
                            <div className='flex flex-col lg:flex-row gap-4'>
                                <img src="/images/party.png" className='w-full h-auto lg:max-w-[200px] rounded-2xl' />

                                <div className='flex flex-col flex-1 gap-2'>
                                    <h3 className='font-bold text-lg'>Tech Expo 2024</h3>
                                    <p className='text-md'><Calendar className='inline mr-1' /> March 15-17, 2024</p>
                                    <p className='text-md'><MapPin className='inline mr-1' /> San Francisco, CA</p>
                                </div>
                                <div>

                                    <Button
                                        text='Error'
                                        variant='tag'
                                        size='sm'
                                        status='danger'
                                        iconLeft={<TriangleAlert size={18} />}>
                                    </Button>
                                </div>

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



                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>


                    {/* sales performance */}
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
                                Recent Reviews
                            </h2>
                            <Button text='View All'
                                variant='secondary'
                                size='sm'
                                iconRight={<ArrowRight size={18} />}>
                            </Button>
                        </div>


                        <div className='border border-brown-normal rounded-xl mt-6 p-4 w-full justify-items-center'>

                            {/* card 1 */}
                            <div className='w-full flex flex-col'>
                                <div className='flex flex-row justify-between'>
                                    <p className='font-semibold text-lg'>Summer Events LLC</p>
                                    <div className=' flex flex-row gap-1'>
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <p className='text-md'>Jazz Festival 2024</p>
                                    <p className=''>Excellent vendor! Professional setup and great products.</p>
                                    <p className='text-sm text-gray-500'>Nov 2024</p>

                                </div>
                            </div>

                            {/* divider */}
                            <div className='w-full h-0.5 bg-brown-light-hover my-4'></div>


                            {/* card 2 */}
                            <div className='w-full flex flex-col'>
                                <div className='flex flex-row justify-between'>
                                    <p className='font-semibold text-lg'>City Markets</p>
                                    <div className=' flex flex-row gap-1'>
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <p className='text-md'>Food Truck Rally</p>
                                    <p className=''>Very reliable and attendees loved their offerings.</p>
                                    <p className='text-sm text-gray-500'>Oct 2024</p>

                                </div>
                            </div>

                            {/* divider */}
                            <div className='w-full h-0.5 bg-brown-light-hover my-4'></div>


                            {/* card 3 */}
                            <div className='w-full flex flex-col'>
                                <div className='flex flex-row justify-between'>
                                    <p className='font-semibold text-lg'>Tech Events Co</p>
                                    <div className=' flex flex-row gap-1'>
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <p className='text-md'>Innovation Expo</p>
                                    <p className=''>Good service, would work with again.</p>
                                    <p className='text-sm text-gray-500'>Sep 2024</p>

                                </div>
                            </div>

                            {/* divider */}
                            <div className='w-full h-0.5 bg-brown-light-hover my-4'></div>


                            {/* card 4 */}
                            <div className='w-full flex flex-col'>
                                <div className='flex flex-row justify-between'>
                                    <p className='font-semibold text-lg'>Summer Events LLC</p>
                                    <div className=' flex flex-row gap-1'>
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-yellow-500' size={18} />
                                        <Star className='text-gray-500' size={18} />
                                    </div>
                                </div>

                                <div className='flex flex-col'>
                                    <p className='text-md'>Jazz Festival 2024</p>
                                    <p className=''>Excellent vendor! Professional setup and great products.</p>
                                    <p className='text-sm text-gray-500'>Nov 2024</p>

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
