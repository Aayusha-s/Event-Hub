import { Calendar, Facebook, Mail, MapPin, MessageCircle, Twitter } from 'lucide-react';
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
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className="bg-white rounded-lg p-4 m-2 w-full max-w-md">
                <h1 className='text-xl font-bold mb-4'>Share Event</h1>

                {/* event details */}
                <div className="bg-gray-100 rounded-xl p-4">
                    <p className='font-bold' >Summer Music Festival 2025</p>
                    <p>Share this event with your friends and family</p>
                </div>

                {/* social media buttons */}
                <div>
                    <p className='font-semibold mt-2'>Share via social media:</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <Button
                            text='Facebook'
                            className='text-blue-700'
                            onClick={() => {
                                alert('Shared on Facebook!');
                            }}
                            iconLeft={<Facebook size={18} />}
                        />
                        <Button
                            text='Twitter'
                            className='text-blue-400'
                            onClick={() => {
                                alert('Shared on Twitter!');
                            }}
                            iconLeft={<Twitter size={18} />}
                        />
                        <Button
                            text='Whatsapp'
                            className='text-green-500'
                            onClick={() => {
                                alert('Shared on Whatsapp!');
                            }}
                            iconLeft={<MessageCircle size={18} />}
                        />
                        <Button
                            text='Email'
                            className='text-red-500'
                            onClick={() => {
                                alert('Shared on Email!');
                            }}
                            iconLeft={<Mail size={18} />}
                        />
                    </div>
                </div>


                {/* copy event link */}
                <div>
                    <p className='font-semibold mt-4'>Or copy the event link:</p>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            readOnly
                            value="https://eventhub.com/events/summer-music-festival-2025"
                            className="grow border border-gray-300 rounded-l-lg px-3 py-2"
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



                <div className="flex justify-end mt-4 gap-2">
                    <Button
                        text='Close'
                        onClick={onClose}
                    />

                    <Button
                        text='Share'
                        onClick={() => {
                            // navigator.clipboard.writeText('https://eventhub.com/events/summer-music-festival-2025');
                            alert('Event Shared!');
                            onClose();
                        }}
                        className="bg-brown-normal text-white"
                    />

                </div>


            </div>


        </div>
    )
}

export default SharePopup
