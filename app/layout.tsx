import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import HeaderLoggedIn from "@/components/HeaderLoggedIn";
import Header from "@/components/Header";


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

        {/* Dynapuff */}
        <link href="https://fonts.googleapis.com/css2?family=Chewy&family=DynaPuff:wght@400..700&family=Niconne&display=swap"
          rel="stylesheet"></link>

        {/* Cause */}
        <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Cause:wght@400..700&family=Niconne&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-cause">


        <HeaderLoggedIn />
        {/* <Header/> */}
        {children}
        <Footer />
      </body>
    </html>

  );
}
