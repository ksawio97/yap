'use client'

import resetPassword from "@/yap/app/actions/auth/resetPassword";
import { useFormState } from "react-dom";
import ErrorInfo from "../../error/ErrorInfo";
import { FormEvent, useEffect, useState } from "react";
import Loading from "../../Loading";

export default function ResetPasswordForm({ onSuccess, } : { onSuccess: (email: string) => void }) {
    const [formState, action] = useFormState(resetPassword, undefined);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // not successful
        if (formState === undefined || formState.error)       
            return;

        onSuccess(email);
    }, [email, formState, onSuccess, setLoading]);

    useEffect(() => {
        setLoading(false);
    }, [formState])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        
        const target = e.target as typeof e.target & {
            email: { value: string }
        };

        setEmail(target.email.value);
        setLoading(true);
    }

    return (
        <form className="flex flex-col p-2 gap-8 text-black" action={action} onSubmit={handleSubmit}>
            {  loading ? <Loading/> : <>
                <div className="flex flex-col">
                    <input type='email' name='email' id='email' className="p-2 text-black" placeholder="Email" required></input>
                    { formState && formState.message !== null && formState.error && <ErrorInfo error={formState!!.message}></ErrorInfo> }
                </div>
                <button type="submit" className="bg-amber-500 text-white p-2 rounded-md w-3/4 self-center">Reset my password</button>
            </>}
        </form>
    );
}