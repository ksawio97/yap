import { PasswordResetToken } from "@prisma/client";
import { randomBytes } from "crypto";
var bcrypt = require('bcryptjs');

export async function getPasswordResetTokenByUserId(userId: string) {
    const token = await prisma.passwordResetToken.findUnique({
        where: {
            userId: userId,
        }
    });

    return token as PasswordResetToken | null;
}

export async function getPasswordTokenWithUsernameById(id: string) {
    const token = await prisma.passwordResetToken.findUnique({
        where: {
            id: id
        },
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    });

    return token;
}

const weekMs = 1000 * 60 * 60 * 24 * 7;

export async function generatePasswordToken(userId: string, shouldExist: boolean) {
    const token = randomBytes(32).toString('hex');
    const baseData = {
        token: token,
        expirationDate: new Date(Date.now() + weekMs)
    };

    const passwordToken = await (async () => {
        if (shouldExist) {
            return await prisma.passwordResetToken.update({
                where: { userId: userId },
                data: baseData
            });
        } else {
            return await prisma.passwordResetToken.create({
                data: {
                    ...baseData,
                    userId: userId
                }
            });
        }
    })();


    return passwordToken;
}

export async function tryChangePassword(id: string, token: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await prisma.passwordResetToken.findUnique({
        where: {
            id: id,
            token: token
        }
    })

    if (!result)
        return false;
    try {
        await prisma.user.update({
            where: {
                id: result.userId,
            },
            data: {
                password: hashedPassword
            }
        });
    } catch(error) {
        // it shouldn't come to this
        if (error instanceof Error && 'code' in error && error.code === 'P2025') {
            console.error(`User with id: ${result.userId} not found, when updating password`);
        }
        return false;
    }

    // token was used, it's no longer needed
    await prisma.passwordResetToken.update({
        where: {
            id: id,
        },
        data: {
            token: null,
        }
    });

    return true;
}