import { ArrowRight, Calendar, ChartColumn, ChartColumnBig, DollarSign, Goal, ShoppingBag, Star, TrendingUp, Users } from 'lucide-react'
import VendorCards from '@/components/VendorCards';
import React from 'react'
import Button from '@/components/Button';

const page = () => {
    return (
        <section className='flex flex-col
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>
            <h3 className='font-dynapuff text-lg md:text-xl lg:text-2xl font-semibold mb-4'>Detailed Analytics</h3>
            <p className='text-lg md:text-xl lg:text-xl font-semibold'>Track your performance and sales metrics</p>

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 lg:gap-4 justify-between'>

                {/* vendor cards */}
                <VendorCards
                    icon1={<DollarSign className='text-3xl text-green-500' />}
                    count={12450}
                    label="Total Revenue"
                    icon2={<TrendingUp className='inline mr-2 text-green-500' />}
                    subLabel="+12.5% from last period"
                >
                </VendorCards>

                <VendorCards
                    icon1={<ShoppingBag className='text-3xl text-purple-500' />}
                    count={234}
                    label="Total Sales"
                    icon2={<TrendingUp className='inline mr-2 text-green-500' />}
                    subLabel="+8.3% from last month">
                </VendorCards>

                <VendorCards
                    icon1={<Users className='text-3xl text-blue-500' />}
                    count={5680}
                    label="Customer Reach"
                    icon2={<TrendingUp className='inline mr-2 text-green-500' />}
                    subLabel="+15.7% from last month">
                </VendorCards>

                <VendorCards
                    icon1={<ChartColumn className='text-3xl text-red-500' />}
                    count={4.12}
                    label="Conversion Rate"
                    icon2={<TrendingUp className='inline mr-2 text-green-500' />}
                    subLabel="+2.1% from last period">
                </VendorCards>

            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                {/* revenue by event */}
                <div className='flex flex-col mt-10'>
                    <div className='border border-brown-normal rounded-xl p-4 w-full'>

                        {/* title and button */}
                        <h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-8'>
                            Revenue by Event
                        </h2>


                        {/* card 1 */}
                        <div className='mb-6'>
                            <div className='flex flex-row justify-between font-bold mb-2 text-md lg:text-xl'>
                                <p>Summer Music Festival</p>
                                <p>$4500</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm md:text-md lg:text-lg'>July 2024</p>
                                <div className='w-full bg-brown-light-active h-2 rounded-full mt-2'>
                                    <div className='bg-brown-normal h-2 rounded-full' style={{ width: '75%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* card 2 */}
                        <div className='mb-6'>
                            <div className='flex flex-row justify-between font-bold mb-2 text-md lg:text-xl'>
                                <p>Summer Music Festival</p>
                                <p>$4500</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm md:text-md lg:text-lg'>July 2024</p>
                                <div className='w-full bg-brown-light-active h-2 rounded-full mt-2'>
                                    <div className='bg-brown-normal h-2 rounded-full' style={{ width: '75%' }}></div>
                                </div>
                            </div>
                        </div>


                        {/* card 3 */}
                        <div>
                            <div className='flex flex-row justify-between font-bold mb-2 text-md lg:text-xl'>
                                <p>Summer Music Festival</p>
                                <p>$4500</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-sm md:text-md lg:text-lg'>July 2024</p>
                                <div className='w-full bg-brown-light-active h-2 rounded-full mt-2'>
                                    <div className='bg-brown-normal h-2 rounded-full' style={{ width: '75%' }}></div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>



                {/* top selling products */}
                <div className='flex flex-col mt-10'>

                    <div className='border border-brown-normal rounded-xl p-4 w-full '>

                        <h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-6'>
                            Top Selling Products
                        </h2>

                        <div className='flex flex-col gap-8'>
                            {/* card 1 */}
                            <div className='flex items-center justify-between '>
                                <div className='flex flex-row gap-4 items-center'>
                                    <div className='border border-purple-500 bg-purple-50 w-15 h-15 flex items-center justify-center rounded-xl'>
                                        <p className='font-bold'>1</p>
                                    </div>

                                    <div>
                                        <p className='text-lg font-bold'>Artisan Coffee</p>
                                        <p>156 sales</p>
                                    </div>
                                </div>
                                <p className='font-bold'>$4520</p>
                            </div>


                            {/* card 1 */}
                            <div className='flex items-center justify-between'>
                                <div className='flex flex-row gap-4 items-center'>
                                    <div className='border border-purple-500 bg-purple-50 w-15 h-15 flex items-center justify-center rounded-xl'>
                                        <p className='font-bold'>2</p>
                                    </div>

                                    <div>
                                        <p className='text-lg font-bold'>Artisan Coffee</p>
                                        <p>156 sales</p>
                                    </div>
                                </div>
                                <p className='font-bold'>$4520</p>
                            </div>


                            {/* card 1 */}
                            <div className='flex items-center justify-between'>
                                <div className='flex flex-row gap-4 items-center'>
                                    <div className='border border-purple-500 bg-purple-50 w-15 h-15 flex items-center justify-center rounded-xl'>
                                        <p className='font-bold'>3</p>
                                    </div>

                                    <div>
                                        <p className='text-lg font-bold'>Artisan Coffee</p>
                                        <p>156 sales</p>
                                    </div>
                                </div>
                                <p className='font-bold'>$4520</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* revenue trend */}
            <div className='border border-brown-normal rounded-xl p-4 w-full mt-10'>
                
                {/* title and button */}
                <div className='flex justify-between'>
                    <h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-6'>
                        Revenue Trend
                    </h2>
                    <div>
                        <button className='flex items-center justify-end gap-1 bg-gray-300 text-black px-2 py-1 rounded-full text-sm'>
                            Last 6 months
                        </button>
                    </div>

                </div>


                <div className='flex flex-col gap-4'>
                    
                    {/* trend 1 */}
                    <div>
                        <div className='flex justify-between font-bold '>
                            <p>Jan</p>
                            <p>$2100</p>
                        </div>
                        <div className='w-full bg-brown-light-active h-2 rounded-full mt-2 mb-4'>
                            <div className='bg-brown-normal h-2 rounded-full' style={{ width: '35%' }}></div>
                        </div>
                    </div>


                    {/* trend 2 */}
                    <div>
                        <div className='flex justify-between font-bold '>
                            <p>Feb</p>
                            <p>$2100</p>
                        </div>
                        <div className='w-full bg-brown-light-active h-2 rounded-full mt-2 mb-4'>
                            <div className='bg-brown-normal h-2 rounded-full' style={{ width: '95%' }}></div>
                        </div>
                    </div>


                    {/* trend 3 */}
                    <div>
                        <div className='flex justify-between font-bold '>
                            <p>Mar</p>
                            <p>$2100</p>
                        </div>
                        <div className='w-full bg-brown-light-active h-2 rounded-full mt-2 mb-4'>
                            <div className='bg-brown-normal h-2 rounded-full' style={{ width: '55%' }}></div>
                        </div>
                    </div>


                    {/* trend 4 */}
                    <div>
                        <div className='flex justify-between font-bold '>
                            <p>Apr</p>
                            <p>$2100</p>
                        </div>
                        <div className='w-full bg-brown-light-active h-2 rounded-full mt-2 mb-4'>
                            <div className='bg-brown-normal h-2 rounded-full' style={{ width: '42%' }}></div>
                        </div>
                    </div>


                    {/* trend 5 */}
                    <div>
                        <div className='flex justify-between font-bold '>
                            <p>May</p>
                            <p>$2100</p>
                        </div>
                        <div className='w-full bg-brown-light-active h-2 rounded-full mt-2 mb-4'>
                            <div className='bg-brown-normal h-2 rounded-full' style={{ width: '67%' }}></div>
                        </div>
                    </div>
                    


                    {/* trend 6 */}
                    <div>
                        <div className='flex justify-between font-bold '>
                            <p>Jun</p>
                            <p>$2100</p>
                        </div>
                        <div className='w-full bg-brown-light-active h-2 rounded-full mt-2 mb-4'>
                            <div className='bg-brown-normal h-2 rounded-full' style={{ width: '48%' }}></div>
                        </div>
                    </div>


                    {/* trend 7 */}
                    <div>
                        <div className='flex justify-between font-bold '>
                            <p>Jul</p>
                            <p>$2100</p>
                        </div>
                        <div className='w-full bg-brown-light-active h-2 rounded-full mt-2 mb-4'>
                            <div className='bg-brown-normal h-2 rounded-full' style={{ width: '73%' }}></div>
                        </div>
                    </div>


                    {/* trend 8 */}
                    <div>
                        <div className='flex justify-between font-bold '>
                            <p>Aug</p>
                            <p>$2100</p>
                        </div>
                        <div className='w-full bg-brown-light-active h-2 rounded-full mt-2 mb-4'>
                            <div className='bg-brown-normal h-2 rounded-full' style={{ width: '87%' }}></div>
                        </div>
                    </div>


                    {/* trend 9 */}
                    <div>
                        <div className='flex justify-between font-bold '>
                            <p>Sep</p>
                            <p>$2100</p>
                        </div>
                        <div className='w-full bg-brown-light-active h-2 rounded-full mt-2 mb-4'>
                            <div className='bg-brown-normal h-2 rounded-full' style={{ width: '67%' }}></div>
                        </div>
                    </div>


                    {/* trend 10 */}
                    <div>
                        <div className='flex justify-between font-bold '>
                            <p>Oct</p>
                            <p>$2100</p>
                        </div>
                        <div className='w-full bg-brown-light-active h-2 rounded-full mt-2 mb-4'>
                            <div className='bg-brown-normal h-2 rounded-full' style={{ width: '81%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* key insights */}
            <div className='border border-purple-400 bg-purple-50 rounded-xl p-4 mt-10'>
                <h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-6 flex items-center '>
                    <ChartColumnBig className='inline mr-2 text-blue-700' />
                    Key Insights
                </h2>
                <ul className='list-disc list-inside space-y-3'>
                    <li>Your revenue has <span className='font-bold'>increased by 12.5%</span> compared to the last period, indicating strong growth.</li>
                    <li>The<span className='font-bold'> Summer Music Festival</span> was your top-performing event, generating $4500 in revenue.</li>
                    <li><span className='font-bold'>Artisan Coffee</span> is your best-selling product with 156 sales, contributing significantly to your total revenue.</li>
                    <li>Your customer reach has <span className='font-bold'> expanded by 15.7%</span>, suggesting effective marketing strategies.</li>
                    <li>The conversion rate has  <span className='font-bold'>improved by 2.1%</span>, reflecting better engagement with your audience.</li>
                </ul>
            </div>

        </section>


    )
}

export default page
