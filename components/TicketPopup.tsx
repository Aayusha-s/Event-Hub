'use client';
import { Calendar, Download, MapPin, QrCode, Share2, X } from "lucide-react";
import Button from "./Button";
import { useState } from "react";
import SharePopup from "./SharePopup";

type TicketPopupProps = {
    isOpen: boolean;
    onClose: () => void;
    ticket?: { ticketNumber: string; ticketType: string; qrCode: string; paymentStatus: string; ticketStatus: string; event?: { title?: string; venue?: string; startDate?: string; endDate?: string } };
}

export default function TicketPopup(
    {
        isOpen,
        onClose, ticket
    }: TicketPopupProps
) {
    const [sharePopupOpen, setSharePopupOpen] = useState(false);

    if (!isOpen) return null;

    if (sharePopupOpen) {
        return (
            <SharePopup
                isOpen={sharePopupOpen}
                onClose={() => setSharePopupOpen(false)}
            />
        )
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 m-2 rounded-lg">
                <div >
                    <div className="grid grid-cols-[3fr_1fr] gap-2">
                        <div className="space-y-3">
                            <h3 className="font-bold">{ticket?.event?.title ?? 'Ticket'}</h3>

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


                    <div className="flex flex-row gap-4 mt-2">
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

                    <div className="flex justify-between gap-2 mt-4">
                        <div className="flex gap-2">
                            <Button text='Download'
                                iconLeft={<Download size={18} />}
                                size="vsm" onClick={() => { if (ticket?.qrCode) { const link = document.createElement('a'); link.href = ticket.qrCode; link.download = `${ticket.ticketNumber}.png`; link.click(); } }} />

                            <Button text='Share'
                                onClick={() => setSharePopupOpen(true)}
                                iconLeft={<Share2 size={18} />}
                                size="vsm" />
                            
                        </div>

                        <Button text='View QR Code'
                            iconLeft={<QrCode size={18} />}
                            size="vsm" />
                    </div>

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
    );
}
