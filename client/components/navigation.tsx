"use client"

import { SettingsIcon,UsersIcon } from 'lucide-react'
import {GoCheckCircle, GoCheckCircleFill, GoHome,GoHomeFill} from 'react-icons/go'
import {cn } from "@/lib/utils"
import { useWorkspaceId } from '@/features/workspaces/hooks/useWorkspaceId'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import path from 'path'
const routes = [
    {
        label: 'Home',
        href: "/",
        icon: GoHome,
        activeIcon: GoHomeFill
    },
    {
        label: 'My Tasks',
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill
    },
    {
        label: 'Settings',
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon,
    },
    {
        label: 'Users',
        href: "/users",
        icon: UsersIcon,
        activeIcon: UsersIcon,
    }
]

export const Navigation = () => {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();
    return(
        <ul className='flex flex-col'>
           {
                routes.map((items)=> {
                    const fullHref = `/workspace/${workspaceId}${items.href}`;
                    const isActive = pathname === fullHref;
                    const Icon = isActive ? items.activeIcon : items.icon;
                    return (
                        <Link key={items.href} href={fullHref}>
                            <div className={cn(
                                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transisiton text-neutral-500",
                                isActive && "bg-white shadow-sm hover:opacity-100 ext-primary"
                            )}>
                                <Icon className='w-5 h-5 text-neutral-500'/>
                                {items.label}
                            </div>
                        </Link>
                    )
                })
                
           }
    
        </ul>
    )
}