import logo from "../public/logo.svg"
import Image from 'next/image'
import Link from 'next/link'
import { DottedSeperator } from "./ui/dotted-seperator"
import { Navigation } from "./navigation"
export const Sidebar = () => {
    return(
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href="/">
                <Image src={logo} alt="" width={164} height={48}></Image>
            </Link>

            <DottedSeperator className="my-4"/>
            <Navigation/>
        </aside>
    )
}