'use client'

export default function SigninForm() {

    return (
        <form className="flex flex-col p-2 gap-8 text-black">
            <style jsx>{`
                input {
                    padding: 8px;
                }
            `}</style>
            <input type="email" name="email" placeholder="Email" required></input>
            <input type="password" name="password" placeholder="Password" required></input>
            <button type="submit" className="bg-amber-500 text-white p-2 rounded-md w-3/4 self-center">Log In</button>
        </form>
    )
}