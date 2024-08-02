'use server'

import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as the email service
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER, // Your Gmail email address
        clientId: process.env.MAIL_CLIENT_ID, // OAuth 2.0 client ID
        clientSecret: process.env.MAIL_CLIENT_SECRET, // OAuth 2.0 client secret
        refreshToken: process.env.MAIL_REFRESH_TOKEN, // OAuth 2.0 refresh token
    }
});

export const emailFrom = '"Yap" <ksawerykuczynskikk@gmail.com>';