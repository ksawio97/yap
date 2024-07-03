import { NextResponse } from 'next/server';
import { getParentPosts } from '@/yap/db/services/posts'

export async function GET() {
  const posts = await getParentPosts(); // Adjust accordingly
  return NextResponse.json(posts);
}