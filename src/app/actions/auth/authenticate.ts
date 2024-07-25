'use server'

import { signIn } from "@/yap/auth/auth";
import { CredentialsSignin } from "next-auth";

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
        // TODO verify email
        // sign in
        await signIn('credentials', formData);
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

    // it won't come to that bcs middleware immediately blocks signin page after signin
    return {
        message: "Success",
        error: false
    }
}
