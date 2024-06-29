'use client'

import NavBar from "./NavBar";
import { useState } from "react";
import FloatingBlock from "./FloatingBlock";
import LoginForm from "./LoginForm";
import Image from "next/image";

export default function Header() {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            {showForm ? 
                <FloatingBlock handleClose={() => { setShowForm(false) }}>
                    <LoginForm></LoginForm>
                </FloatingBlock>
            : <></>}
            <header className="w-full h-24 bg-gray-900 px-16 flex flex-row content-center items-center">
                <Image
                src="/logo.png"
                width={100}
                height={100}
                className="select-none p-4"
                alt="Website logo"
                    />
                <NavBar></NavBar>
                <button type="button" className="w-28 h-12 bg-amber-500 rounded-lg right-12 absolute" 
                    onClick={() => setShowForm(true)}>
                    Log In
                </button>
            </header>
        </>

    )
}