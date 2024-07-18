export type ResetPasswordState = {
    message: string | null,
    error: boolean
}

export default async function resetPassword(prevState: ResetPasswordState | undefined, formData: FormData): Promise<ResetPasswordState> {
    // TODO implement it
    console.log('resetPassword');
    return {
        message: "Success",
        error: false
    }
}