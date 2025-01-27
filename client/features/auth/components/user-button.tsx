"use client"
import { Avatar,AvatarFallback,AvatarImage } from "../../../components/ui/avatar"
import {DropdownMenu,DropdownMenuItem,DropdownMenuContent,DropdownMenuTrigger} from "../../../components/ui/dropdown-menu";
import { DottedSeperator} from "@/components/ui/dotted-seperator";
import { useLogout } from "../api/use-logout";
import { useCurrent } from "../api/use-current";
import { Loader, LogOut } from "lucide-react";

export const UserButton = () => {
    const {data: user,isLoading} = useCurrent();
    const {mutate: logout} = useLogout();
    if(isLoading)
    {    
        return (
            <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border-neural-200">
                <Loader className="size-4 animate-spin text-muted-foreground"/>
            </div>
        )    
    }

    const {name,email} = user;
    if(!user)
    {
        return null;
    }
    const avatarfallback =name?  name[0].toUpperCase(): email[0].toUpperCase() ?? "U";

    return(
        <DropdownMenu modal={false}>  
            <DropdownMenuTrigger className="outline-none-relative p-5">
                <Avatar className="w-10 h-10 rounded-full hover:opacity-25 transition border border-neutral-300 ">
                    <AvatarFallback className="bg-neutral-200 rounded-full font-medium text-neutral-500 flex items-cneter justify-center">
                        {avatarfallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-100" sideOffset={10} align="end" side="bottom">
                <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
                    <Avatar className="w-10 h-10 rounded-full transition border border-neutral-300 ">
                        <AvatarFallback className="bg-neutral-200 rounded-full font-medium text-neutral-500 flex items-cneter justify-center">
                            {avatarfallback}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col items-center justify-center ">
                        <p className="text-sm font-medium text-neutral-900">
                            {name || "User"}
                        </p>
                        <p className="text-xs text-neutral-500">
                            {email || "User"}
                        </p>
                    </div>
                </div>
                <DottedSeperator className="mb-1"/>
                <DropdownMenuItem onClick={()=> logout()} className="flex items-center justify-center text-amber-700 font-medium cursor-pointer">
                    <LogOut className="size-4 mr-2"/>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}