'use client';
import { Calendar, Download, MapPin, QrCode, Share2, X, Check, Copy } from "lucide-react";
import Button from "./Button";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import SharePopup from "./SharePopup";

type TicketPopupProps = {
    isOpen: boolean;
    onClose: () => void;
    ticket?: { _id?: string; ticketNumber: string; ticketType: string; qrCode: string; paymentStatus: string; ticketStatus: string; checkedIn?: boolean; purchaseDate?: string; event?: { _id?: string; title?: string; venue?: string; startDate?: string; endDate?: string; images?: string[]; organizer?: { name?: string } } };
    onCancelled?: () => void;
}

export default function TicketPopup(
    {
        isOpen,
        onClose, ticket, onCancelled
    }: TicketPopupProps
) {
    const [sharePopupOpen, setSharePopupOpen] = useState(false);
    const [showQrModal, setShowQrModal] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    
    useEffect(() => {
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        const previousPosition = document.body.style.position;
        const previousTop = document.body.style.top;
        const previousWidth = document.body.style.width;
        const scrollY = window.scrollY;
        const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', closeOnEscape);
        return () => { document.body.style.overflow = previousOverflow; document.body.style.position = previousPosition; document.body.style.top = previousTop; document.body.style.width = previousWidth; document.removeEventListener('keydown', closeOnEscape); window.scrollTo(0, scrollY); };
    }, [isOpen, onClose]);

    const handleShare = async () => {
        try {
            const shareUrl = `${window.location.origin}/tickets/${ticket?._id || ticket?.ticketNumber}`;
            const shareData = {
                title: `Ticket: ${ticket?.event?.title || 'Event'}`,
                text: `Check out my ticket for ${ticket?.event?.title}`,
                url: shareUrl
            };

            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(shareUrl);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            }
        } catch (err) {
            // User cancelled share or error occurred
            if ((err as Error).name !== 'AbortError') {
                console.error('Share failed:', err);
            }
        }
    };

    if (!isOpen || typeof document === 'undefined') return null;

    if (sharePopupOpen) {
        return createPortal(
            <SharePopup
                isOpen={sharePopupOpen}
                onClose={() => setSharePopupOpen(false)}
            />, document.body
        )
    }

    if (showQrModal) {
        return createPortal(
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowQrModal(false); }}>
                <div className="bg-white p-6 rounded-lg max-w-md w-full" onMouseDown={(event) => event.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Your Ticket QR Code</h3>
                        <button onClick={() => setShowQrModal(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="flex justify-center mb-4">
                        {ticket?.qrCode ? (
                            <img src={ticket.qrCode} alt="Ticket QR code" className="w-64 h-64" />
                        ) : (
                            <div className="w-64 h-64 bg-gray-100 flex items-center justify-center rounded-lg">
                                <QrCode size={80} className="text-gray-300" />
                            </div>
                        )}
                    </div>
                    
                    <p className="text-sm text-gray-600 text-center mb-4">
                        Scan this QR code at the event entrance to check in. <br/>
                        Ticket: {ticket?.ticketNumber}
                    </p>
                    
                    {ticket?.qrCode && (
                        <Button 
                            text='Download QR'
                            iconLeft={<Download size={18} />}
                            size="vsm" 
                            onClick={() => { 
                                if (ticket?.qrCode) { 
                                    const link = document.createElement('a'); 
                                    link.href = ticket.qrCode; 
                                    link.download = `${ticket.ticketNumber}-qr.png`; 
                                    link.click(); 
                                } 
                            }} 
                        />
                    )}
                </div>
            </div>,
            document.body
        )
    }

    return createPortal((
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <div className="bg-white p-4 m-2 rounded-lg max-w-lg w-full" onMouseDown={(event) => event.stopPropagation()}>
                <div>
                    <div className="grid grid-cols-[3fr_1fr] gap-2">
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg">{ticket?.event?.title ?? 'Ticket'}</h3>

                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <p className="text-sm">{ticket?.event?.startDate ? new Date(ticket.event.startDate).toLocaleString() : ''}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <p className="text-sm">{ticket?.event?.venue ?? ''}</p>
                            </div>
                        </div>

                        <div className="border bg-gray-50 rounded-xl p-2 h-[120px] flex justify-center items-center">
                            {ticket?.qrCode ? <img src={ticket.qrCode} alt="Ticket QR code" className="h-[100px] w-[100px]" /> : <QrCode size={100} className="text-gray-500" />}
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 mt-4">
                        <div>
                            <p className="text-sm text-gray-400">Ticket Type</p>
                            <button className="mt-1 bg-brown-light-active rounded-lg px-3 py-1 text-xs">{ticket?.ticketType ?? ''} · {ticket?.paymentStatus ?? ''}</button>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Ticket Number</p>
                            <p className="text-xs font-bold mt-1">{ticket?.ticketNumber ?? ''}</p>
                        </div>
                    </div>

                    {/* divider */}
                    <div className="border-t border-gray-300 my-4"></div>

                    <div className="flex justify-between gap-2 mt-4 flex-wrap">
                        <div className="flex gap-2">
                            <Button text='Download'
                                iconLeft={<Download size={18} />}
                                size="vsm" onClick={() => { if (ticket?.qrCode) { const link = document.createElement('a'); link.href = ticket.qrCode; link.download = `${ticket.ticketNumber}.png`; link.click(); } }} />

                            <Button text={copySuccess ? 'Copied!' : 'Share'}
                                onClick={handleShare}
                                iconLeft={copySuccess ? <Check size={18} /> : <Share2 size={18} />}
                                size="vsm" />
                        </div>

                        <Button text='View QR Code'
                            onClick={() => setShowQrModal(true)}
                            iconLeft={<QrCode size={18} />}
                            size="vsm" />
                    </div>

                    {ticket?._id && ticket.ticketStatus === 'active' && !ticket.checkedIn && <div className="mt-3 flex justify-center"><Button text='Cancel Ticket' status='danger' size='vsm' onClick={async () => { const response = await fetch(`/api/tickets/${ticket._id}`, { method: 'DELETE' }); if (response.ok) { onCancelled?.(); onClose(); } }} /></div>}

                    <div className="border-t border-gray-300 my-4"></div>
                    <div className="mt-2 flex justify-center">
                        <Button text='Close'
                            onClick={onClose}
                            status="danger"
                            iconLeft={<X size={18} />}
                            size="vsm" />
                    </div>
                </div>
            </div>
        </div>
    ), document.body);
}
