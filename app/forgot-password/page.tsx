'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import Button from '@/components/Button';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const submit = async (event: FormEvent) => { event.preventDefault(); setError(''); setMessage(''); const response = await fetch('/api/auth/forgot-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }); const result = await response.json(); if (!response.ok || !result.success) setError(result.error?.message ?? 'Unable to process request.'); else setMessage(result.data.message); };
    return <main className='flex min-h-[70vh] items-center justify-center px-4 py-12'><form onSubmit={submit} className='surface-card w-full max-w-md space-y-5 p-6'><h1 className='font-dynapuff text-2xl font-semibold'>Forgot password?</h1><p className='text-sm text-text-light'>Enter your email and we will send a reset link if an account matches.</p><input required type='email' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='you@example.com' className='form-control' />{message && <p className='text-sm text-green-700'>{message}</p>}{error && <p className='text-sm text-red-600'>{error}</p>}<Button text='Send reset link' type='submit' variant='cta' className='w-full' /><Link href='/login' className='block text-center text-sm text-brown-dark hover:underline'>Back to login</Link></form></main>;
}
