import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "@/components/context";
import { NavBar } from "@/components/guest/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qadasolat | Compensating for Missed Salah Throughout One's Lifetime",
  description: "Compensating for Missed Salah Throughout One's Lifetime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <AppProvider>
          <main className="flex flex-col min-h-screen sm:h-screen px-1">
            <NavBar/>
            <div className="grow flex flex-col h-auto">
              {children}
            </div>
            <Footer/>
          </main>
          <Toaster/>
        </AppProvider>
      </body>
    </html>
  );
}
