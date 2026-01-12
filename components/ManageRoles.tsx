// components/ManageRoles.tsx
import { Calendar, Check, CircleCheck, CircleCheckBig, ShoppingBag, X } from "lucide-react";
import React from "react";
import Button from "./Button";
import Link from "next/link";

type ManageRolesProps = {
    isOpen: boolean;
    onClose: () => void;

};
export default function ManageRoles({ isOpen, onClose }: ManageRolesProps) {
    if (!isOpen) return null;

    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 m-2 rounded-lg w-full max-w-3xl  max-h-[90vh] overflow-y-auto">

                <div>
                    <h3 className="font-bold text-md md:text-lg lg:text-xl">Manage Your Roles</h3>
                    <div className="border-b my-2 border-brown-normal"></div>
                </div>

                <div className="space-y-2 mb-4">
                    <p className="font-medium text-md md:text-lg lg:text-xl">
                        Current Roles
                    </p>
                    <p className="text-sm md:text-md lg:text-lg ">
                        Manage your account roles and unlock new features on EventHub
                    </p>
                </div>

                <div className="space-y-4">
                    {/* attendee active */}
                    <div className="flex items-center justify-between border border-green-300 bg-green-50 rounded-lg p-4">
                        <div className="flex flex-row items-center gap-4">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-100 text-green-500">
                                <Check />
                            </div>
                            <div> <p className="font-medium">Attendee</p>
                                <p className="text-sm">Browse and book event tickets</p></div>
                        </div>
                        <div><button className="bg-green-600 text-white rounded-lg px-2 h-8 text-sm" disabled>Active Now</button></div>
                    </div>

                    {/* vendor apply now */}
                    <div className="border border-gray-300 rounded-lg p-4">

                        <div className="flex items-center justify-between ">
                            <div className="flex flex-row items-center gap-4">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-100 text-purple-500">
                                    <ShoppingBag />
                                </div>
                                <div>
                                    <p className="font-medium">Vendor</p>
                                    <p className="text-sm">Apply to sell at events</p>
                                </div>
                            </div>

                            <Link href='vendor/vendorapplication-1'>
                                <Button
                                    text='Apply Now'
                                    variant="cta"
                                    size="vsm"
                                    onClick={() => {
                                        onClose();
                                    }}
                                    className="border-purple-500 text-white bg-purple-600" />
                            </Link>



                        </div>
                        <div className="border-b border-brown-normal my-4"></div>

                        <ol className="list-none space-y-2">
                            <li className="flex items-center gap-2">
                                <CircleCheckBig className="w-5 h-5 text-purple-500" />
                                <span>Apply for booth spaces at event</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheckBig className="w-5 h-5 text-purple-500" />
                                <span>Manage inventory and sales</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheckBig className="w-5 h-5 text-purple-500" />
                                <span>Track sales and analytics</span>
                            </li>
                        </ol>
                    </div>


                    {/* organizer apply now */}
                    <div className="border border-gray-300 rounded-lg p-4">

                        <div className="flex items-center justify-between ">
                            <div className="flex flex-row items-center gap-4">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100 text-blue-500">
                                    <Calendar />
                                </div>
                                <div>
                                    <p className="font-medium">Organizer</p>
                                    <p className="text-sm">Apply to Host your own events</p>
                                </div>
                            </div>

                            <Link href='organizer/organizerapplication-1'>
                                <Button
                                    text='Apply Now'
                                    variant="cta"
                                    size="vsm"
                                    onClick={() => {
                                        onClose();

                                    }}
                                    className="border-purple-50 text-white bg-blue-600" />
                            </Link>



                        </div>
                        <div className="border-b border-brown-normal my-4"></div>

                        <ol className="list-none space-y-2">
                            <li className="flex items-center gap-2">
                                <CircleCheckBig className="w-5 h-5 text-blue-500" />
                                <span>Create and publish unlimited events</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheckBig className="w-5 h-5 text-blue-500" />
                                <span>Manage tickets sales and attendees</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CircleCheckBig className="w-5 h-5 text-blue-500" />
                                <span>Access to vendor and sponsor management</span>
                            </li>
                        </ol>
                    </div>






                </div>
                <div className="flex justify-end mt-4">
                    <Button text='Close'
                        onClick={onClose}
                        status="danger"
                        size="md" />
                </div>
            </div>
        </div>
    );
}
