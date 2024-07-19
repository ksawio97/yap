'use server'

import { signIn } from "@/yap/auth/auth";
import { AuthError } from "next-auth";

export type AuthenticateState = {
    message: string | null,
    error: boolean
}
// TODO fix error recognition
function getErrorMessage(error: AuthError): string {
    switch (error.type) {
        case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
    }
}

export default async function authenticate(prevState: AuthenticateState | undefined, formData: FormData): Promise<AuthenticateState> {
    try {
        // TODO verify email
        // sign in
        await signIn('credentials', formData);
    } catch (error) {
        if (!(error instanceof AuthError))
            throw error;
        return {
            message: getErrorMessage(error),
            error: true
        }
    }

    return {
        message: "Success",
        error: false
    }
}
