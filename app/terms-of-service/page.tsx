'use client'
import Button from '@/components/Button'
import { Calendar, Download, File, FileText, Mail, Printer } from 'lucide-react'
import React from 'react'

const page = () => {
    const handleDownloadPDF = () => {
        const link = document.createElement('a');
        link.href = '/terms-of-service.pdf';
        link.download = 'Terms_of_Service.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <section className="flex justify-center
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8">

            <div>
                <div className='flex gap-4'>
                    <div><div className='w-15 h-15 bg-purple-100 rounded-xl flex items-center justify-center'>
                        <FileText className='text-purple-700' />
                    </div></div>
                    <div className='space-y-2'>
                        <h1 className="text-xl font-bold">Terms of Service</h1>
                        <p className='text-justify'>Please read these terms and conditions carefully before using our service.</p>

                        <div className='flex gap-2 items-center font-bold'>
                            <Calendar size={18} />
                            <p>Effective: January 15, 2026</p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end gap-2 mt-4'>
                    <Button
                        text='Print'
                        iconLeft={<Printer size={16} />}
                        variant='cta'
                        size='sm'
                        onClick={() => window.print()}
                    />
                    <Button
                        text='Download PDF'
                        iconLeft={<Download size={16} />}
                        variant='cta'
                        size='sm'
                        onClick={handleDownloadPDF}
                    />
                </div>


                {/* acceptance of terms */}
                <h2 className="text-xl font-bold mt-4 my-2">1. Acceptance of Terms</h2>
                <p className="mb-4 text-justify">
                    By accessing and using EventHub (&apos;the Service&apos;), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use the Service.
                </p>

                {/* use of license */}
                <h2 className="text-xl font-bold mb-2">2. Use Liscense</h2>
                <p className="mb-4 text-justify">
                    Permission is granted to temporarily access the Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                        <li>Modify or copy the materials;</li>
                        <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li>Attempt to decompile or reverse engineer any software contained on the Service;</li>
                        <li>Remove any copyright or other proprietary notations from the materials; or</li>
                        <li>Transfer the materials to another person or &apos;mirror&apos; the materials on any other server.</li>
                    </ul>
                </p>

                {/*  use accounts */}
                <h2 className="text-xl font-bold mb-2">3. User Accounts</h2>
                <p className="mb-4 text-justify">
                    When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                </p>
                <p className="mb-4 text-justify">
                    You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
                </p>


                {/* Event organizers */}
                <h2 className="text-xl font-bold mb-2">4. Event Organizers</h2>
                <p className="mb-4 text-justify">
                    As an event organizer, you agree to:
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                        <li>Provide accurate and truthful information about your events</li>
                        <li>Honor all ticket sales and booth bookings</li>
                        <li>Comply with all applicable laws and regulations</li>
                        <li>Not engage in fraudulent or deceptive practices</li>
                        <li>Respond to attendee and vendor inquiries in a timely manner</li>
                    </ul>
                </p>


                {/* Event vendors */}
                <h2 className="text-xl font-bold mb-2">4. Vendors</h2>
                <p className="mb-4 text-justify">
                    Vendors using the platform agree to:
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                        <li>Prodvide quality products and services</li>
                        <li>Comply with all booth agreements and event rules</li>
                        <li>Maintain appropriate licenses and insurance</li>
                        <li>Not engage in illegal or unethical business practices</li>
                        <li>Respond to attendee and vendor inquiries in a timely manner</li>
                    </ul>
                </p>


                {/* Event attendees */}
                <h2 className="text-xl font-bold mb-2">4. Attendees</h2>
                <p className="mb-4 text-justify">
                    As an event attendee, you agree to:
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                        <li>Use tickets only for personal attendance</li>
                        <li>Not engage in ticket scalping or unauthorized resale</li>
                        <li>Respect event rules and venue policies</li>
                        <li>Provide honest reviews and feedback</li>
                    </ul>
                </p>

                {/* payments terms */}
                <h2 className="text-xl font-bold mb-2">5. Payment Terms</h2>
                <p className="mb-4 text-justify">
                    All payments are processed securely through our payment partners. EventHub charges a service fee on ticket sales and booth bookings. These fees are clearly disclosed before purchase.

                    Refund policies are set by individual event organizers and are displayed on event pages. EventHub may facilitate refunds but is not responsible for organizer refund policies.
                </p>


                {/* Prohibited activities */}
                <h2 className="text-xl font-bold mb-2">5. Prohibited Activites</h2>
                <p className="mb-4 text-justify">
                    You may not access or use the Service for any purpose other than that for which we make the Service available. Prohibited activities include, but are not limited to:
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                        <li>Engaging in any activity that violates any law or regulation</li>
                        <li>Infringing on the intellectual property rights of others</li>
                        <li>Transmitting harmful or malicious code</li>
                        <li>Interfering with the operation of the Service</li>
                        <li>Collecting personal information about other users without their
                            consent</li>
                    </ul>
                </p>


                {/* intellectual property  */}
                <h2 className="text-xl font-bold mb-2">5. Intellectual Property</h2>
                <p className="mb-4 text-justify">
                    The Service and its original content, features, and functionality are and will remain the exclusive property of EventHub and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>


                {/* termination */}
                <h2 className="text-xl font-bold mb-2">6. Termination</h2>
                <p className="mb-4 text-justify">
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                </p>


                {/* limitation of liability */}
                <h2 className="text-xl font-bold mb-2">7. Limitation of Liability</h2>
                <p className="mb-4 text-justify">
                    In no event shall EventHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>


                {/* changed terms */}
                <h2 className="text-xl font-bold mb-2">8. Changes to Terms</h2>
                <p className="mb-4 text-justify">
                    We reserve the right to modify or replace these Terms at any time. We will provide notice of any material changes by posting the new Terms on this page and updating the &apos;Last Updated&apos; date.
                </p>



                <h2 className="text-xl font-bold mb-2">9. Contact Us</h2>
                <p className="mb-4 text-justify">
                    If you have any questions about these Terms of Service, please contact us at
                    <a href="mailto:legal@eventhub.com" className='font-bold ml-1 hover:underline'>legal@eventhub.com</a>.
                </p>

                <div className='border border-purple-400 bg-purple-50 rounded-xl p-6'>
                    <div className='flex gap-4'>
                        <div className='w-15 h-15 rounded-xl bg-white items-center justify-center flex'>
                            <Mail className='text-purple-700' />
                        </div>

                        <div className='space-y-3'>
                            <p>Questions about this terms of service?</p>
                            <p>If you have any questions or concerns, please don&apos;t hesitate to contact us.</p>
                            <Button
                                text='Contact Legal Team'
                                iconLeft={<Mail size={16} />}
                                variant='cta'
                                size='sm'
                                onClick={() => window.location.href = 'mailto:legal@eventhub.com'}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default page
