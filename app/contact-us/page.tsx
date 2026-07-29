import Button from '@/components/Button'
import { Calendar, CircleQuestionMark, Clock, Cookie, FileText, Headphones, Mail, MapPin, MessageSquare, Phone, Send, Timer } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <section className='flex flex-col
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>
            <h3 className='font-dynapuff text-lg md:text-xl lg:text-2xl font-semibold mb-4 text-center'>Contact Us</h3>

            <p className='text-lg md:text-xl lg:text-xl font-semibold text-center'>Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>

            {/* box */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>

                {/* box 1 */}
                <div className='flex flex-col justify-center items-center gap-3 border border-gray-300 rounded-xl p-4 hover:shadow-lg hover:border-blue-400 transition-shadow duration-300 cursor-pointer'>
                    <div className='w-15 h-15 bg-blue-50 flex items-center justify-center rounded-xl'>
                        <Mail className='text-blue-600' />
                    </div>

                    <p className='font-bold'>Email Support</p>
                    <p>Get help via email</p>
                    <a href="mailto: support@example.com" className='text-purple-500 hover:underline hover:text-purple-600'>support@example.com</a>
                    <p className='text-sm'>Responses within 24 hours</p>

                </div>


                {/* box 2 */}
                <div className='flex flex-col justify-center items-center gap-3 border border-gray-300 rounded-xl p-4 hover:shadow-lg hover:border-green-400 transition-shadow duration-300 cursor-pointer'>
                    <div className='w-15 h-15 bg-green-50 flex items-center justify-center rounded-xl'>
                        <MessageSquare className='text-green-600' />
                    </div>

                    <p className='font-bold'>Live Chat Support</p>
                    <p>Chat with our team</p>
                    <p className='text-purple-500 hover:underline hover:text-purple-600'>Available 24/7</p>
                    <p className='text-sm'>Instant Responses</p>
                </div>

                {/* box 3 */}
                <div className='flex flex-col justify-center items-center gap-3 border border-gray-300 rounded-xl p-4 hover:shadow-lg hover:border-purple-400 transition-shadow duration-300 cursor-pointer'>
                    <div className='w-15 h-15 bg-purple-50 flex items-center justify-center rounded-xl'>
                        <Phone className='text-purple-600' />
                    </div>

                    <p className='font-bold'>Phone Support</p>
                    <p>Call us directly</p>
                    <a href="tel: 9816254193" className='text-purple-500 hover:underline hover:text-purple-600'>9816254193</a>
                    <p className='text-sm'>Mon-Fri, 9am - 6pm PST</p>

                </div>

                {/* box 4 */}
                <div className='flex flex-col justify-center items-center gap-3 border border-gray-300 rounded-xl p-4 hover:shadow-lg hover:border-orange-400 transition-shadow duration-300 cursor-pointer'>
                    <div className='w-15 h-15 bg-orange-50 flex items-center justify-center rounded-xl'>
                        <CircleQuestionMark className='text-orange-600' />
                    </div>

                    <p className='font-bold'>Help Center</p>
                    <p>Find answers instantly</p>
                    <p className='text-purple-500 hover:underline hover:text-purple-600'>Browse FAQs and guides</p>
                    <p className='text-sm'>Available 24/7</p>

                </div>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 mt-4'>

                {/* left side */}
                <div>
                    {/* form */}
                    <div className='border border-gray-300 rounded-xl p-4 mt-4'>

                        <div className='flex gap-4'>
                            <div><div className='w-15 h-15 bg-purple-100 rounded-xl flex items-center justify-center'>
                                <Send className='text-purple-700' />
                            </div></div>
                            <div className='space-y-2'>
                                <h1 className="text-xl font-bold">Send us a Message</h1>
                                <p className='text-justify'>Fill out the form below and we&apos;ll get back to you</p>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <h2 className="font-bold">Full Name *</h2>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            />
                        </div>

                        <div className='mt-4'>
                            <h2 className="font-bold">Email Address *</h2>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            />
                        </div>

                        <div className='mt-4'>
                            <h2 className="font-bold">Category *</h2>
                            <select name="category" id="category" className="w-full border border-brown-normal rounded-md p-3 mt-1">
                                <option value="" disabled>Select a category</option>
                                <option value="general-inquiry">General Inquiry</option>
                                <option value="technical-support">Technical Support</option>
                                <option value="billing-payments">Billing & Payments</option>
                                <option value="partnership-opportunity">Partnership Opportunity</option>
                                <option value="feedback-suggestions">Feedback and Suggestions</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        <div className='mt-4'>
                            <h2 className="font-bold">Subject *</h2>
                            <input
                                type="text"
                                placeholder="How can we help?"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            />
                        </div>

                        <div className='mt-4'>
                            <h2 className="font-bold">Message *</h2>
                            <textarea
                                placeholder="Type us more about yout inquiry..."
                                className="w-full border border-brown-normal rounded-md p-2 mt-1 h-32"
                            />
                        </div>
                    </div>

                    {/* cta button */}
                    <div className='mt-4 border border-brown-normal rounded-xl p-4'>
                        <div className='flex items-center gap-4'>
                            <div><FileText /></div>
                            <div>
                                <p className='font-bold text-lg'>Response Time</p>
                                <p>We typically respond within 24 hours during business days. For urgent matters, please use our live chat or call our support line.</p>
                            </div>
                        </div>
                        <div className='flex justify-center'><Button
                            text='Send Message'
                            iconLeft={<Send size={18} />}
                            className='mt-4 w-full 2xl:w-auto'
                        />
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div>

                    {/* Business hours */}
                    <div className='border border-gray-300 rounded-xl p-4 mt-4'>
                        <div className='flex gap-4'>
                            <div><div className='w-15 h-15 bg-blue-100 rounded-xl flex items-center justify-center'>
                                <MapPin className='text-blue-700' />
                            </div></div>
                            <div className='space-y-2'>
                                <h1 className="text-xl font-bold">Our Offices</h1>
                                <p className='text-justify'>Time Zone: PST (UTC-8)</p>
                            </div>
                        </div>

                        <div className='mt-4 space-y-4'>
                            <div className='flex flex-col justify-between gap-1'>
                                <h2 className='font-bold'>San Francisco</h2>
                                <p className='text-sm'>123 Market Street, Suite 500CA 94103</p>
                                <p className='text-sm hover:underline font-semibold'>+1 (555) 123-4567</p>
                            </div>
                            <div className='flex flex-col justify-between gap-1'>
                                <h2 className='font-bold'>New York</h2>
                                <p className='text-sm'>456 Madison Avenue, 10th Floor, NY 10022</p>
                                <p className='text-sm hover:underline font-semibold'>+1 (555) 987-6543</p>
                            </div>
                            <div className='flex flex-col justify-between gap-1'>
                                <h2 className='font-bold'>London</h2>
                                <p className='text-sm'>789 Oxford Street, London W1D 2ES, UK</p>
                                <p className='text-sm hover:underline font-semibold'>+44 20 7946 0958</p>
                            </div>
                        </div>
                    </div>

                    {/* Business hours */}
                    <div className='border border-gray-300 rounded-xl p-4 mt-4'>
                        <div className='flex gap-4'>
                            <div><div className='w-15 h-15 bg-green-100 rounded-xl flex items-center justify-center'>
                                <Clock className='text-green-700' />
                            </div></div>
                            <div className='space-y-2'>
                                <h1 className="text-xl font-bold">Business Hours</h1>
                                <p className='text-justify'>Time Zone: PST (UTC-8)</p>
                            </div>
                        </div>
                        <div className='mt-4 space-y-4'>
                            <div className='flex justify-between'>
                                <h2 className='font-bold'>Monday-Friday</h2>
                                <p className='text-sm'>9:00 AM- 6:00 PM</p>
                            </div>

                            <div className='flex justify-between'>
                                <h2 className='font-bold'>Saturday</h2>
                                <p>10:00 AM - 4:00 PM</p>
                            </div>

                            <div className='flex justify-between'>
                                <h2 className='font-bold'>Sunday</h2>
                                <p>Closed</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page
