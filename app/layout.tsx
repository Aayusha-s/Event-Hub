import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import HeaderLoggedIn from "@/components/HeaderLoggedIn";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});


export const metadata: Metadata = {
  title: "EventHub",
  description: "Turn Moments into Memories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${plusJakartaSans.variable} font-cause bg-background text-text-dark antialiased`}>
        <HeaderLoggedIn />
        {/* <Header/> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
