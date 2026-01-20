'use client'
import Button from '@/components/Button'
import { Calendar, Download, File, FileText, Mail, Printer, Shield } from 'lucide-react'
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
                        <Shield className='text-purple-700' />
                    </div></div>
                    <div className='space-y-2'>
                        <h1 className="text-xl font-bold">Privacy Policy</h1>
                        <p className='text-justify'>This privacy policy explains how we collect, use, and protect your personal information when you use EventHub.</p>

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
                <h2 className="text-xl font-bold mb-2">2. Information We Collect</h2>
                <p className="mb-4 text-justify">
                    We collect several types of information  from and about users of our Service:
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                        <li>Personal Information;</li>
                        <li>Name, email address, and phone number</li>
                        <li>Payment Information (profile picture, bio, and preferences)</li>
                        <li>Event attendance and booking history</li>
                        <li>Automatically Collected Information</li>
                        <li>IP address and device information</li>
                        <li>Browser type and version</li>
                        <li>Pages visited and time spent on pages</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>
                </p>

                {/* how we use your information */}
                <h2 className="text-xl font-bold mb-2">2. How We Use Your Information</h2>
                <p className="mb-4 text-justify">
                    We use the information we collect to:
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process transactions and send related information</li>
                        <li>Send you technical notices, updates, and support messages</li>
                        <li>Respond to your comments, questions, and customer service requests</li>
                        <li>Communicate with you about events, products, and services</li>
                        <li>Monitor and analyze trends, usage, and activities</li>
                        <li>Detect, prevent, and address technical issues and fraudulent activity</li>
                        <li>Personalize your experience and deliver relevant content</li>
                    </ul>
                </p>

                {/* how we use your information */}
                <h2 className="text-xl font-bold mb-2">2. Sharing of Information</h2>
                <p className="mb-4 text-justify">
                    We may share your information in the following situations:
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                        <li><span className='font-bold'>With Event Organizers:</span> When you register for an event, we share your registration information with the organizer</li>
                        <li><span className='font-bold'>With Vendors:</span> When you book a booth or service, relevant information is shared with the vendor</li>
                        <li><span className='font-bold'>With Service Providers:</span> We work with third-party service providers who perform services on our behalf</li>
                        <li><span className='font-bold'>For Legal Purposes:</span> We may disclose information if required by law or to protect our rights</li>
                        <li><span className='font-bold'>Business Transfers:</span> In connection with any merger, sale, or acquisition of our business</li>

                    </ul>
                </p>



                {/*  data security */}
                <h2 className="text-xl font-bold mb-2">3. Data Security</h2>
                <p className="mb-4 text-justify">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>

                {/* your rights */}
                <h2 className="text-xl font-bold mb-2">4. Your Rights</h2>
                <p className="mb-4 text-justify">
                    You have the following rights rrgarding your personal information:
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                        <li><span className='font-bold'>Access:</span> Request access to your personal information</li>
                        <li><span className='font-bold'>Correction:</span>Request correction of inaccurate information</li>
                        <li><span className='font-bold'>Deletion:</span> Request deletion of your personal information</li>
                        <li><span className='font-bold'>Objection:</span> Object to processing of your information</li>
                        <li><span className='font-bold'>Portability:</span> Request transfer of your information to another service</li>
                        <li><span className='font-bold'>Withdraw Consent:</span> Withdraw consent where we rely on it</li>
                    </ul>
                </p>




                {/* data retention */}
                <h2 className="text-xl font-bold mb-2">5. Data Retention</h2>
                <p className="mb-4 text-justify">
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>


                {/* International Data Transfers */}
                <h2 className="text-xl font-bold mb-2">5. International Data Transfers</h2>
                <p className="mb-4 text-justify">
                    Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ.
                </p>


                {/* intellectual property  */}
                <h2 className="text-xl font-bold mb-2">5. Children&apos;s Privacy</h2>
                <p className="mb-4 text-justify">
                    Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>


                {/* changes to the policy */}
                <h2 className="text-xl font-bold mb-2">6. Changes to This Policy</h2>
                <p className="mb-4 text-justify">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &apos;Last Updated&apos; date.
                </p>



                <h2 className="text-xl font-bold mb-2">9. Contact Us</h2>
                <p className="mb-4 text-justify">
                    If you have any questions about this Privacy Policy, please contact us at
                    <a href="mailto:privacy@eventhub.com" className='font-bold ml-1 hover:underline'>privacy@eventhub.com</a>.
                </p>

                <div className='border border-purple-400 bg-purple-50 rounded-xl p-6'>
                    <div className='flex gap-4'>
                        <div className='w-15 h-15 rounded-xl bg-white items-center justify-center flex'>
                            <Mail className='text-purple-700' />
                        </div>

                        <div className='space-y-3'>
                            <p>Questions about this privacy policy?</p>
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
