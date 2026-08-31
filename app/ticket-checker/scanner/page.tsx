'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Scanner = {
    start: (camera: { facingMode: string }, config: { fps: number; qrbox: number }, success: (text: string) => void, failure: () => void) => Promise<void>;
    stop: () => Promise<void>;
    clear: () => Promise<void>;
};

type Ticket = {
    state: 'valid' | 'used' | 'cancelled' | 'invalid';
    ticketNumber?: string;
    attendee?: { name: string };
    event?: { title: string };
    ticketType?: string;
    checkedInAt?: string;
};

const SCANNER_ID = 'ticket-checker-camera';

export default function ScannerPage() {
    const scanner = useRef<Scanner | null>(null);
    const running = useRef(false);
    const busy = useRef(false);
    const fileInput = useRef<HTMLInputElement>(null);

    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<'camera' | 'upload'>('camera');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isProcessingImage, setIsProcessingImage] = useState(false);

    const stop = useCallback(async () => {
        if (!scanner.current || !running.current) return;
        try {
            await scanner.current.stop();
            await scanner.current.clear();
        } catch {}
        running.current = false;
    }, []);

    useEffect(() => () => {
        void stop();
    }, [stop]);

    const verifyTicket = async (code: string) => {
        if (busy.current) return;
        busy.current = true;
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`/api/checkin?identifier=${encodeURIComponent(code)}`);
            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.error?.message ?? 'Invalid ticket.');
            }

            setTicket(json.data);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : 'Unable to verify ticket.');
            setTicket(null);
        } finally {
            busy.current = false;
            setLoading(false);
        }
    };

    const startCameraScanner = async () => {
        setError('');
        setTicket(null);

        try {
            if (!navigator.mediaDevices?.getUserMedia) {
                throw new Error('Camera unavailable');
            }

            const { Html5Qrcode } = await import('html5-qrcode');
            const cameras = await Html5Qrcode.getCameras();

            if (!cameras.length) {
                throw new Error('No camera detected');
            }

            const instance = new Html5Qrcode(SCANNER_ID) as unknown as Scanner;
            scanner.current = instance;

            await instance.start(
                { facingMode: 'environment' },
                { fps: 10, qrbox: 250 },
                (code) => {
                    if (!running.current || busy.current) return;
                    void stop().then(() => verifyTicket(code));
                },
                () => undefined
            );

            running.current = true;
        } catch (cause) {
            const message = cause instanceof Error ? cause.message.toLowerCase() : '';

            if (message.includes('permission') || message.includes('notallowed')) {
                setError('Camera permission is required to scan tickets.');
            } else if (message.includes('camera')) {
                setError('No camera is available. Use manual entry or upload an image instead.');
            } else {
                setError('Unable to start the scanner.');
            }
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setError('Please upload a JPG, PNG, or WebP image containing a QR code.');
            return;
        }

        setIsProcessingImage(true);
        setError('');

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const imageData = e.target?.result as string;
                setUploadedImage(imageData);

                try {
                    const { Html5Qrcode } = await import('html5-qrcode');
                    
                    const qr = new Html5Qrcode('file-scanner-temp');
                    const result = await (qr as any).scanFile(file, true);

                    if (result) {
                        await verifyTicket(result);
                    } else {
                        setError('No QR code found in the uploaded image. Please try another image.');
                    }
                } catch (scanError) {
                    const message = scanError instanceof Error ? scanError.message.toLowerCase() : '';
                    console.error('QR scanning error:', scanError);
                    
                    if (message.includes('no qr code found') || message.includes('qr code could not be detected')) {
                        setError('No QR code found in the image. Please upload an image with a valid QR code.');
                    } else {
                        setError('Unable to scan the QR code from the image. Please try another image.');
                    }
                } finally {
                    setIsProcessingImage(false);
                    if (fileInput.current) {
                        fileInput.current.value = '';
                    }
                }
            };

            reader.readAsDataURL(file);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : 'Unable to process the image.');
            setIsProcessingImage(false);
        }
    };

    const confirmCheckIn = async () => {
        if (!ticket?.ticketNumber) return;
        setLoading(true);

        try {
            const res = await fetch('/api/checkin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: ticket.ticketNumber }),
            });

            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.error?.message);
            }

            setTicket({ ...json.data, state: 'used' });
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : 'Check-in failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-brown-light to-white py-8 px-4'>
            <div className='max-w-lg mx-auto'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold font-dynapuff text-brown-normal mb-2'>Verify Tickets</h1>
                    <p className='text-text-light'>Scan QR codes or upload images to verify attendee tickets</p>
                </div>

                {/* Mode Selector */}
                <div className='flex gap-2 mb-6 bg-white rounded-xl p-2 border-2 border-brown-normal'>
                    <button
                        onClick={() => {
                            setMode('camera');
                            setError('');
                            setTicket(null);
                            setUploadedImage(null);
                            void stop().then(() => startCameraScanner());
                        }}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                            mode === 'camera'
                                ? 'bg-brown-normal text-white'
                                : 'bg-gray-100 text-text-dark hover:bg-gray-200'
                        }`}
                    >
                        <i className='fa-solid fa-camera mr-2'></i>
                        Scan with Camera
                    </button>
                    <button
                        onClick={() => {
                            setMode('upload');
                            void stop();
                            setError('');
                            setTicket(null);
                        }}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                            mode === 'upload'
                                ? 'bg-brown-normal text-white'
                                : 'bg-gray-100 text-text-dark hover:bg-gray-200'
                        }`}
                    >
                        <i className='fa-solid fa-image mr-2'></i>
                        Upload Image
                    </button>
                </div>

                {/* Camera Mode */}
                {mode === 'camera' && (
                    <div className='space-y-4'>
                        <div id={SCANNER_ID} className='w-full rounded-xl overflow-hidden border-2 border-brown-normal bg-black min-h-96' />

                        {error && (
                            <div className='bg-red-50 border-2 border-red-300 rounded-xl p-4 text-red-800'>
                                <i className='fa-solid fa-exclamation-circle mr-2'></i>
                                {error}
                            </div>
                        )}

                        {loading && (
                            <div className='bg-blue-50 border-2 border-blue-300 rounded-xl p-4 text-blue-800 text-center'>
                                <i className='fa-solid fa-spinner fa-spin mr-2'></i>
                                Verifying ticket...
                            </div>
                        )}

                        {!running.current && !loading && (
                            <button
                                onClick={startCameraScanner}
                                className='w-full py-3 px-4 bg-brown-normal text-white rounded-xl hover:bg-brown-dark font-semibold transition-colors'
                            >
                                <i className='fa-solid fa-play mr-2'></i>
                                Start Camera
                            </button>
                        )}
                    </div>
                )}

                {/* Upload Mode */}
                {mode === 'upload' && (
                    <div className='space-y-4'>
                        <div className='bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-blue-800 text-sm'>
                            <i className='fa-solid fa-info-circle mr-2'></i>
                            Upload a photo or screenshot of a QR code. Supports JPG, PNG, and WebP formats.
                        </div>

                        {/* Upload Area */}
                        <div
                            onClick={() => fileInput.current?.click()}
                            className='border-2 border-dashed border-brown-normal rounded-xl p-8 text-center cursor-pointer hover:bg-brown-light/20 transition-colors'
                        >
                            <input
                                ref={fileInput}
                                type='file'
                                accept='image/jpeg,image/png,image/webp'
                                onChange={handleImageUpload}
                                disabled={isProcessingImage}
                                className='hidden'
                            />

                            <div className='text-4xl text-brown-normal mb-2'>
                                <i className='fa-solid fa-cloud-arrow-up'></i>
                            </div>
                            <p className='text-text-dark font-semibold mb-1'>Click to upload or drag and drop</p>
                            <p className='text-sm text-text-light'>JPG, PNG or WebP (max 10MB)</p>
                        </div>

                        {/* Image Preview */}
                        {uploadedImage && (
                            <div className='rounded-xl overflow-hidden border-2 border-brown-normal'>
                                <img src={uploadedImage} alt='Uploaded QR' className='w-full h-auto' />
                            </div>
                        )}

                        {isProcessingImage && (
                            <div className='bg-blue-50 border-2 border-blue-300 rounded-xl p-4 text-blue-800 text-center'>
                                <i className='fa-solid fa-spinner fa-spin mr-2'></i>
                                Scanning QR code from image...
                            </div>
                        )}

                        {error && (
                            <div className='bg-red-50 border-2 border-red-300 rounded-xl p-4 text-red-800'>
                                <i className='fa-solid fa-exclamation-circle mr-2'></i>
                                {error}
                            </div>
                        )}
                    </div>
                )}

                {/* Ticket Result */}
                {ticket && (
                    <div className={`rounded-xl p-6 border-2 mt-6 ${
                        ticket.state === 'valid'
                            ? 'bg-green-50 border-green-300 text-green-800'
                            : ticket.state === 'used'
                            ? 'bg-yellow-50 border-yellow-300 text-yellow-800'
                            : 'bg-red-50 border-red-300 text-red-800'
                    }`}>
                        <div className='text-3xl mb-3'>
                            {ticket.state === 'valid' && <i className='fa-solid fa-check-circle text-green-600'></i>}
                            {ticket.state === 'used' && <i className='fa-solid fa-exclamation-triangle text-yellow-600'></i>}
                            {(ticket.state === 'cancelled' || ticket.state === 'invalid') && <i className='fa-solid fa-times-circle text-red-600'></i>}
                        </div>
                        <p className='font-bold text-lg mb-3'>
                            {ticket.state === 'valid' && 'Ticket Valid'}
                            {ticket.state === 'used' && 'Ticket Already Used'}
                            {ticket.state === 'cancelled' && 'Ticket Cancelled'}
                            {ticket.state === 'invalid' && 'Invalid Ticket'}
                        </p>

                        <div className='space-y-2 mb-4 text-sm'>
                            {ticket.attendee && <p><strong>Attendee:</strong> {ticket.attendee.name}</p>}
                            {ticket.event && <p><strong>Event:</strong> {ticket.event.title}</p>}
                            {ticket.ticketType && <p><strong>Ticket Type:</strong> {ticket.ticketType}</p>}
                            {ticket.ticketNumber && <p><strong>Ticket ID:</strong> <span className='font-mono'>{ticket.ticketNumber}</span></p>}
                            {ticket.checkedInAt && (
                                <p><strong>Checked In:</strong> {new Date(ticket.checkedInAt).toLocaleString()}</p>
                            )}
                        </div>

                        <div className='flex gap-2'>
                            {ticket.state === 'valid' && (
                                <button
                                    onClick={() => void confirmCheckIn()}
                                    disabled={loading}
                                    className='flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors'
                                >
                                    <i className='fa-solid fa-check mr-2'></i>
                                    Confirm Check-In
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setTicket(null);
                                    setError('');
                                    setUploadedImage(null);
                                    void startCameraScanner();
                                }}
                                className='flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors'
                            >
                                <i className='fa-solid fa-redo mr-2'></i>
                                Scan Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
