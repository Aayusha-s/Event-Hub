'use client'
import Button from '@/components/Button'
import { Calendar, Cookie, Download, File, FileText, Mail, Printer, Scale, Shield } from 'lucide-react'
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
                        <Scale className='text-purple-700' />
                    </div></div>
                    <div className='space-y-2'>
                        <h1 className="text-xl font-bold">Legal Disclaimer</h1>
                        <p className='text-justify'>Important legal information and disclaimer regarding EventHub services.</p>

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


                {/* General information */}
                <h2 className="text-xl font-bold mt-4 my-2">1. General Information</h2>
                <p className="mb-4 text-justify">
                    The information provided by EventHub (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on our website and mobile application is for general informational purposes only. All information on the Service is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Service.
                </p>

                {/* Event Information Disclaimer */}
                <h2 className="text-xl font-bold mb-2">2. Event Information Disclaimer</h2>
                <p className="mb-4 text-justify">
                    EventHub acts as a platform connecting event organizers, vendors, and attendees. We do not organize, host, or manage the events listed on our platform. Event organizers are solely responsible for:
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                        <li>Accuracy of event information</li>
                        <li>Event quality and execution</li>
                        <li>Compliance with laws and regulations</li>
                        <li>Health and safety measures</li>
                        <li>Honoring tickets and bookings</li>
                    </ul>
                </p>

                {/* No Professional Advice */}
                <h2 className="text-xl font-bold mb-2">3. No Professional Advice</h2>
                <p className="mb-4 text-justify">
                    The information provided on the Service is not intended to be a substitute for professional advice. You should consult with appropriate professionals for specific advice tailored to your situation.
                </p>



                {/* external links */}
                <h2 className="text-xl font-bold mb-2">4. External Links Disclaimer</h2>
                <p className="mb-4 text-justify">
                    The Service may contain links to external websites that are not provided or maintained by EventHub. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                </p>



                {/*  payment processing */}
                <h2 className="text-xl font-bold mb-2">5. Payment Processing</h2>
                <p className="mb-4 text-justify">
                    EventHub uses third-party payment processors to handle transactions. While we strive to ensure security, we are not responsible for payment processing errors, security breaches at third-party processors, or unauthorized transactions.
                </p>

                {/* limitation of liability */}
                <h2 className="text-xl font-bold mb-2">6. Limitation of Liability</h2>
                <p className="mb-4 text-justify">
                    Under no circumstance shall EventHub have any liability to you for any loss or damage of any kind incurred as a result of the use of the Service or reliance on any information provided on the Service. Your use of the Service and your reliance on any information on the Service is solely at your own risk.
                </p>


                {/* event cancellation and changes */}
                <h2 className="text-xl font-bold mb-2">7. Event Cancellation and Changes</h2>
                <p className="mb-4 text-justify">
                    Events may be cancelled, postponed, or modified by event organizers. EventHub is not responsible for such changes and any associated losses. Refund policies are determined by individual event organizers.

                </p>


                {/* user-generated content */}
                <h2 className="text-xl font-bold mb-2">8. User-Generated Content</h2>
                <p className="mb-4 text-justify">
                    The Service allows users to post reviews, comments, and other content. These views are those of the users and do not reflect the views of EventHub. We do not endorse, guarantee, or assume responsibility for user-generated content.

                </p>


                {/* accuracy of vendor information */}
                <h2 className="text-xl font-bold mb-2">9. Accuracy of Vendor Information</h2>
                <p className="mb-4 text-justify">
                    Vendors are responsible for the accuracy of their listings, products, and services. EventHub does not verify vendor credentials, qualifications, or the quality of their offerings.

                </p>


                {/* availability */}
                <h2 className="text-xl font-bold mb-2">10. Availability</h2>
                <p className="mb-4 text-justify">
                    We do not guarantee that the Service will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance, resulting in interruptions, delays, or errors.

                </p>


                {/* changes to service */}
                <h2 className="text-xl font-bold mb-2">11. Changes to Service</h2>
                <p className="mb-4 text-justify">
                    We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice. We will not be liable if for any reason all or any part of the Service is unavailable.

                </p>


                {/* governing law */}
                <h2 className="text-xl font-bold mb-2">12. Governing Law</h2>
                <p className="mb-4 text-justify">
                    These disclaimers and any disputes arising out of or related to them shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.

                </p>


                {/* update to disclaimer */}
                <h2 className="text-xl font-bold mb-2">13. Update to Disclaimer</h2>
                <p className="mb-4 text-justify">
                    We may update this disclaimer from time to time. The updated version will be indicated by an updated &quot;Last Updated&quot; date and the updated version will be effective as soon as it is accessible.
                </p>


                {/* contact us */}
                <h2 className="text-xl font-bold mb-2">14. Contact Us</h2>
                <p className="mb-4 text-justify">
                    If you have any questions about this disclaimer, please contact us at
                    <a href="mailto:legal@eventhub.com" className='font-bold ml-1 hover:underline'>legal@eventhub.com</a>.
                </p>

                <div className='border border-purple-400 bg-purple-50 rounded-xl p-6'>
                    <div className='flex gap-4'>
                        <div className='w-15 h-15 rounded-xl bg-white items-center justify-center flex'>
                            <Mail className='text-purple-700' />
                        </div>

                        <div className='space-y-3'>
                            <p>Questions about this legal disclaimer?</p>
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
