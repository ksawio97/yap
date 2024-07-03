import prisma from '@/yap/db/client';
import PostModel from '../models/PostModel';
import PostDetailedModel from '../models/PostDetailedModel';
import { Prisma } from '@prisma/client';

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
      
    return posts as PostModel[];
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
            select: { id: true, authorId: true,
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
      }
      console.log('server error ' + e)
      return null
    }
    

    return post as PostDetailedModel;
}