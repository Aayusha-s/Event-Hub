import React from 'react'
import Button from './Button';
import ModalOverlay from './ModalOverlay';

type ReviewPopupProps = {
    isOpen: boolean;
    onclose: () => void;
    onSubmit?: (rating: number, text: string) => Promise<void> | void;
}

const ReviewPopup = ({
    isOpen,
    onclose, onSubmit
}: ReviewPopupProps) => {

    const [rating, setRating] = React.useState(5); const [text, setText] = React.useState(''); const [error, setError] = React.useState('');
    if (!isOpen) return null;
    return (
        <ModalOverlay isOpen={isOpen} onClose={onclose} ariaLabel='Write a review'>
            <div className='w-full max-w-md rounded-xl bg-white p-6 shadow-lg' onMouseDown={(event) => event.stopPropagation()}>
                <h2 className='text-2xl font-semibold tracking-tight text-text-dark mb-4'>Write a Review</h2>
                
                <div>
                    <label className='block mb-2 text-sm font-medium text-text-dark'>Rating:</label>
                    <select value={rating} onChange={event=>setRating(Number(event.target.value))} className='w-full rounded-xl border border-border bg-surface px-3 py-2 mb-4 text-text-dark focus-ring'>
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
                    placeholder='Share your experience...' value={text} onChange={event=>setText(event.target.value)}
                ></textarea>

                <div className='flex justify-end gap-2'>
                    <Button
                    text='Cancel'
                    variant='secondary'
                    size='md'
                    onClick={onclose}/>{error&&<p className='text-red-600'>{error}</p>}
                    
                    <Button
                    text='Submit'
                    variant='cta'
                    size='md'
                    onClick={async()=>{try{await onSubmit?.(rating,text);setText('')}catch(e){setError(e instanceof Error?e.message:'Unable to submit review.')}}}/>
                </div>

            </div>
            
        </ModalOverlay>
    )
}

export default ReviewPopup
