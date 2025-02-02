import { UserButton } from "@/features/auth/components/user-button"
import { MobileSidebar } from "./mobile-sidebar"
export const Navbar = () => {
    return (
        <nav className="px-6 pt-4 flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <h1 className="text-2xl font-semibold">Home</h1>
                <p className="text-muted-foreground">Monitor all of your projects and tasks here</p>
            </div>
            <div className="block lg:hidden w-full">
                <MobileSidebar/>
                
            </div>
            <UserButton/>
        </nav>
    )
}