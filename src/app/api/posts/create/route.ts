import getUserPostTimeoutLeft, { timeoutToText } from "@/yap/db/helpers/posts/getUserPostTimeoutLeft";
import { reformPostContent } from "@/yap/db/helpers/posts/reform";
import { createPost } from "@/yap/db/services/posts";
import createResponse from "@/yap/libs/api/createResponse";
import { checkUserExistence } from "@/yap/libs/api/getUserIdFromSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const { userId, userNotFound } = await checkUserExistence(req);
    if (userNotFound)
        return userNotFound;
    // check if user can post or has timeout
    const timeoutLeft = await getUserPostTimeoutLeft(userId);
    if (timeoutLeft !== 0)
        return createResponse({ 
            message: `Please wait ${timeoutToText(timeoutLeft)} before posting again`,
            status: 429
    });

    const { content } = await req.json();
    const reformedContent = reformPostContent(content);

    await createPost(userId, reformedContent);
    return createResponse({
        message: 'Success',
        status: 200
    })
}