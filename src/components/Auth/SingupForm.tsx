import { singUp } from "@/yap/app/actions/auth";
import { useFormState } from "react-dom";

export default function SingupForm() {
    const [formState, action] = useFormState(singUp, undefined);

    return (
        <form className="flex flex-col p-2 gap-8 text-black" action={action}>
            <style jsx>{`
                input {
                    padding: 8px;
                }
            `}</style>
            <input type="email" name="email" placeholder="Email" required></input>
            <input type="password" name="password" placeholder="Password" required></input>
            <button type="submit" className="bg-amber-500 text-white p-2 rounded-md w-3/4 self-center">Sign Up</button>
        </form>
    );
}