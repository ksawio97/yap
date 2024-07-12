'use server'

import UserModel from "@/yap/db/models/UserModel";
import { createUser, getUserByEmail, getUserByName } from "@/yap/db/services/users";
import { z } from 'zod';
import { sendVerificationEmail } from "./email";

export type SingUpState = {
    errors: {
        name?: string[],
        email?: string[],
        password?: string[],
        _form?: string[],
    }
}

const singUpScheme = z.object({
    name: z.string().min(5).max(26),
    email: z.string().email(),
    password: z.string().min(8).max(26)
});

export default async function singUp(prevState: SingUpState | undefined, formData: FormData): Promise<SingUpState> {
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
    // send email verification email
    await sendVerificationEmail(user.email!!);
    return {
        errors: {}
    }
}