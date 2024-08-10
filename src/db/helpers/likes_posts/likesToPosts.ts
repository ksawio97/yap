import { getPostLikesInfo, getMultiplePostsLikesInfo } from '../../services/likes';
import PostDetailedModel from '../../models/PostDetailedModel';

interface Post {
    id: string;
    [key: string]: any; // Allows for additional properties
}

export async function attachLikesInfoToPost(post: Post, userId?: string) {
    const likesInfo = await getPostLikesInfo(post.id, userId);

    return {
        ...post,
        likes: likesInfo
    }
}

export async function attachLikesInfoToPosts(posts: Post[], userId?: string) {
    if (posts.length === 0)
        return [];
    const likesCount = await getMultiplePostsLikesInfo(posts.map(p => p.id), userId);

    return posts.map((post) => {
       return {
        ...post,
        likes: likesCount.get(post.id) || { count: '0', liked: false}
       }
    })
}

export async function attachLikesToPostDetailedModel(post: PostDetailedModel, userId?: string) {
    const [postWithLikes, repliesWithLikes] = await Promise.all([attachLikesInfoToPost(post, userId), attachLikesInfoToPosts(post.replies, userId)]);

    return {
        ...postWithLikes,
        replies: repliesWithLikes
    }
}