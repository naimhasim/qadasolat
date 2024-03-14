import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModeToggle } from "@/components/ModeToggle";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={`${inter.className} bg-background`}>
        {/* <div className="flex justify-center">
          <div className="bg-background text-foreground p-3 flex flex-row justify-between items-center w-3/4">
            <ul className="flex gap-5 text-sm font-light uppercase">
              <p>Login</p>
              <p>FAQ</p>
            </ul>
            <ModeToggle/> 
          </div>
        </div> */}
        <div className="bg-background text-foreground py-16 md:py-32 flex flex-col justify-center items-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Qada Solat Tracker</h1>
          <p className="scroll-m-20 text-md tracking-tighter text-muted-foreground">One Prayer at a time, Track with Confidence.</p>
        </div>
        {children}
        <Toaster/>
        </body>
    </html>
  );
}
