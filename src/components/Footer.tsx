import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Footer(){
    return (
        <footer className="grow-0 flex justify-center items-center h-auto text-muted">
          {/* <ul className="p-2"><Button className="text-muted hover:text-primary" variant={'link'}>Open Source<Github className="h-[1.2rem] w-[1.2rem]"/></Button></ul> */}
          <ul className="p-2"><Button className="text-muted hover:text-primary" variant={'link'}>Open Source<Github className="h-[1.2rem] w-[1.2rem]"/></Button> © 2024 Naim Hasim. All rights reserved.</ul>
        </footer>
    )
}