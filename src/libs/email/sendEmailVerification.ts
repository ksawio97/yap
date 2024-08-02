'use server'

import getURL from '@/yap/libs/getURL';
import { verification } from '@/yap/db/services/users';
import { emailFrom, transporter } from './values';

export default async function sendEmailVerification(email: string) {
    const token = await verification.generateEmailToken(email);

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
};