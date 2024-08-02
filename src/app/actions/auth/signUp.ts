'use server'

import { createUser, getUserByEmail, getUserByName } from "@/yap/db/services/users";
import { emailValidator, nameValidator, passwordValidator } from "@/yap/libs/validators";
import { User } from "@prisma/client";
import { z } from 'zod';

export type SingUpState = {
    errors: {
        name?: string[],
        email?: string[],
        password?: string[],
        _form?: string[],
    }
    // if success return email of created user (for url redirection)
    email?: string 
}

const singUpScheme = z.object({
    name: nameValidator,
    email: emailValidator,
    password: passwordValidator
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

    let user: User
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
        errors: {},
        email: result.data.email
    }
}