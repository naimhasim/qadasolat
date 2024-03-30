import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Footer(){
    return (
        <footer className="grow-0 flex flex-col md:flex-row justify-center items-center h-auto text-muted">
          {/* <ul className="p-2"><Button className="text-muted hover:text-primary" variant={'link'}>Open Source<Github className="h-[1.2rem] w-[1.2rem]"/></Button></ul> */}
          <ul className="inline-block">
            <Button className="text-muted hover:text-primary" variant={'link'}>Open Source<Github className="h-[1.2rem] w-[1.2rem]"/></Button>
          </ul>
          <ul className="inline-block">
            © 2024 Naim Hasim. All rights reserved.
          </ul>
        </footer>
    )
}