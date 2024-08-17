import { getPostById } from "@/yap/db/services/posts";
import createResponse from "./createResponse";

export default async function checkPostExistence(postId: string | undefined) {
    if (!postId || !(await getPostById(postId)))
        return {
            postId: null,
            postNotFound: createResponse({
                message: "Post with specified id does't exist",
                status: 404,
            }),
        };
    return { postId, postNotFound: null };
}