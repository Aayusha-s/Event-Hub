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
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white p-4 m-2 rounded-lg w-full max-w-md'>
                <h2 className='font-dynapuff text-xl mb-4'>Write a Review</h2>
                
                <div>
                    <label className='block mb-2 font-semibold'>Rating:</label>
                    <select className='w-full border border-gray-300 rounded-lg p-2 mb-4'>
                        <option value='5'>5 - Excellent</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='3'>3 - Good</option>
                        <option value='2'>2 - Fair</option>
                        <option value='1'>1 - Poor</option>
                    </select>
                </div>
                
                <textarea
                    className='w-full border border-gray-300 rounded-lg p-2 mb-4'
                    rows={5}
                    placeholder='Share your experience...'
                ></textarea>

                <div className='flex justify-between gap-2'>
                    <Button
                    text='Cancel'
                    variant='cta'
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
