import { NextRequest, NextResponse } from 'next/server';
import { getParentPosts } from '@/yap/db/services/posts'
import { attachLikesInfoToPosts } from '@/yap/db/helpers/likes_posts/likesToPosts';
import getUserIdFromSession from '@/yap/libs/api/getUserIdFromSession';

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromSession(req);
  const posts = await getParentPosts(); // Adjust accordingly
  const postsWithLikeInfo = await attachLikesInfoToPosts(posts, userId || undefined);
  return NextResponse.json(postsWithLikeInfo);
}