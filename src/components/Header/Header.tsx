'use client'

import NavBar from "./NavBar";
import Image from "next/image";
import goToSignIn from "@/yap/app/actions/goToSignIn";
import { useSession } from "next-auth/react";

export default function Header() {
    const { data: _, status } = useSession()

    return (
        <>
            <div className="h-24">
                <header className="w-full h-24 bg-gray-900 px-16 flex flex-row content-center items-center fixed top-0">
                    {/* items next to each other on the left */}
                    <div className="w-full h-full flex flex-row">
                        <Image
                            priority
                            src="/logo.png"
                            width={100}
                            height={100}
                            className="select-none p-4"
                            alt="Website logo" />
                        <NavBar></NavBar>
                    </div>
                    { status !== "authenticated" &&
                        <form action={goToSignIn}>
                            <button type="submit" className="w-28 h-12 bg-amber-500 rounded-lg" disabled={ status === "loading"}>
                                Sign in
                            </button>
                        </form>
                    }
                </header>
            </div>
        </>
    )
}