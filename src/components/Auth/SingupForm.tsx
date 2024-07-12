'use client'

import singUp from "@/yap/app/actions/auth/signUp";
import { useFormState } from "react-dom";
import InputWithErrorInfo from "./InputWithErrorInfo";
import ErrorInfoList from "./ErrorInfoList";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function SingupForm() {
    const [formState, action] = useFormState(singUp, undefined);
    
    useEffect(() => {
        // state not defined
        if (!formState)
            return;
        // any errors
        if (formState.errors._form || formState.errors.name || formState.errors.email || formState.errors.password)
            return;
        redirect('/auth/signup/success')
    }, [formState]);

    return (
        <form className="flex flex-col p-2 gap-5 text-white" action={action}>
            <ErrorInfoList errors={formState?.errors._form}></ErrorInfoList>
            <InputWithErrorInfo type="text" name="name" labelText="Username: " errors={formState?.errors.name}></InputWithErrorInfo>
            <InputWithErrorInfo type="email" name="email" labelText="Email: " errors={formState?.errors.email}></InputWithErrorInfo>
            <InputWithErrorInfo type="password" name="password" labelText="Password: " errors={formState?.errors.password}></InputWithErrorInfo>
            <button type="submit" className="bg-amber-500 text-white p-2 rounded-md w-3/4 self-center">Sign Up</button>
        </form>
    );
}   