'use server'

import { verification } from '@/yap/db/services/users';

import { emailFrom, transporter } from './values';
import getURL from '../getURL';

export default async function sendResetPassword(email: string) {
    const token = await verification.generatePasswordToken(email);

    const emailData = {
        from: emailFrom,
        to: email,
        subject: 'Email Verification',
        html: `
        <p>Click the link below to verify your email:</p>
        <a href="${getURL(`/api/email/verify?email=${email}&token=${token}`)}">Verify Email</a>
        `,
    };

    try {
        await transporter.sendMail(emailData);
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error
    }
}