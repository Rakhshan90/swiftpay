import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextProvider } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import AppbarClient from "@/components/appbar-client";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Swiftpay",
  description: "A wallet that let's you add money, withdraw money and peer-to-peer transfer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AppbarClient />
          {children}
          <Toaster />
        </body>
      </NextProvider>
    </html>
  );
}
