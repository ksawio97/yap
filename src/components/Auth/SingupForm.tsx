'use client'

import { singUp } from "@/yap/app/actions/auth";
import { useFormState } from "react-dom";
import InputWithErrorInfo from "./InputWithErrorInfo";

export default function SingupForm() {
    const [formState, action] = useFormState(singUp, undefined);

    return (
        <form className="flex flex-col p-2 gap-5 text-white" action={action}>
            <InputWithErrorInfo type="text" name="name" labelText="Username: " errors={formState?.errors.name}></InputWithErrorInfo>
            <InputWithErrorInfo type="email" name="email" labelText="Email: " errors={formState?.errors.email}></InputWithErrorInfo>
            <InputWithErrorInfo type="password" name="password" labelText="Password: " errors={formState?.errors.password}></InputWithErrorInfo>
            <button type="submit" className="bg-amber-500 text-white p-2 rounded-md w-3/4 self-center">Sign Up</button>
        </form>
    );
}   