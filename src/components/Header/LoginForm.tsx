'use client'

import { FormEvent } from "react";

export default function LoginForm() {
    async function handleSubmit(event: FormEvent) {
        console.log(event);
    }

    return (
        <>
            <h2 className="text-4xl p-3">Log In</h2>
            <form onSubmit={handleSubmit} className="flex flex-col p-2 gap-8 text-black">
                <input type="email" name="email" placeholder="Email" required></input>
                <input type="password" name="password" placeholder="Password" required></input>
                <button type="submit" className="bg-amber-500 text-white p-2 rounded-md w-3/4 self-center">Log In</button>
            </form>
        </>
    )
}