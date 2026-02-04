'use client';
import React, { useState, useEffect } from 'react'
import { Upload } from 'lucide-react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';


const Page = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    useEffect(() => {
        const savedBasicInformation = localStorage.getItem('BasicInformation');
        if (savedBasicInformation) {
            const data = JSON.parse(savedBasicInformation);
            setTitle(data.title ?? '');
            setCategory(data.category || '');
            setDescription(data.description || '');

        }
    }, [])

    const handleNext = () => {
        if (!title || !category || !description) {
            alert('Please fill in all required fields.');
            return;
        }

        const BasicInformation = {
            title,
            category,
            description,
        }

        localStorage.setItem(
            'BasicInformation',
            JSON.stringify(BasicInformation)
        );

        router.push('/create-event/step-2');

    }
    return (
        <div>
            <section className='flex flex-col'>

                {/* main form */}
                <div className='border border-brown-normal rounded-xl p-4 flex flex-col gap-4 bg-brown-light'>
                    <h2 className='text-lg md:text-xl lg:text-xl font-bold'>
                        Basic  Information
                    </h2>

                    {/* email */}
                    <div>
                        <h2 className="font-bold">Event Title *</h2>
                        <input
                            type="text"
                            placeholder="e.g., Summer Music Festival 2025"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            required
                        />
                    </div>


                    {/* category */}
                    <div>
                        <h2 className="font-bold">Category *</h2>
                        <select name="category" id="category"
                            className="w-full border border-brown-normal rounded-lg p-3 mt-1"
                            required

                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" disabled>Select an option</option>
                            <option value="music">Music</option>
                            <option value="art_theater">Art & Theater</option>
                            <option value="food_drinks">Food & Drinks</option>
                            <option value="sports_fitness">Sports & Fitness</option>
                            <option value="nightlife">Nightlife</option>
                            <option value="festival">Festival</option>
                            <option value="creative">Creative</option>
                            <option value="business">Business</option>
                            <option value="book_literature">Book & Literature</option>
                            <option value="comedy">Comedy</option>
                            <option value="social">Social</option>
                            <option value="community">Community</option>
                            <option value="learning_education">Learning and Education</option>
                            <option value="wellness_health">Wellness and Health</option>
                            <option value="gaming_esports">Gaming and Esports</option>
                            <option value="family_kids">Family and Kids</option>
                        </select>
                    </div>



                    {/* description */}
                    <div>
                        <h3 className='font-bold'>Description *</h3>
                        <textarea
                            placeholder='Tell attendess what makes your event special...'
                            className='w-full border border-brown-normal rounded-md p-2 mt-1 h-32 resize-none'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                    </div>


                    {/* event images  */}
                    <div>
                        <label className="block text-brown-dark mb-2 font-bold text-sm md:text-md">
                            Event Images
                        </label>

                        {/* Upload Box */}
                        <label
                            htmlFor="eventImages"
                            className="
                                border-2 border-dashed border-brown-normal
                                rounded-lg p-6 text-center
                                hover:border-brown-dark transition-colors
                                cursor-pointer block
                                "
                        >
                            <Upload className="w-8 h-8 text-brown-dark mx-auto mb-2" />
                            <p className="text-brown-dark mb-1 text-sm md:text-md">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-brown-dark text-sm md:text-md">
                                PDF, JPG, JPEG, or PNG (Max 10MB)
                            </p>
                        </label>

                        {/* Hidden input */}
                        <input
                            id="eventImages"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                        />
                    </div>


                    {/* steps */}
                    <div className='h-0.5 bg-brown-normal'></div>
                    <div className='flex justify-center gap-4'>
                        <p>Step 1 of 4</p>
                    </div>

                    {/* next button */}
                    <div className='flex justify-end'>

                        <Button text="Next Step" variant='cta' size='sm' onClick={handleNext}></Button>

                    </div>
                </div>
            </section >
        </div >
    )
}

export default Page