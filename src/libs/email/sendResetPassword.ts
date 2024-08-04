'use server'

import { emailFrom, transporter } from './values';
import getURL from '../getURL';
import { generatePasswordToken } from '@/yap/db/services/passwordResetTokens';
import getHtmlContentBox from './getHtmlContentBox';

export default async function sendResetPassword(userId: string, email: string, shouldExist: boolean) {
    const token = await generatePasswordToken(userId, shouldExist);

    const emailData = {
        from: emailFrom,
        to: email,
        subject: 'Reset your password',
        html: getHtmlContentBox("Password reset",
            "Click the link below to restart your password. If you didn't make this request, please ignore this email",
            "Reset your password",
            getURL(`/auth/reset/password/${token.id}/${token.token}`)),
    };

    try {
        await transporter.sendMail(emailData);
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error
    }
}