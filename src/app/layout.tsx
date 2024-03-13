import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModeToggle } from "@/components/ModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qadasolat | Making Up Years of Missed Salah",
  description: "Making Up Years of Missed Salah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <div className="bg-background text-foreground p-3 flex flex-row justify-between items-center w-full">
          <ul className="flex gap-5 text-sm font-light uppercase">
            <p>Login</p>
            <p>FAQ</p>
          </ul>
           <ModeToggle/> 
        </div> */}
        {children}
        </body>
    </html>
  );
}
