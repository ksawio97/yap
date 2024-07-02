import { NextResponse } from 'next/server';
import { getPosts } from '@/yap/db/services/posts'

export async function GET() {
  const posts = await getPosts(); // Adjust accordingly
  return NextResponse.json(posts);
}