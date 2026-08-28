'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Button from '@/components/Button';

export default function ResetPasswordPage() {
    const params = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const submit = async (event: FormEvent) => { event.preventDefault(); setError(''); setMessage(''); const response = await fetch('/api/auth/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: params.get('token'), password, confirmPassword }) }); const result = await response.json(); if (!response.ok || !result.success) setError(result.error?.message ?? 'Unable to reset password.'); else setMessage(result.data.message); };
    return <main className='flex min-h-[70vh] items-center justify-center px-4 py-12'><form onSubmit={submit} className='surface-card w-full max-w-md space-y-5 p-6'><h1 className='font-dynapuff text-2xl font-semibold'>Set a new password</h1><div className='relative'><input required minLength={8} type={show ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder='New password' className='form-control pr-10' /><button type='button' onClick={() => setShow((value) => !value)} aria-label={show ? 'Hide password' : 'Show password'} className='absolute right-3 top-3'>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div><input required minLength={8} type={show ? 'text' : 'password'} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder='Confirm password' className='form-control' />{message ? <p className='text-sm text-green-700'>{message}</p> : <>{error && <p className='text-sm text-red-600'>{error}</p>}<Button text='Reset password' type='submit' variant='cta' className='w-full' /></>}<Link href='/login' className='block text-center text-sm text-brown-dark hover:underline'>Back to login</Link></form></main>;
}
