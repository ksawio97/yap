import SigninForm from "@/yap/components/Header/SigninForm";
import FloatingBlockWrapper from "@/yap/components/Wrappers/FloatingBlockWrapper";
import Link from "next/link";

export default function Singin() {
    return (
        <div className="justify-self-center h-fit pt-32 w-3/6 flex flex-col gap-4">
            <h2 className="sm:text-6xl text-5xl p-3 text-center">Sign in</h2>
            <div className="w-1/2 self-center">
                <SigninForm>
                </SigninForm>
            </div>
            <div className="self-center">
                <Link href="/">New here? <span className="text-emerald-300">Sign up</span></Link>
            </div>
        </div>

    );
}