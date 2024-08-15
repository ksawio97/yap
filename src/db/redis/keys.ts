export function getLikeCountKey(postId: string) {
    return `post:${postId}:like_count`;
}

export function getWhatLikedKey(userId: string) {
    return `user:${userId}:liked`;
}