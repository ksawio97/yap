'use client'

import useWidthBreakpoint from "@/yap/libs/hooks/useWidthBreakpoint";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BarsIcon from "../icons/BarsIcon";
import { useState } from "react";

function IsActive(currPath: string, pattern: string | RegExp) : string {
    // means its active
    if (currPath.match(pattern)) {
        return " bg-slate-800";
    }
    return "";
}
export default function NavBar({ headerHeight }: { headerHeight: number}) {
    const { reached } = useWidthBreakpoint((width) => width < 640);
    
    return (
        <nav className="h-full content-center w-fit">
            { reached ? <MobileNavBar headerHeight={headerHeight}/> :
                <ul className="h-full flex flex-row gap-4 items-center">
                    <LinkList additionalClasses="inline"/>
                </ul>   
            }
        </nav>
    )

}

function MobileNavBar({ headerHeight }: { headerHeight: number}) {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <>
            <div className={`size-12 ${showMenu && "text-slate-400"}`} onClick={() => setShowMenu(!showMenu)}>
                <BarsIcon/> 
            </div>
            { 
                <div className={`transition-all duration-500 h-fit w-full bg-gray-900 absolute top-24 origin-top left-0 px-8 pb-8 pt-2 ${showMenu ? "opacity-100" : "opacity-0"}`} style={{ top: `${headerHeight}px`}}>
                    <ul className="flex flex-col gap-4">
                        <LinkList onLinkClick={() => setShowMenu(false)}/>
                    </ul>
                </div> 
            }
        </>
    );
}

function LinkList({ additionalClasses = "", onLinkClick }: { additionalClasses?: string, onLinkClick?: () => void }) {
    const currPath = usePathname();

    const paths = [
        { text: "Home", path: "/", pattern: /^\/$/},
        { text: "Profile", path: "/profile", pattern: /^\/profile/},
        { text: "Settings", path: "/settings", pattern: /^\/settings/},
    ];

    return (
        paths.map(({text, path, pattern}) => 
            (<Link key={"NavBar-Link" + path} href={path} onClick={() => onLinkClick && onLinkClick()} passHref>
                <li key={"NavBar-li"+path} className={`p-3 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg ${IsActive(currPath, pattern)} ${additionalClasses}`}>
                    {text}
                </li>
            </Link>)
        )
    )
}