import { randomBytes } from 'crypto';
import prisma from  '../client';
import UserModel from '../models/UserModel';
var bcrypt = require('bcryptjs');

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: { email: email }
    })
    return user as UserModel | null;
}

export async function createUser(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            name: name
        }
    })
    return newUser as Promise<UserModel>;
}

export async function getUserByName(name: string) {
    const user = await prisma.user.findUnique({
        where: { name: name }
    })
    return user as UserModel | null;
}

export async function getUserToken(email: string) {
    const user = await prisma.user.findUnique({
        where: { email: email }
    });
    if (!user)
        return null;
    return user.emailVerifToken;
}

export async function generateEmailVerificationToken(email: string) {
    const token = randomBytes(32).toString('hex');
    await prisma.user.update({
        where: { email: email },
        data: {
            emailVerifToken: token
        }
    });

    return token;
}

export async function setUserEmailVerified(email: string) {
    await prisma.user.update({
        where: { email: email },
        data: {
            emailVerified: new Date(),
            emailVerifToken: null,
        }
    });
}