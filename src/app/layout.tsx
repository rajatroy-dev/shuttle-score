import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppStoreProvider } from "./_providers/app-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shuttle Score",
  description: "Keep track of your badminton match scores with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          bg-slate-50 text-slate-900
          dark:bg-slate-900 dark:text-slate-50
        `}>
        <AppStoreProvider>
          <div className="container mx-auto px-8">
            {children}
          </div>
        </AppStoreProvider>
      </body>
    </html>
  );
}
