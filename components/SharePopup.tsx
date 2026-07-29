import { Facebook, Mail, MessageCircle, Twitter } from 'lucide-react';
import React from 'react'
import Button from './Button';

type SharePopupProps = {
    isOpen: boolean;
    onClose: () => void;
}
const SharePopup = (
    {
        isOpen,
        onClose
    }: SharePopupProps) => {
    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 bg-text-dark/20 flex items-center justify-center z-50 p-4'>
            <div className="surface-card w-full max-w-md p-6 shadow-lg">
                <h1 className='text-2xl font-semibold tracking-tight text-text-dark mb-4'>Share Event</h1>

                {/* event details */}
                <div className="rounded-2xl border border-border bg-surface-hover p-4">
                    <p className='font-semibold text-text-dark' >Summer Music Festival 2025</p>
                    <p className='text-sm text-text-light'>Share this event with your friends and family</p>
                </div>

                {/* social media buttons */}
                <div>
                    <p className='mt-3 font-semibold text-text-dark'>Share via social media:</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <Button
                            text='Facebook'
                            className='bg-primary-light text-primary'
                            onClick={() => {
                                alert('Shared on Facebook!');
                            }}
                            iconLeft={<Facebook size={18} />}
                        />
                        <Button
                            text='Twitter'
                            className='bg-primary-light text-primary'
                            onClick={() => {
                                alert('Shared on Twitter!');
                            }}
                            iconLeft={<Twitter size={18} />}
                        />
                        <Button
                            text='Whatsapp'
                            className='bg-primary-light text-primary'
                            onClick={() => {
                                alert('Shared on Whatsapp!');
                            }}
                            iconLeft={<MessageCircle size={18} />}
                        />
                        <Button
                            text='Email'
                            className='bg-primary-light text-primary'
                            onClick={() => {
                                alert('Shared on Email!');
                            }}
                            iconLeft={<Mail size={18} />}
                        />
                    </div>
                </div>


                {/* copy event link */}
                <div>
                    <p className='mt-4 font-semibold text-text-dark'>Or copy the event link:</p>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            readOnly
                            value="https://eventhub.com/events/summer-music-festival-2025"
                            className="grow rounded-l-xl border border-border px-3 py-2 text-text-dark focus:outline-none"
                        />
                        <Button
                            text='Copy Link'
                            onClick={() => {
                                navigator.clipboard.writeText('https://eventhub.com/events/summer-music-festival-2025');
                                alert('Link Copied to Clipboard!');
                            }}
                            className="rounded-l-none"
                        />
                    </div>
                </div>



                <div className="mt-6 flex justify-end gap-2">
                    <Button
                        text='Close'
                        onClick={onClose}
                        variant='secondary'
                    />

                    <Button
                        text='Share'
                        onClick={() => {
                            // navigator.clipboard.writeText('https://eventhub.com/events/summer-music-festival-2025');
                            alert('Event Shared!');
                            onClose();
                        }}
                        className=""
                    />

                </div>


            </div>


        </div>
    )
}

export default SharePopup
