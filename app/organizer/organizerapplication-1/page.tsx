'use client'
import React, { useState } from 'react'
import { ArrowLeft, Check, CircleAlert, Globe, Mail, Phone } from 'lucide-react';
import Button from '@/components/Button';
import Link from 'next/link';

const Page = () => {

    const [orgType, setOrgType] = useState('');
    const [email, setEmail] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [eventType, setEventType] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const [orgTypeError, setOrgTypeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [contactPersonError, setContactPersonError] = useState('');
    const [eventTypeError, setEventTypeError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [websiteError, setWebsiteError] = useState('');
    const [businessAddressError, setBusinessAddressError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');

    const handleNext = ()=> {
        const organizerStep1={
            orgType,
            email,
            contactPerson,
            eventType,
            description,
            website,
            businessAddress,
            city,
            state
        }

        localStorage.setItem('organizerStep1',JSON.stringify('organizerStep1'))
    }

    const validateOrgType = (value: string): string => {
        if (!value) {
            return 'Organization type is required';
        }
        return '';
    }

    const validateEmail = (value: string): string => {
        if (!value) {
            return "Email is required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return "Invalid email format";
        }
        return '';
    }

    const validateContactPerson = (value: string): string => {
        if (!value) {
            return "Contact person is required";
        }

        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(value)) {
            return "Invalid phone number format";
        }
        return '';
    }

    const validateEventType = (value: string): string => {
        if (!value) {
            return 'Event type is required';
        }

        return '';
    }

    const validateDescription = (value: string): string => {
        if (!value) {
            return "Description is required!"
        }
        return '';
    }

    const handlenext = () => {

    }




    return (

        <div>
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
                            Organizer Application
                        </h2>
                        <p className='text-base md:text-md lg:text-md'>
                            Tell us about your organization
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


                    {/* organization type   */}
                    <div className='flex flex-col gap-4 '>
                        <h2 className='font-bold text-md'>Organization Type *</h2>

                        <div className="flex items-center gap-2 w-full p-3 border border-brown-normal rounded-md cursor-pointer">
                            <input
                                type="radio"
                                id="individual"
                                name="org_type"
                            />
                            <label htmlFor="individual" className='cursor-pointer'>Individual Hosting Events</label>

                        </div>

                        <div className=" flex items-center gap-2 w-full p-3 border border-brown-normal rounded-md cursor-pointer">
                            <input
                                type="radio"
                                id="community"

                                name="org_type"
                                value="community" />
                            <label htmlFor="community" className='cursor-pointer'>Community / Group / Club</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full p-3 border border-brown-normal rounded-md cursor-pointer">
                            <input type="radio" id="business" name="org_type" value="business" />
                            <label htmlFor="business" className='cursor-pointer'>Business / Company</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full p-3 border border-brown-normal rounded-md cursor-pointer">
                            <input type="radio" id="agency" name="org_type" value="agency" />
                            <label htmlFor="agency" className='cursor-pointer'>Professional Event Agency</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full border border-brown-normal rounded-md p-3 cursor-pointer">
                            <input type="radio" id="nonprofit" name="org_type" value="nonprofit" />
                            <label htmlFor="nonprofit" className='cursor-pointer'>Non-Profit/ Charity</label>
                        </div>
                    </div>




                    {/* email */}

                    <div>
                        <h2 className="font-bold">Email *</h2>
                        <div className="flex items-center gap-2 p-2 mt-1 border border-brown-normal rounded-md focus:outline-brown-normal-active">
                            <Mail />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border-none focus:outline-none"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailError(validateEmail(e.target.value))
                                }}

                            />
                            {emailError && (
                                <div className="mt-2 flex items-center gap-1">
                                    <CircleAlert className="text-red-500" />
                                    <p className="text-sm text-red-500 ">{emailError}</p>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* contact person and type of event */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* contact person */}
                        <div>
                            <h2 className="font-bold">Contact Person *</h2>
                            <div className="flex items-center gap-2 p-2 mt-1 border border-brown-normal rounded-md focus:outline-brown-normal-active">
                                <Phone />
                                <input
                                    type="tel"
                                    placeholder="Enter contact person's phone number"
                                    className="w-full border-none focus:outline-none"
                                    value={contactPerson}
                                    onChange={(e) => {
                                        setContactPerson(e.target.value)
                                        setContactPersonError(validateContactPerson(e.target.value));
                                    }}
                                />

                                {contactPersonError && (
                                    <div className="mt-2 flex items-center gap-1">
                                        <CircleAlert className="text-red-500" />
                                        <p className="text-sm text-red-500 ">{contactPersonError}</p>
                                    </div>
                                )}
                            </div>
                        </div>


                        {/* event type */}
                        <div>
                            <h2 className="font-bold">Type of Event You Host *</h2>
                            <select
                                name="type_of_event"
                                id="type_of_event"
                                className="w-full border border-brown-normal rounded-md p-3 mt-1"
                                value={eventType}
                                onChange={(e) => {
                                    setEventType(e.target.value)
                                    setEventTypeError(validateEventType(e.target.value));
                                }}
                            >
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

                        {eventTypeError && (
                            <div className="mt-2 flex items-center gap-1">
                                <CircleAlert className="text-red-500" />
                                <p className="text-sm text-red-500 ">{contactPersonError}</p>
                            </div>
                        )}
                    </div>


                    {/* organization description */}
                    <div>
                        <h3 className='font-bold'>Organization Description *</h3>
                        <textarea
                            placeholder='Describe your business, what you offer, and what makes you unique...'
                            className='w-full border border-brown-normal rounded-md p-2 mt-1 h-32 resize-none'>
                        </textarea>
                    </div>

                    {/* website and bsuiness address */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                        {/* website */}
                        <div>
                            <h2 className="font-bold">Website (Optional)</h2>
                            <div className="flex items-center gap-2 p-2 mt-1 border border-brown-normal rounded-md focus:outline-brown-normal-active">
                                <Globe />
                                <input
                                    type="url"
                                    placeholder="Enter your website"
                                    className="w-full border-none focus:outline-none"

                                />
                            </div>
                        </div>



                        <div>
                            <h2 className="font-bold">Business Address</h2>
                            <input
                                type="text"
                                placeholder="Enter your business address"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1" />
                        </div>
                    </div>



                    {/* city and state */}
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>

                        {/* city */}
                        <div>
                            <h2 className="font-bold">City *</h2>
                            <div className="flex items-center gap-2 p-2 mt-1 border border-brown-normal rounded-md focus:outline-brown-normal-active">
                                <input
                                    type="text"
                                    placeholder="Enter your city"
                                    className="w-full border-none focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* state */}
                        <div>
                            <h2 className="font-bold">State *</h2>
                            <div className="flex items-center gap-2 p-2 mt-1 border border-brown-normal rounded-md focus:outline-brown-normal-active">

                                <input
                                    type="email"
                                    placeholder="Enter your state"
                                    className="w-full border-none focus:outline-none"

                                />
                            </div>
                        </div>


                    </div>


                    {/* steps */}
                    <div className='h-0.5 bg-brown-normal'></div>
                    <div className='flex justify-center gap-4'>
                        <p>Step 1 of 4</p>
                    </div>

                    {/* next button */}
                    <div className='flex justify-end'>
                        <Link href='/organizer/organizerapplication-2'>
                            <Button text="Next Step" variant='cta' size='sm'></Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page
