'use server'

import { signIn } from "@/yap/auth/auth";
import UserModel from "@/yap/db/models/UserModel";
import { createUser, getUserByEmail } from "@/yap/db/services/users";
import { AuthError } from "next-auth";
import { getCsrfToken } from "next-auth/react";

export type AuthenticateState = {
    message: string | null,
    error: boolean
}

function getErrorMessage(error: AuthError): string {
    switch (error.type) {
        case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
    }
}

export async function authenticate(prevState: AuthenticateState | undefined, formData: FormData): Promise<AuthenticateState> {
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
        message: "Sucess",
        error: false
    }
}

export type SingUpState = {
    message: string | null,
    error: boolean
}

export async function singUp(prevState: SingUpState | undefined, formData: FormData): Promise<SingUpState> {
    const [email, password] = [formData.get('email'), formData.get('password')];
    if (email === null || password === null)
        return {
            message: 'Make sure to provide email and password.',
            error: true
        };
    const isEmailNew = await getUserByEmail(email.toString()) === null;

    if (!isEmailNew)
        return {
            message: 'Account with this email already exists.',
            error: true
        };

    let user: UserModel
    try {
        user = await createUser(email.toString(), password.toString())
    } catch (error) {
        return {
            message: 'Something went wrong.',
            error: true
        }
    }

    return {
        message: "Sucess",
        error: false
    }
}