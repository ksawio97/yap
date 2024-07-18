'use server'

import nodemailer from 'nodemailer'
import getURL from '@/yap/libs/getURL';
import { generateEmailVerificationToken } from '@/yap/db/services/users';

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as the email service
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER, // Your Gmail email address
        clientId: process.env.MAIL_CLIENT_ID, // OAuth 2.0 client ID
        clientSecret: process.env.MAIL_CLIENT_SECRET, // OAuth 2.0 client secret
        refreshToken: process.env.MAIL_REFRESH_TOKEN, // OAuth 2.0 refresh token
    }
});

export async function sendVerificationEmail(email: string) {
    const token = await generateEmailVerificationToken(email);

    const emailData = {
        from: '"Yap" <ksawerykuczynskikk@gmail.com>',
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