import { emailValidator } from '@/yap/libs/validators';

export type ResetPasswordState = {
    message: string | null,
    error: boolean
}


export default async function resetPassword(prevState: ResetPasswordState | undefined, formData: FormData): Promise<ResetPasswordState> {
    const email = formData.get('email');
    if (!email) {
        return {
            message: "Email not set",
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
    console.log('resetPassword');
    return {
        message: "Success",
        error: false
    }
}