import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModeToggle } from "@/components/ModeToggle";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qadasolat | Compensating for Missed Salah Throughout One's Lifeime",
  description: "Compensating for Missed Salah Throughout One's Lifeime",
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
        <div className="text-foreground py-16 md:py-20 flex flex-col justify-center items-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">Qada Solat Tracker</h1>
          <p className="scroll-m-20 text-md tracking-tighter text-muted-foreground text-center">{`Compensating for Missed Salah Throughout One${"'"}s Lifetime`}</p>
        </div>
        {children}
        <Toaster/>
        <footer className="flex justify-center items-center h-auto text-muted">
          <ul className="p-2">© 2024 Naim Hasim. All rights reserved.</ul>
        </footer>
        </body>
    </html>
  );
}
