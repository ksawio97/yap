'use client'

import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import FloatingBlock from "./FloatingBlock";
import LoginForm from "./LoginForm";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";

// /login path automaticly opens form
function isLoginPage(currPath: string) : Boolean {
    return currPath.match(/^\/login$/) != null;
}

export default function Header() {
    const currPath = usePathname();
    const [showForm, setShowForm] = useState(isLoginPage(currPath));

    useEffect(() => {
        // login form closed on /login page, redirect to home page
        if (!showForm && currPath.match(/^\/login$/))
            redirect("/");
    }, [showForm]);


    return (
        <>
            {showForm ? 
                <FloatingBlock handleClose={() => { setShowForm(false) }}>
                    <LoginForm></LoginForm>
                </FloatingBlock>
            : <></>}
            <header className="w-full h-24 bg-gray-900 px-16 flex flex-row content-center items-center">
                {/* items next to each other on the left */}
                <div className="w-full h-full flex flex-row">
                    <Image
                        src="/logo.png"
                        width={100}
                        height={100}
                        className="select-none p-4"
                        alt="Website logo" />
                    <NavBar></NavBar>
                </div>

                <button type="button" className="w-28 h-12 bg-amber-500 rounded-lg" 
                    onClick={() => setShowForm(true)}>
                    Log In
                </button>
            </header>
        </>

    )
}