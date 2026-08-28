// components/ManageRoles.tsx
import { Calendar, Check, CircleCheckBig, ShoppingBag } from "lucide-react";
import React from "react";
import Button from "./Button";
import Link from "next/link";

type ManageRolesProps = {
    isOpen: boolean;
    onClose: () => void;

};
export default function ManageRoles({ isOpen, onClose }: ManageRolesProps) {
    React.useEffect(() => { if (!isOpen) return; const previousOverflow = document.body.style.overflow; const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); }; document.body.style.overflow = 'hidden'; document.addEventListener('keydown', closeOnEscape); return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', closeOnEscape); }; }, [isOpen, onClose]);
    if (!isOpen) return null;

    
    return (
        <div className="fixed inset-0 bg-text-dark/20 flex items-center justify-center z-50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <div className="surface-card w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 shadow-lg" onMouseDown={(event) => event.stopPropagation()}>

                <div>
                    <h3 className="text-lg font-semibold text-text-dark md:text-xl">Manage Your Roles</h3>
                    <div className="my-3 border-b border-divider"></div>
                </div>

                <div className="mb-6 space-y-2">
                    <p className="text-base font-semibold text-text-dark md:text-lg">
                        Current Roles
                    </p>
                    <p className="text-sm leading-relaxed text-text-light md:text-base">
                        Manage your account roles and unlock new features on EventHub
                    </p>
                </div>

                <div className="space-y-4">
                    {/* attendee active */}
                    <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-hover p-4">
                        <div className="flex flex-row items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-light text-success">
                                <Check />
                            </div>
                            <div>
                                <p className="font-medium text-text-dark">Attendee</p>
                                <p className="text-sm text-text-light">Browse and book event tickets</p>
                            </div>
                        </div>
                        <div><button className="rounded-full bg-success px-3 h-8 text-sm text-white" disabled>Active Now</button></div>
                    </div>

                    {/* vendor apply now */}
                    <div className="surface-card p-4">

                        <div className="flex items-center justify-between ">
                            <div className="flex flex-row items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                                    <ShoppingBag />
                                </div>
                                <div>
                                    <p className="font-medium text-text-dark">Vendor</p>
                                    <p className="text-sm text-text-light">Apply to sell at events</p>
                                </div>
                            </div>

                            <Link href='vendor/vendorapplication-1'>
                                <Button
                                    text='Apply Now'
                                    variant="cta"
                                    size="vsm"
                                    onClick={() => {
                                        onClose();
                                    }} />
                            </Link>



                        </div>
                        <div className="my-4 border-b border-divider"></div>

                        <ol className="list-none space-y-2">
                            <li className="flex items-center gap-2">
                                <CircleCheckBig className="w-5 h-5 text-primary" />
                                <span>Apply for booth spaces at event</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheckBig className="w-5 h-5 text-primary" />
                                <span>Manage inventory and sales</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheckBig className="w-5 h-5 text-primary" />
                                <span>Track sales and analytics</span>
                            </li>
                        </ol>
                    </div>


                    {/* organizer apply now */}
                    <div className="surface-card p-4">

                        <div className="flex items-center justify-between ">
                            <div className="flex flex-row items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                                    <Calendar />
                                </div>
                                <div>
                                    <p className="font-medium text-text-dark">Organizer</p>
                                    <p className="text-sm text-text-light">Apply to host your own events</p>
                                </div>
                            </div>

                            <Link href='organizer/organizerapplication-1'>
                                <Button
                                    text='Apply Now'
                                    variant="cta"
                                    size="vsm"
                                    onClick={() => {
                                        onClose();

                                    }} />
                            </Link>



                        </div>
                        <div className="my-4 border-b border-divider"></div>

                        <ol className="list-none space-y-2">
                            <li className="flex items-center gap-2">
                                <CircleCheckBig className="w-5 h-5 text-primary" />
                                <span>Create and publish unlimited events</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheckBig className="w-5 h-5 text-primary" />
                                <span>Manage tickets sales and attendees</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheckBig className="w-5 h-5 text-primary" />
                                <span>Access to vendor and sponsor management</span>
                            </li>
                        </ol>
                    </div>






                </div>
                <div className="mt-6 flex justify-end">
                    <Button text='Close'
                        onClick={onClose}
                        variant="secondary"
                        size="md" />
                </div>
            </div>
        </div>
    );
}
