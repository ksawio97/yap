'use client'

import PostForm from "@/yap/components/Post/PostForm";
import ProfilePicture from "@/yap/components/Profile/ProfilePicture";
import PostList from "@/yap/components/Post/PostList";
import { Suspense, useCallback, useEffect } from "react";
import PostModel from "../db/models/PostModel";
import ContentAsPageWrapper from "../components/Wrappers/ContentAsPageWrapper";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const getPosts = useCallback((async (lastPostId?: string | undefined) => {
    return fetch(`/api/posts?lastPostId=${lastPostId}`)
      .then(
        (value) => value.json(), 
        (rejection) => [])
      .then((value) => {
          const posts = value as PostModel[];
          return posts;
      })
      .catch((rejected) => []);
  }), []);

  useEffect(() => {
    getPosts();
  }, [getPosts])

  return (
      <ContentAsPageWrapper>
        <Suspense>
          <RefreshHandler></RefreshHandler>
        </Suspense>
        <main className="divide-y divide-white">
          <div className="w-full flex flex-row">
            <div className="px-4">
              <ProfilePicture sizeMultiplier={1}></ProfilePicture>
            </div>
            <PostForm onPostCreated={getPosts}></PostForm>
          </div>
            <PostList getPosts={getPosts}></PostList>
        </main>
      </ContentAsPageWrapper>
  );
}


function RefreshHandler() {
  // it's used for page refresh by sign in reroute
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('refresh') === '1') {
      window.location.replace('/');
    }
  }, [searchParams]);

  return null;
}