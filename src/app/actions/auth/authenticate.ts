'use server'

import { signIn } from "@/yap/auth/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export type AuthenticateState = {
    message: string | null,
    error: boolean
}
const defaultErrMessage = 'Something went wrong.';

function getErrorMessage(error: Error | undefined): string {
    if (!error)
        return defaultErrMessage;

    if (error instanceof CredentialsSignin)
        return error.message;

    // not every error message should be displayed
    return defaultErrMessage;
}

export default async function authenticate(prevState: AuthenticateState | undefined, formData: FormData): Promise<AuthenticateState> {
    try {
        const [email, password, csrfToken] = [formData.get('email'), formData.get('password'), formData.get('csrfToken')];
        // sign in
        await signIn('credentials', {
            email: email,
            password: password,
            csrfToken: csrfToken,
            redirect: false
        });
    } catch (error) {
        // Extract the nested error
        let nestedError = undefined;
        if (error && typeof error === 'object' && 'cause' in error && error.cause && typeof error.cause === 'object' && 'err' in error.cause && error.cause.err) {
          nestedError = error.cause.err;
        }

        return {
            message: getErrorMessage(nestedError as Error),
            error: true
        }
    }

    redirect('/?refresh=1');
}
