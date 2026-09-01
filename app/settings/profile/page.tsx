'use client'
import React, { useEffect, useState } from 'react'
import {
    Camera
} from 'lucide-react';
import Button from '../../../components/Button';
import SettingsTab from '../../../components/SettingsTab'
import SettingsHeading from '@/components/SettingsHeading';
import { useSession } from 'next-auth/react';

type ProfileData = { name?: string; email?: string; phone?: string; bio?: string; location?: string; website?: string; profileImage?: string };

const Page = () => {
    const { data: session, update: updateSession } = useSession();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', bio: '', location: '', website: '', profileImage: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

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

    const uploadPhoto = async (file: File) => {
        try {
            setUploading(true);
            setMessage('');
            setError('');
            const body = new FormData();
            body.append('file', file);
            const response = await fetch('/api/users/me/profile-image', { method: 'POST', body });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error(result.error?.message || 'Unable to upload profile image.');
            setForm((current) => ({ ...current, profileImage: result.data.profileImage }));
            setProfile((current) => current ? { ...current, profileImage: result.data.profileImage } : current);
            await updateSession({ image: result.data.profileImage });
            setMessage('Profile photo updated successfully.');
        } catch (uploadError) {
            setError(uploadError instanceof Error ? uploadError.message : 'Unable to upload profile image.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <section className='app-page font-cause text-text-dark'>

            <SettingsHeading/>

            <div className='flex flex-col gap-6 lg:flex-row'>
                {/* tab */}
                <SettingsTab />


                {/* main tab */}
                <div className='surface-card w-full p-5 sm:p-7'>
                    {/* titles */}
                    <div className='space-y-2'>
                        <h2 className='text-xl font-semibold'>Profile information</h2>
                        <p className='text-sm text-text-light'>Update the account information for your {session?.user?.role === 'ticket_checker' ? 'ticket checker' : session?.user?.role ?? 'Vivnt'} profile.</p>
                    </div>

                    {/* change photo  */}
                    <div className='flex flex-row items-center gap-6 mt-6'>
                        <div className='relative h-24 w-24 overflow-hidden rounded-full border border-brown-normal bg-brown-light/60'>
                            {profile?.profileImage ? (
                                <img src={profile.profileImage} alt={profile.name ?? 'Profile'} className='h-full w-full object-cover object-center' />
                            ) : (
                                <div className='flex h-full w-full items-center justify-center text-xl font-bold'>
                                    {(profile?.name ?? 'JD').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <Button text={uploading ? 'Uploading...' : 'Change Photo'} variant="cta" iconLeft={<Camera />} size='sm' onClick={() => document.getElementById('profilePhoto')?.click()} disabled={uploading}></Button>
                            <input id='profilePhoto' type='file' accept='image/jpeg,image/png,image/gif' className='hidden' onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadPhoto(file); event.target.value = ''; }} />
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
                            <input type="text" className='form-control' placeholder='John Doe' value={form.firstName} onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))} />
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Last Name</label>
                            <input type="text" className='form-control' placeholder='Doe' value={form.lastName} onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))} />
                            </div>
                        </div>

                        {/* email and phone number */}
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Email Address</label>
                                <input type="email" placeholder='johndoe@gmail.com' className='form-control' value={form.email} readOnly></input>
                            </div>

                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Phone Number</label>
                                <input type="tel" className='form-control' placeholder='9876543210' value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
                            </div>
                        </div>

                        {/* bio */}
                        <div className='flex flex-col'>
                            <label className='font-bold mb-1'>Bio</label>
                            <textarea className='form-control min-h-28 py-3' rows={4} placeholder='Tell us about yourself...' value={form.bio} onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))}></textarea>
                        </div>


                        {/* location and website */}
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Location</label>
                                <input type="text" placeholder='New York, NY' className='form-control' value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} />
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Website</label>
                                <input type="url" className='form-control' placeholder='https://' value={form.website} onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))} />
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
