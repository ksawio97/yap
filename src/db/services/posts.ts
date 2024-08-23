import prisma from '@/yap/db/client';
import PostDetailedModel from '../models/PostDetailedModel';
import { Prisma } from '@prisma/client';
import { getLastPostPublishDate, setLastPostPublishDate } from '../redis/user_post';

export async function getParentPosts(limit: number = 50) {
  const posts = await prisma.post.findMany({
    take: limit,
    include: {
      author: {
        select: { name: true },
      },
      _count: {
        select: {
          replies: true,
        }
      }
    },
    where: {
      parentId: null,
    },
    orderBy: {
      published: 'desc'
    }
  });

  return posts;
}

export async function getPostById(postId: string) {
  let post;
  try {
    post = await prisma.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
      include: {
        author: {
          select: { name: true },
        },

        _count: {
          select: {
            replies: true,
          }
        },
        // parent post: id, parent author: id and name
        parent: {
          select: {
            id: true, authorId: true,
            author: {
              select: {
                name: true
              }
            }
          }
        },

        replies: {
          include: {
            author: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      console.log('Post not found');
    } else {
      console.log(e);
    }
    return null
  }


  return post as PostDetailedModel;
}

export async function getPostsByUserId(userId: string, limit: number = 50) {
  const posts = await prisma.post.findMany({
    take: limit,
    include: {
      author: {
        select: { name: true },
      },
      _count: {
        select: {
          replies: true,
        }
      }
    },
    where: {
      authorId: userId
    },
    orderBy: {
      published: 'desc'
    }
  });

  return posts;
}

export async function getPostsByIds(postsIds: string[]) {
  const posts = await prisma.post.findMany({
    where: {
      id: {
        in: postsIds,
      }
    }
  });

  return posts;
}

export async function createPost(userId: string, content: string) {
  const post = await prisma.post.create({
    data: {
      content: content,
      authorId: userId,
    }
  });

  await setLastPostPublishDate(post);
}

export async function getLastUserPostPublishDate(userId: string) {
  const published = await getLastPostPublishDate(userId);
  if (published)
    return new Date(published);
  return null;
}