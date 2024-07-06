'use client'

import { signIn as signInDB } from '../../auth/auth';

export type SignInState = {
    message: string | null,
    error: boolean
}

export default async function signInFieldValidation(prevState: SignInState | undefined, formData: FormData): Promise<SignInState> {
    let res;
    try {
        res = await signInDB('credentials', {
            email: formData.get("email"),
            password: formData.get("password")
        });
    } catch (err) {
        const error = (err as Error);
        // console.log(err);
        return {
            message: error.message,
            error: true
        }
    }
    return {
        message: 'Test message',
        error: !res
    }
}