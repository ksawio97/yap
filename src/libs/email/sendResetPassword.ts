'use server'

import { emailFrom, transporter } from './values';
import getURL from '../getURL';
import { generatePasswordToken } from '@/yap/db/services/passwordResetTokens';

export default async function sendResetPassword(userId: string, email: string, shouldExist: boolean) {
    const token = await generatePasswordToken(userId, shouldExist);

    const emailData = {
        from: emailFrom,
        to: email,
        subject: 'Reset your password',
        html: `
        <h1>Click the link below to verify your email:</h1>
        <p>Click the link below to restart your password. If you didn't make this request, please ignore this email.</p>
        <a href="${getURL(`/api/email/verify?email=${email}&token=${token}`)}">Reset your password</a>
        `,
    };

    try {
        await transporter.sendMail(emailData);
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error
    }
}