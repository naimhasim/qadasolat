"use client"
 
import * as React from "react"
import { RowsIcon } from "@radix-ui/react-icons"; 
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
// import { useSession } from "next-auth/react";
import Link from "next/dist/client/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Github } from "lucide-react";

const links = [
  {
    name: 'FAQ',
    path: '/faq'
  }
];

export function NavToggle() {
  const router = useRouter();
  // const { data: session, status } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <RowsIcon className="md:hidden h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
          <Github className="hidden md:block h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
          <span className="sr-only">Toggle Option</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border border-secondary" align="end">
        {/* {links && links.map((link, i) => (
          <DropdownMenuItem key={i} className="hover: cursor-pointer" onClick={() => router.push(link.path)} >
            {link.name}
          </DropdownMenuItem>
        ))} */}
        <DropdownMenuItem className="hover: cursor-pointer" onClick={() => router.push('https://github.com/naimhasim/qadasolat')}>
        ⭐️ Star on GitHub
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function NavBar() {
  const router = useRouter();
  
  // const { data: session, status } = useSession();
  return (
    <nav className="flex justify-center">
      <div className="p-3 flex flex-row justify-between items-center w-screen lg:w-3/4 border-b border-b-secondary md:border-0">
        <div className="flex gap-5 text-sm font-light items-center">
          <Link href={'/'} className="scroll-m-20 text-lg lg:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">qadasolat</Link>
        </div>
        <div className="flex gap-5 text-sm font-light items-center">
          <NavToggle/>
        </div>
      </div>
    </nav>
  )
}