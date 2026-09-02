"use client";
import Button from "@/components/Button";
import {
  Calendar,
  Cookie,
  Download,
  File,
  FileText,
  Mail,
  Printer,
  Shield,
} from "lucide-react";
import React from "react";

const page = () => {
  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/terms-of-service.pdf";
    link.download = "Terms_of_Service.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section
      className="flex justify-center
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8"
    >
      <div>
        <div className="flex gap-4">
          <div>
            <div className="w-15 h-15 bg-purple-100 rounded-xl flex items-center justify-center">
              <Cookie className="text-purple-700" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold">Cookie Policy</h1>
            <p className="text-justify">
              This policy explains how we use cookies and similar technologies.
            </p>

            <div className="flex gap-2 items-center font-bold">
              <Calendar size={18} />
              <p>Effective: January 15, 2026</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            text="Print"
            iconLeft={<Printer size={16} />}
            variant="cta"
            size="sm"
            onClick={() => window.print()}
          />
          <Button
            text="Download PDF"
            iconLeft={<Download size={16} />}
            variant="cta"
            size="sm"
            onClick={handleDownloadPDF}
          />
        </div>

        {/* what are cookies */}
        <h2 className="text-xl font-bold mt-4 my-2">1. What are Cookies?</h2>
        <p className="mb-4 text-justify">
          Cookies are small text files that are placed on your device when you
          visit a website. They are widely used to make websites work more
          efficiently and provide information to website owners.
        </p>

        {/* how we use cookies */}
        <h2 className="text-xl font-bold mb-2">2. How We Use Cookies</h2>
        <p className="mb-4 text-justify">
          EventHub uses cookies for several reasons:
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
        <h2 className="text-xl font-bold mb-2">
          2. How We Use Your Information
        </h2>
        <p className="mb-4 text-justify">
          We use the information we collect to:
          <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
            <li>
              <span className="font-bold">Essential Cookies:</span> Necessary
              for the website to function properly
            </li>
            <li>
              <span className="font-bold">Performance Cookies:</span> Help us
              understand how visitors interact with our website
            </li>
            <li>
              <span className="font-bold">Functionality Cookies:</span> Enable
              enhanced functionality and personalization
            </li>
            <li>
              <span className="font-bold">Targeting/Advertising Cookies:</span>{" "}
              Deliver relevant advertisements
            </li>
          </ul>
        </p>

        {/* types of cookies */}
        <h2 className="text-xl font-bold mb-2">3. Types of Cookies We Use</h2>
        <p className="mb-4 text-justify">
          We may share your information in the following situations:
          <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
            <li>
              <span className="font-bold">Strictly Necessary Cookies:</span>
              These cookies are essential for you to browse the website and use
              its features. Without these cookies, services you have asked for
              cannot be provided.
            </li>

            <li>
              <span className="font-bold">
                Analytics and Performance Cookies:
              </span>
              These cookies collect information about how visitors use our
              website, such as which pages are visited most often. This helps us
              improve how our website works.
            </li>

            <li>
              <span className="font-bold">Functionality Cookies:</span>
              These cookies allow the website to remember choices you make (such
              as your username, language, or region) and provide enhanced, more
              personal features.
            </li>

            <li>
              <span className="font-bold">Advertising Cookies:</span>
              These cookies are used to deliver advertisements that are relevant
              to you. They also limit the number of times you see an
              advertisement and help measure the effectiveness of advertising
              campaigns.
            </li>
          </ul>
        </p>

        {/*  third-party cookies */}
        <h2 className="text-xl font-bold mb-2">4. Third-Party Cookies</h2>
        <p className="mb-4 text-justify">
          We work with third-party service providers who may also set cookies on
          your device. These include:
          <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
            <li>Google Analytics for website analytics</li>
            <li>Payment processors for secure transactions</li>
            <li>Social media platforms for sharing functionality</li>
            <li>Advertising networks for targeted advertising</li>
          </ul>
        </p>

        {/* managing cookies */}
        <h2 className="text-xl font-bold mb-2">5. Managing Cookies</h2>
        <p className="mb-4 text-justify">
          Most web browsers allow you to control cookies through their settings
          preferences. However, limiting cookies may impact your experience of
          our website. You can set your browser to:
          <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
            <li>Accept all cookies</li>
            <li>Notify you when a cookie is set</li>
            <li>Reject all cookies</li>
          </ul>
        </p>

        {/* cookie duration */}
        <h2 className="text-xl font-bold mb-2">6. Cookie Duration</h2>
        <p className="mb-4 text-justify">
          Cookies may be either &quot;session&quot; cookies or
          &quot;persistent&quot; cookies:
          <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
            <li>
              <span className="font-bold">Session Cookies:</span> Temporary
              cookies that expire when you close your browser
            </li>
            <li>
              <span className="font-bold">Persistent Cookies:</span> Remain on
              your device for a set period or until you delete them
            </li>
          </ul>
        </p>

        {/* update to the policy */}
        <h2 className="text-xl font-bold mb-2">6. Update to This Policy</h2>
        <p className="mb-4 text-justify">
          We may update this Cookie Policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>

        <h2 className="text-xl font-bold mb-2">9. Contact Us</h2>
        <p className="mb-4 text-justify">
          If you have any questions about our use of cookies, please contact us
          at
          <a
            href="mailto:cookies@eventhub.com"
            className="font-bold ml-1 hover:underline"
          >
            cookies@eventhub.com
          </a>
          .
        </p>

        <div className="border border-purple-400 bg-purple-50 rounded-xl p-6">
          <div className="flex gap-4">
            <div className="w-15 h-15 rounded-xl bg-white items-center justify-center flex">
              <Mail className="text-purple-700" />
            </div>

            <div className="space-y-3">
              <p>Questions about this cookie policy?</p>
              <p>
                If you have any questions or concerns, please don&apos;t
                hesitate to contact us.
              </p>
              <Button
                text="Contact Legal Team"
                iconLeft={<Mail size={16} />}
                variant="cta"
                size="sm"
                onClick={() =>
                  (window.location.href = "mailto:cookies@eventhub.com")
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
