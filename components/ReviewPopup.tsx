import React from 'react'
import Button from './Button';

type ReviewPopupProps = {
    isOpen: boolean;
    onclose: () => void;
}

const ReviewPopup = ({
    isOpen,
    onclose
}: ReviewPopupProps) => {

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-text-dark/20 flex items-center justify-center z-50 p-4'>
            <div className='surface-card w-full max-w-md p-6 shadow-lg'>
                <h2 className='text-2xl font-semibold tracking-tight text-text-dark mb-4'>Write a Review</h2>
                
                <div>
                    <label className='block mb-2 text-sm font-medium text-text-dark'>Rating:</label>
                    <select className='w-full rounded-xl border border-border bg-surface px-3 py-2 mb-4 text-text-dark focus-ring'>
                        <option value='5'>5 - Excellent</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='3'>3 - Good</option>
                        <option value='2'>2 - Fair</option>
                        <option value='1'>1 - Poor</option>
                    </select>
                </div>
                
                <textarea
                    className='w-full rounded-xl border border-border bg-surface px-3 py-3 mb-4 text-text-dark focus-ring'
                    rows={5}
                    placeholder='Share your experience...'
                ></textarea>

                <div className='flex justify-end gap-2'>
                    <Button
                    text='Cancel'
                    variant='secondary'
                    size='md'
                    onClick={onclose}/>
                    
                    <Button
                    text='Submit'
                    variant='cta'
                    size='md'
                    onClick={onclose}/>
                </div>

            </div>
            
        </div>
    )
}

export default ReviewPopup
