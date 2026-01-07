'use client'
import Button from '@/components/Button'
import Tickets from '@/components/Tickets'
import { Calendar, Check, Clock, MapPin, Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
    const [step, setStep] = useState<"tickets" | "details" | "payments" | "confirmBooking">("tickets");
    return (
        <section className='flex flex-col
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>


            <div className='grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4'>

                {/* left side */}
                <div className=''>

                    <div className='border border-brown-normal rounded-xl p-4 flex flex-col gap-4 md:flex-row'>
                        <div className="w-full md:w-[200px] md:h-[130px] lg:w-[300px] lg:h-[200px] overflow-hidden rounded-2xl">
                            <img
                                src="/images/business.png"
                                alt="Business"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className='flex flex-col '>
                            <h1 className='text-xl font-semibold my-2'>Summer Music Festival 2025</h1>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-row items-center gap-2'><Calendar size={18} /><p>July 15, 2025</p></div>
                                <div className='flex flex-row items-center gap-2'> <Clock size={18} /><p>6:00 PM - 11:30 PM</p></div>
                                <div className='flex flex-row items-center gap-2'><MapPin size={18} /><p>Central Park</p></div>
                            </div>
                        </div>
                    </div>


                    {/* select tickets */}

                    {step === "tickets" && (
                        <>
                            <div className='border border-brown-normal p-4 rounded-xl mt-4'>
                                <h3 className='font-bold mb-4'>Select Tickets</h3>
                                <div className='flex flex-col gap-4'>
                                    {/* general ticket  */}
                                    <Tickets
                                        title='General Admission'
                                        subtitle='Standing room access to the main area'
                                        price={45}
                                        remainingTickets={234}
                                        features={['Standing access', 'Genral entry', 'Access to food courts']}
                                    />
                                    <Tickets
                                        title='VIP Pass'
                                        subtitle='Premium seating with exclusive benefits'
                                        price={95}
                                        remainingTickets={45}
                                        features={['Premium seating', 'Meet & greet access', 'Exclusive Merchandise', 'Priority entry', 'VIP lounge access']}
                                    />
                                    <Tickets
                                        title='Early Bird'
                                        subtitle='Limited time discount offer'
                                        price={35}
                                        remainingTickets={0}
                                        features={['Standing access', 'General entry']}
                                    />
                                </div>

                                <div className='flex justify-end mt-4'><Button
                                    text="Continue to Details"
                                    variant='cta'
                                    size='md'
                                    onClick={() => setStep("details")} /></div>


                            </div>
                        </>
                    )}

                    {step === "details" && (
                        <>
                            <div className='border border-brown-normal p-4 rounded-xl mt-4'>
                                <h3 className='font-bold mb-4'>Your Details</h3>

                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                    <div className='flex flex-col'>
                                        <label htmlFor='firstName' className='mb-1'>First Name</label>
                                        <input
                                            type='text'
                                            id='firstName'
                                            className='border border-brown-normal rounded-lg px-3 py-2
                                                focus:outline-none focus:ring-1 focus:ring-brown-normal'
                                            placeholder='Enter your first name' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor='lastName' className='mb-1'>Last Name</label>
                                        <input
                                            type='text'
                                            id='lastName'
                                            className='border border-brown-normal rounded-lg px-3 py-2
                                                focus:outline-none focus:ring-1 focus:ring-brown-normal'
                                            placeholder='Enter your last name' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor='email' className='mb-1'>Email</label>
                                        <input
                                            type='email'
                                            id='email'
                                            className='border border-brown-normal rounded-lg px-3 py-2
                                                focus:outline-none focus:ring-1 focus:ring-brown-normal'
                                            placeholder='Enter your email' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor='phoneNumber' className='mb-1'>Phone Number</label>
                                        <input
                                            type='tel'
                                            id='phoneNumber'
                                            className='border border-brown-normal rounded-lg px-3 py-2
                                                focus:outline-none focus:ring-1 focus:ring-brown-normal'
                                            placeholder='Enter your phone number' />
                                    </div>
                                </div>
                                <div className='flex flex-col mt-4'>
                                    <label htmlFor="textarea" className='mb-1'> Special Requests (optional)</label>
                                    <textarea
                                        id="textarea"
                                        rows={4}
                                        className="w-full border border-brown-normal rounded-lg px-3 py-2 
                                            focus:outline-none focus:ring-1 focus:ring-brown-normal"
                                        placeholder="Enter any special requests here"></textarea>
                                </div>

                                <div className='flex justify-end gap-4 mt-4'>

                                    <Button
                                        text="Back"
                                        variant='cta'
                                        size='md'
                                        onClick={() => setStep("tickets")} />

                                    <Button
                                        text="Continue to Payments"
                                        variant='cta'
                                        size='md'
                                        onClick={() => setStep("payments")} />
                                </div>


                            </div>
                        </>
                    )}



                    {step === "payments" && (
                        <>
                            <div className='border border-brown-normal p-4 rounded-xl mt-4'>
                                <h3 className='font-bold mb-4'>Select Tickets</h3>
                                <div className='flex flex-col gap-4'>
                                    {/* payment method  */}
                                    {/* <div className='flex flex-col'>
                                        <label className='mb-2 font-medium'>Payment Method</label>
                                        <select

                                            className='border border-brown-normal rounded-lg px-3 py-2
                                                focus:outline-none focus:ring-1 focus:ring-brown-normal'>
                                            <option value="creditCard">Credit/Debit Card</option>
                                            <option value="khalti">Khalti by IME</option>
                                            <option value="eSewa">eSewa Mobile Wallet</option>
                                        </select>
                                    </div> */}

                                    {/* card details */}

                                    <div className='flex flex-col'>
                                        <label htmlFor='cardNumber' className='mb-1'>Card Number</label>
                                        <input
                                            type='text'
                                            id='cardNumber'
                                            className='border border-brown-normal rounded-lg px-3 py-2
                                                focus:outline-none focus:ring-1 focus:ring-brown-normal'
                                            placeholder='1234 5678 9012 3456' />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor='cardCardHolder' className='mb-1'>Cardholder Name</label>
                                        <input
                                            type='text'
                                            id='cardCardHolder'
                                            className='border border-brown-normal rounded-lg px-3 py-2
                                                focus:outline-none focus:ring-1 focus:ring-brown-normal'
                                            placeholder='John Doe' />
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div className='flex flex-col'>
                                            <label htmlFor='expiryDate' className='mb-1'>Expiry Date</label>
                                            <input
                                                type='text'
                                                id='expiryDate'
                                                className='border border-brown-normal rounded-lg px-3 py-2
                                                    focus:outline-none focus:ring-1 focus:ring-brown-normal'
                                                placeholder='MM/YY' />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor='cvv' className='mb-1'>CVV</label>
                                            <input
                                                type='text'
                                                id='cvv'
                                                className='border border-brown-normal rounded-lg px-3 py-2
                                                    focus:outline-none focus:ring-1 focus:ring-brown-normal'
                                                placeholder='123' />
                                        </div>
                                    </div>


                                </div>

                                <div className='flex justify-end gap-4 mt-4'>

                                    <Button
                                        text="Back"
                                        variant='cta'
                                        size='md'
                                        onClick={() => setStep("details")} />

                                    <Button
                                        text="Confirm Booking"
                                        variant='cta'
                                        size='md'
                                        onClick={() => setStep("confirmBooking")} />
                                </div>

                            </div>
                        </>
                    )}

                    {step === "confirmBooking" && (
                        <>
                            <div className='border border-brown-normal p-4 rounded-xl mt-4 flex flex-col items-center text-center'>
                                <Check size={48} className='text-green-500 mb-4' />
                                <h2 className='text-2xl font-bold mb-2'>Booking Confirmed!</h2>
                                <p className='mb-4'>Thank you for booking your tickets to the Summer Music Festival 2025. A confirmation email has been sent to you.</p>
                                <Link href='/'><Button
                                    text="Back to Home"
                                    variant='cta'
                                    size='md' /></Link>
                            </div>
                        </>
                    )}
                </div>


                {/* right side */}
                <div className="relative">
                    <div className="sticky top-4 w-full border border-brown-normal rounded-xl p-4">
                        <h3 className="font-bold">Order Summary</h3>
                        <div className="flex flex-col gap-4 my-4">
                            <div className="flex flex-row justify-between">
                                <p>VIP Pass x 1</p>
                                <p>$95.00</p>
                            </div>

                            {/* divider */}
                            <div className="w-full h-0.5 bg-brown-light-hover my-2"></div>

                            <div className="flex flex-row justify-between">
                                <p>Subtotal</p>
                                <p>$95.00</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>Service Fee</p>
                                <p>$4.75</p>
                            </div>

                            {/* divider */}
                            <div className="w-full h-0.5 bg-brown-light-hover my-2"></div>

                            <div className="flex flex-row justify-between font-bold">
                                <p>Total</p>
                                <p>$99.75</p>
                            </div>

                            <label
                                htmlFor="text">
                                Promo Code
                            </label>

                            <div className="grid grid-cols-[3fr_1fr] gap-2">
                                <input
                                    id="text"
                                    type="text"
                                    placeholder="Enter promo code"
                                    className="border border-gray-300 rounded-lg px-3 py-2
                                        focus:outline-none focus:ring-1 focus:ring-brown-normal"/>

                                <Button
                                    text="Apply"
                                    variant='cta'
                                    size='md'>
                                </Button>
                            </div>


                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default page
