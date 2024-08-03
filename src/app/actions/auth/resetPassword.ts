'use server'

import { getPasswordResetTokenByUserId } from '@/yap/db/services/passwordResetTokens';
import { getUserByEmail } from '@/yap/db/services/users';
import sendResetPassword from '@/yap/libs/email/sendResetPassword';
import { emailValidator } from '@/yap/libs/validators';

export type ResetPasswordState = {
    message: string | null,
    error: boolean
}


export default async function resetPassword(prevState: ResetPasswordState | undefined, formData: FormData): Promise<ResetPasswordState> {    
    const email = formData.get('email');
    if (!email || typeof email !== 'string') {
        return {
            message: "Email isn't valid",
            error: true,
        }
    }
    const validator = emailValidator.safeParse(email);
    if (!validator.success) {
        return {
            message: validator.error.message,
            error: true,
        }
    }

    const user = await getUserByEmail(email);
    if (!user) {
        return {
            message: "User with this email doesn't exist",
            error: true
        };
    }
    const token = await getPasswordResetTokenByUserId(user.id);
    if (token && token.expirationDate && token.expirationDate.getTime() >= Date.now()) {
        return {
            message: "Still valid token should be in your inbox",
            error: true
        }
    }

    

    try {
        await sendResetPassword(user.id, email, token !== null);
    } catch (error) {
        console.error(error);
        return {
            message: "Failed to send email",
            error: true,
        }
    }

    return {
        message: "Success",
        error: false,
    }
}