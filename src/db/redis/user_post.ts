import { Post } from "@prisma/client";
import { redis } from "./client";

function getLastPostKey(userId: string) {
    return `user:${userId}:last_post_publish_date`;
}

export async function setLastPostPublishDate(post: Post) {
    const key = getLastPostKey(post.authorId);
    await redis.set(key, post.published.toISOString());
}

export async function getLastPostPublishDate(userId: string) {
    const key = getLastPostKey(userId);
    return await redis.get(key);
}