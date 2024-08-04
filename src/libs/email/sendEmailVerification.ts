'use server'

import getURL from '@/yap/libs/getURL';
import { verification } from '@/yap/db/services/users';
import { emailFrom, transporter } from './values';
import getHtmlContentBox from './getHtmlContentBox';

export default async function sendEmailVerification(email: string) {
    const token = await verification.generateEmailToken(email);

    const emailData = {
        from: emailFrom,
        to: email,
        subject: 'Email Verification',
        html: getHtmlContentBox("Email verification",
            "Click the link below to verify your email. If you didn't make this request, please ignore this email.",
            "Verify Email",
            getURL(`/api/email/verify?email=${email}&token=${token}`))
    };
    try {
        await transporter.sendMail(emailData);
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error
    }
};