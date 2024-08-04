'use server'

import { tryChangePassword } from "@/yap/db/services/passwordResetTokens";
import { passwordValidator } from "@/yap/libs/validators";
import { z } from "zod"

export type ChangePasswordState = {
    errors: {
        password?: string[],
        confirmPassword?: string[],
        _form?: string[],
    }
    success: boolean,
}

const changePasswordScheme = z.object({
    password: passwordValidator,
    confirmPassword: passwordValidator
}).refine(schema => schema.password === schema.confirmPassword, 
    {
        message: 'Passwords don\'t match',
        path:   ['confirmPassword']
    }
);

export default async function changePassword(prevState: ChangePasswordState | undefined, formData: FormData): Promise<ChangePasswordState> {
    const result = changePasswordScheme.safeParse({
        password: formData.get('password'),
        confirmPassword: formData.get('confirm-password'),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
            success: false
        };
    }
    const [tokenId, token] = [formData.get('tokenId'), formData.get('token')];
    // tokenId or token not defined or changing password not successful
    if (!tokenId || !token || !(await tryChangePassword(tokenId.toString(), token.toString(), result.data.password))) {
        return {
            errors: {
                _form: ["Something went wrong"],
            },
            success: false
        }
    }
    return {
        errors: {},
        success: true
    }
}