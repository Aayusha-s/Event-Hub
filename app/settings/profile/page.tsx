'use client'
import React, { useEffect, useState } from 'react'
import {
    Camera
} from 'lucide-react';
import Button from '../../../components/Button';
import SettingsTab from '../../../components/SettingsTab'
import SettingsHeading from '@/components/SettingsHeading';

type ProfileData = { name?: string; email?: string; phone?: string; bio?: string; location?: string; website?: string; profileImage?: string };

const Page = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', bio: '', location: '', website: '', profileImage: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        fetch('/api/users/me', { cache: 'no-store' }).then(async (response) => {
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error(result.error?.message || 'Unable to load profile.');
            if (!active) return;
            const data = result.data as ProfileData;
            setProfile(data);
            const [firstName = '', ...rest] = (data.name ?? '').split(' ');
            setForm({
                firstName,
                lastName: rest.join(' '),
                email: data.email ?? '',
                phone: data.phone ?? '',
                bio: data.bio ?? '',
                location: data.location ?? '',
                website: data.website ?? '',
                profileImage: data.profileImage ?? '',
            });
        }).catch((loadError) => { if (active) setError(loadError instanceof Error ? loadError.message : 'Unable to load profile.'); });
        return () => { active = false; };
    }, []);

    const submit = async () => {
        try {
            setMessage('');
            setError('');
            const response = await fetch('/api/users/me', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: [form.firstName, form.lastName].filter(Boolean).join(' ').trim(),
                    phone: form.phone,
                    bio: form.bio,
                    location: form.location,
                    website: form.website,
                    profileImage: form.profileImage,
                }),
            });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error(result.error?.message || 'Unable to save profile.');
            setMessage('Profile updated successfully.');
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Unable to save profile.');
        }
    };

    return (
        <section className='my-2 mx-2 px-4 font-cause text-text-dark
        md:my-3 md:mx-3 md:px-3
        lg:my-4 lg:mx-4 lg:px-4
        xl:my-6 xl:mx-6 xl:px-6
        2xl:my-8 2xl:mx-8 2xl:px-8'>

            <SettingsHeading/>

            <div className='flex flex-col gap-6 lg:flex-row lg:gap-12'>
                {/* tab */}
                <SettingsTab />


                {/* main tab */}
                <div className='border border-brown-normal rounded-xl p-4 w-full
                lg:p-6
                    xl:p-8
                    2xl:p-10 
'>
                    {/* titles */}
                    <div className='space-y-2'>
                        <h3 className='font-dynapuff text-xl'>Profile Information</h3>
                        <p className='text-lg font-bold'>Update your personal information and profile picture</p>
                    </div>

                    {/* change photo  */}
                    <div className='flex flex-row items-center gap-6 mt-6'>
                        <span className='border border-brown-normal rounded-full w-24 h-24 flex items-center justify-center font-bold text-xl'>
                            {(profile?.name ?? 'JD').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                        </span>

                        <div className='space-y-2'>
                            <Button text="Change Photo" variant="cta" iconLeft={<Camera />} size='sm' onClick={() => undefined}></Button>
                            <p>JPG, PNG or GIF. Max size 5MB</p>
                        </div>
                    </div>

                    {message && <p className='mt-4 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700'>{message}</p>}
                    {error && <p className='mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700'>{error}</p>}

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-4'></div>

                    {/* form */}
                    <div className='flex flex-col gap-4 mt-4 '>

                        {/* first and last name */}
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>First Name</label>
                                <input type="text" className='border border-brown-normal rounded-md p-2' placeholder='John Doe' value={form.firstName} onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))} />
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Last Name</label>
                                <input type="text" className='border border-brown-normal rounded-md p-2' placeholder='John Doe' value={form.lastName} onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))} />
                            </div>
                        </div>

                        {/* email and phone number */}
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Email Address</label>
                                <input type="email" placeholder='johndoe@gmail.com' className='border border-brown-normal rounded-md p-2' value={form.email} readOnly></input>
                            </div>

                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Phone Number</label>
                                <input type="tel" className='border border-brown-normal rounded-md p-2' placeholder='9876543210' value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
                            </div>
                        </div>

                        {/* bio */}
                        <div className='flex flex-col'>
                            <label className='font-bold mb-1'>Bio</label>
                            <textarea className='border border-brown-normal rounded-md p-2' rows={4} placeholder='Tell us about yourself...' value={form.bio} onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))}></textarea>
                        </div>


                        {/* location and website */}
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Location</label>
                                <input type="text" placeholder='New York, NY' className='border border-brown-normal rounded-md p-2 ' value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} />
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Website</label>
                                <input type="url" className='border border-brown-normal rounded-md p-2' placeholder='https://' value={form.website} onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))} />
                            </div>
                        </div>
                        
                    </div>

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-4'></div>

                    {/* button */}

                    <div className='mt-4 flex justify-end'>
                        <Button text="Save Changes" variant="cta" onClick={submit}></Button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Page
