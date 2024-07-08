'use server'

import { signIn } from "@/yap/auth/auth";
import UserModel from "@/yap/db/models/UserModel";
import { createUser, getUserByEmail, getUserByName } from "@/yap/db/services/users";
import { z } from 'zod';
import { AuthError } from "next-auth";

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
    errors: {
        name?: string[],
        email?: string[],
        password?: string[],
        _form?: string[],
    }
}

const singUpScheme = z.object({
    name: z.string().min(5).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50)
});

export async function singUp(prevState: SingUpState | undefined, formData: FormData): Promise<SingUpState> {
    const result = singUpScheme.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
      }

    const [isEmailNew, isNameNew] = (await Promise.all([getUserByEmail(result.data.email), getUserByName(result.data.name)])).map(user => user === null);
    
    if (!isEmailNew || !isNameNew) {
        const errors: SingUpState = {errors: {}};
        if (!isEmailNew)
            errors.errors.email = ['Email already exists'];
        if (!isNameNew)
            errors.errors.name = ['Name already exists'];
        return errors;
    }

    let user: UserModel
    try {
        user = await createUser(result.data.email, result.data.password, result.data.name)
    } catch (error) {
        if (error instanceof Error) {
            return {
              errors: {
                _form: [error.message],
              },
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    return {
        errors: {}
    }
}