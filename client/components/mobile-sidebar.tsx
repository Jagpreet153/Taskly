"use client"
import {Sheet, SheetContent, SheetTrigger} from "./ui/sheet"
import {Button} from "./ui/button"  
import { MenuIcon} from "lucide-react"
import { Sidebar } from "./sidebar"
import { useEffect, useState } from "react"

export const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pathname, setPathname] = useState("");

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="secondary" className="sm-hidden" size="icon">
                    <MenuIcon className="w-4 h-4 text-neutral-500"/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}