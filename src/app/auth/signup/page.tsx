import SignupForm from "@/yap/components/Auth/SignupForm";

export default function Signup() {
    return (
        <div className="justify-self-center h-fit pt-22 md:w-1/2 lg:3/4 w-full flex flex-col gap-4">
            <h2 className="sm:text-6xl text-5xl p-3 text-center">Sign up</h2>
            <div className="2xl:w-1/2 self-center">
                <SignupForm>
                </SignupForm>
            </div>
        </div>
    );
}