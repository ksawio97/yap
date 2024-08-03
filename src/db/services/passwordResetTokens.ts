import { PasswordResetToken } from "@prisma/client";
import { randomBytes } from "crypto";

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