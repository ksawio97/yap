import convertToUserPublicModel from '@/yap/db/helpers/users/convertToUserPublicModel';
import { getUserById } from '@/yap/db/services/users';
import createResponse from '@/yap/libs/api/createResponse';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.toString().split('/').pop();

    if (!userId)
        return createResponse({
            message: 'userId path parameter not defined',
            status: 400
        });

    const user = await getUserById(userId);
    if (!user)
        return createResponse({
            message: 'User not found',
            status: 404
        });

    return createResponse({
        message: 'Success',
        status: 200,
        data: convertToUserPublicModel(user)
    })
}