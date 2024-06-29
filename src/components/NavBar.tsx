'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

function IsActive(currPath: string, pattern: string | RegExp) : string {
    // means its active
    if (currPath.match(pattern)) {
        return " bg-slate-800";
    }
    return "";
}
export default function NavBar() {
    const currPath = usePathname();
    const paths = [
        { text: "Home", path: "/", pattern: /^\/$/},
        { text: "Profile", path: "/profile", pattern: /^\/profile/},
        { text: "Settings", path: "/settings", pattern: /^\/settings/},
    ];
    return (
        <nav className="h-full content-center">
            <ul className="h-full flex flex-row gap-4 items-center">
                {paths.map(({text, path, pattern}) => 
                    (<Link href={path} passHref>
                        <li key={path} className={`p-3 text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg inline${IsActive(currPath, pattern)}`}>
                            {text}
                        </li>
                    </Link>)
                )}
            </ul>
        </nav>
    )

}