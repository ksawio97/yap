'use server'

import getUserPostTimeoutLeft, { timeoutToText } from "@/yap/db/helpers/posts/getUserPostTimeoutLeft"
import { reformPostContent } from "@/yap/db/helpers/posts/reform"
import { createPost } from "@/yap/db/services/posts"
import { getCookiesJwtToken } from "@/yap/libs/auth/getJwtToken"

export type PostCreateState = {
    message: string | null,
    error: boolean
}

export default async function create(prevState: PostCreateState | undefined, formData: FormData): Promise<PostCreateState> {
    const session = await getCookiesJwtToken();
    if (!session || !session.id)
        return {
            message: "You need to sign in",
            error: true,
        }
    const userId = session.id;
    
    // check if user can post or has timeout
    const timeoutLeft = await getUserPostTimeoutLeft(userId);
    if (timeoutLeft !== 0)
        return {
            message: `Please wait ${timeoutToText(timeoutLeft)} before posting again`,
            error: true
        }

    const content = formData.get('content');
    if (!content)
        return {
            message: 'Post content can\'t be empty',
            error: true
        }

    const reformedContent = reformPostContent(content.toString());
    const parentId = formData.get('parentId')?.toString();
    await createPost(userId, reformedContent, parentId);
    return {
        message: 'Success',
        error: false
    }
}