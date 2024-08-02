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

const weekMs = 1000 * 60 * 60 * 24 * 7;

export async function generatePasswordToken(userId: string, shouldExist: boolean) {
    const token = randomBytes(32).toString('hex');
    const baseData = {
        token: token,
        expirationDate: new Date(Date.now() + weekMs)
    };
   
    if (shouldExist) {
        await prisma.passwordResetToken.update({
            where: { userId: userId },
            data: baseData
        });
    } else {
        await prisma.passwordResetToken.create({
            data: {
                ...baseData,
                userId: userId
            }
        });
    }


    return token;
}