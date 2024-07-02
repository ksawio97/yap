import prisma from '@/yap/db/client';
import PostModel from '../models/PostModel';

export async function getPosts(limit: number = 50) {
    const posts = await prisma.post.findMany({
        take: limit,
        include: {
          author: {
            select: { name: true },
          },
        },
        orderBy: {
            published: 'desc'
        }
      });
    return posts as PostModel[];
}

export async function getPostById(postId: string) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        include: {
          author: {
            select: { name: true },
          }
        }
    })

    return post as PostModel;
}