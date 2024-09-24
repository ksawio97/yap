import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/yap/db/services/posts'
import { attachLikesInfoToPosts } from '@/yap/db/helpers/likes_posts/likesToPosts';
import getUserIdFromSession from '@/yap/libs/api/getUserIdFromSession';

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromSession(req);

  const lastPostId = req.nextUrl.searchParams.get('lastPostId');
  const parentId = req.nextUrl.searchParams.get('parentId');

  const posts = await getPosts({ lastPostId: lastPostId || undefined, parentId: parentId }); // Adjust accordingly
  const postsWithLikeInfo = await attachLikesInfoToPosts(posts, userId || undefined);
  return NextResponse.json(postsWithLikeInfo);
}