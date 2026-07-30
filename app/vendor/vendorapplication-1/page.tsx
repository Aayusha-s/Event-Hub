'use client'
import React, { useState } from 'react'

import { ArrowLeft, Check } from 'lucide-react';
import Button from '@/components/Button';
import Link from 'next/link';

const Page = () => {

    const [businessType, setBusinessType] = useState('');
    const [years, setYears] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] =useState('');
    const [state,setState] = useState('');


    const [typeError, setTypeError] = useState('');
    const [yearsError, setYearsError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [websiteError, setWebsiteError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');

    const validateType = (value: string) : string => {
        if (!value){
            return "Please select one type!"
        }
        return '';
    }

    const validateYears = (value: string) : string => {
        if(!value){
            return "This is a required field!"
        }
        return '';
    }

    const validateEmail = (value: string): string => {
        if (!value){
            return 'Email is required!'
        }
        return '';
    }

    const validatePhone = (value: string): string => {
        if (!value){
            return 'Phone number is required!'
        }
        return '';
    }
    const validateWebsite = (value: string): string => {
        if (!value){
            return 'Website is required!'
        }
        return '';
    }

    const validateAddress = (value: string): string => {
        if (!value){
            return 'Business address is required!'
        }
        return '';
    }

    const validateCity = (value: string): string => {
        if (!value){
            return 'City is required!'
        }
        return '';
    }

    const validateState = (value: string): string => {
        if (!value){
            return 'State is required!'
        }
        return '';
    }

    const validateDescription = (value: string): string => {
        if (!value){
            return 'Description is required!'
        }
        return '';
    }

    return (

        <section className='flex flex-col
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>

            {/* back to dashboard button */}
            <div className='mb-4'>
                <Button text="Back to Dashboard" variant='cta' size='sm' iconLeft={<ArrowLeft />}></Button>
            </div>

            {/* title and subtitle */}
            <div className='flex flex-row items-center gap-4 mb-4'>
                <div className='relative bg-brown-normal p-4 rounded-md w-12 h-12 flex items-center justify-center'>
                    <Check strokeWidth={4} className='absolute text-white' />
                </div>

                <div className='flex flex-col'>
                    <h2 className='font-dynapuff text-lg md:text-xl lg:text-xl font-semibold '>
                        Vendor Application
                    </h2>
                    <p className='text-base md:text-md lg:text-md'>
                        Join EventHub as a verified vendor
                    </p>
                </div>
            </div>


            {/* main form */}
            <div className='border border-brown-normal rounded-xl p-4 flex flex-col gap-4 bg-brown-light'>
                <h2 className='font-dynapuff text-lg md:text-xl lg:text-xl font-medium'>
                    Business Information
                </h2>
                <p className='text-base md:text-md lg:text-md'>
                    Tell us about your business
                </p>


                {/* business type and years in business */}

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <h2 className="font-bold">Business Type *</h2>
                        <select name="business_type" id="business_type" className="w-full border border-brown-normal rounded-md p-3 mt-1"
                        value={businessType}
                        onChange={(e)=>{
                        setBusinessType(e.target.value);
                        setTypeError(validateType(e.target.value));
                        }}>
                            <option value="">Select an option</option>
                            <option value="music_concerts">Music Concerts</option>
                            <option value="concert_parties">Concert/Parties</option>
                            <option value="business_events">Business Events</option>
                            <option value="workshops_seminars">Workshops/Seminars</option>
                            <option value="sports_events">Sports Events</option>
                            <option value="community_events">Community Events</option>
                            <option value="festivals_fairs">Festivals/Fairs</option>
                            <option value="charity_nonprofit_events">Charity/Non-Profit Events</option>
                            <option value="other">Other</option>
                        </select>
                    </div>


                    <div>
                        <h2 className="font-bold">Years in Business *</h2>
                        <select name="years_in_business" id="years_in_business" className="w-full border border-brown-normal rounded-md p-3 mt-1"
                        value={years}
                        onChange={(e)=>{
                            setYears(e.target.value);
                            setYearsError(validateYears(e.target.value));
                        }}>
                            <option value="">Select experience</option>
                            <option value="less_than_1_year">Less than 1 year</option>
                            <option value="1_3_years">1-3 years</option>
                            <option value="3_5_years">3-5 years</option>
                            <option value="5_10_years">5-10 years</option>
                            <option value="more_than_10_years">More than 10 years</option>
                        </select>
                    </div>
                </div>


                {/* business description */}
                <div>
                    <h3 className='font-bold'>Business Description</h3>
                    <textarea
                        placeholder='Describe your business, what you offer, and what makes you unique...'
                        className='w-full border border-brown-normal rounded-md p-2 mt-1 h-32 resize-none'
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                            setDescriptionError(validateDescription(e.target.value));
                        }}
                >
                    </textarea>
                </div>


                {/* email address and phone number */}

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <h2 className="font-bold">Email Address</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value)
                                setEmailError(validateEmail(e.target.value))
                            }}/>
                    </div>

                    <div>
                        <h2 className="font-bold">Phone Number</h2>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            value={phone}
                            onChange={(e)=>{
                                setPhone(e.target.value)
                                setPhoneError(validatePhone(e.target.value))
                            }}/>
                    </div>
                </div>


                {/* website and business address */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <h2 className="font-bold">Website</h2>
                        <input
                            type="url"
                            placeholder="Enter your website"
                            className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            value={website}
                            onChange={(e)=>{
                                setWebsite(e.target.value)
                                setWebsiteError(validateWebsite(e.target.value))
                            }}/>
                    </div>

                    <div>
                        <h2 className="font-bold">Business Address</h2>
                        <input
                            type="text"
                            placeholder="Enter your business address"
                            className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            value={address}
                            onChange={(e)=>{
                                setAddress(e.target.value)
                                setAddressError(validateAddress(e.target.value))
                            }}/>
                    </div>
                </div>



                {/* city and state */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                    <div>
                        <h2 className="font-bold">City</h2>
                        <input
                            type="text"
                            placeholder="Enter your city"
                            className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            value={city}
                            onChange={(e)=>{
                                setCity(e.target.value)
                                setCityError(validateCity(e.target.value))
                            }}/>
                    </div>

                    <div>
                        <h2 className="font-bold">State</h2>
                        <input
                            type="text"
                            placeholder="Enter your state"
                            className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            value={state}
                            onChange={(e)=>{
                                setState(e.target.value)
                                setStateError(validateState(e.target.value))
                            }}/>
                    </div>
                </div>


                {/* steps */}
                <div className='h-0.5 bg-brown-normal'></div>
                <div className='flex justify-center gap-4'>
                    <p>Step 1 of 3</p>
                </div>

                {/* next button */}
                <div className='flex justify-end'>
                    <Link href='/vendor/vendorapplication-2'>
                        <Button text="Next Step" variant='cta' size='sm'></Button>
                    </Link>
                </div>
            </div>
        </section >

    )
}

export default Page
