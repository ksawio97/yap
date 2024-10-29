import prisma from '@/yap/db/client';
import PostDetailedModel from '../models/PostDetailedModel';
import { Prisma } from '@prisma/client';
import { getLastPostPublishDate, setLastPostPublishDate } from '../redis/user_post';

export async function getPosts({ lastPostId, parentId = null, limit = 20 }: { lastPostId?: string | undefined, parentId?: string | null, limit?: number}) {
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
      AND: [
        { id: { lt: lastPostId } }, // Fetch posts greater than the last post
        { parentId: parentId }
      ]
    },
    orderBy: {
      published: 'desc'
    }
  });

  return posts;
}

export async function getPostById(postId: string, repliesLimit: number = 20) {
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
          },
          orderBy: {
            published: 'desc'
          },
          take: repliesLimit
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

export async function getPostsByUserId(userId: string, lastPostId?: string | undefined, limit: number = 20) {
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
      AND: [
        { id: { lt: lastPostId } }, // Fetch posts greater than the last post
        { authorId: userId }
      ]
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

export async function createPost(userId: string, content: string, parentId: string | null = null) {
  const post = await prisma.post.create({
    data: {
      content: content,
      authorId: userId,
      parentId: parentId
    }
  });

  await setLastPostPublishDate(post);
}

export async function deletePostByUser(postId: string, userId: string) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
        authorId: userId
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025' || e.code === 'P2016') {
        return { error: 'Post not found with specified id and authorId' };
      }
    }
    return { error: 'Post deletion failed' };
  }
    return { };
}

export async function getLastUserPostPublishDate(userId: string) {
  const published = await getLastPostPublishDate(userId);
  if (published)
    return new Date(published);
  return null;
}