'use client'

import PostForm from "@/yap/components/Post/PostForm";
import ProfilePicture from "@/yap/components/Profile/ProfilePicture";
import PostList from "@/yap/components/Post/PostList";
import { useCallback, useEffect, useState } from "react";
import PostModel from "../db/models/PostModel";
import Loading from "../components/Loading";
import ContentAsPageWrapper from "../components/Wrappers/ContentAsPageWrapper";

export default function Home() {
  const [posts, setPosts] = useState<PostModel[] | undefined>();

  const getPosts = useCallback((async () => {
    fetch('/api/posts')
      .then(
        (value) => value.json(), 
        (rejection) => setPosts([]))
      .then((value) => {
          const posts = value as PostModel[];
          setPosts(posts);
      })
      .catch((rejected) => setPosts([]));
  }), []);

  useEffect(() => {
    getPosts();
  }, [getPosts])

  return (
      <ContentAsPageWrapper>
        <main className="divide-y divide-white">
          <div className="w-full flex flex-row">
            <div className="px-4">
              <ProfilePicture sizeMultiplier={1}></ProfilePicture>
            </div>
            <PostForm onPostCreated={getPosts}></PostForm>
          </div>
          { !posts ? <Loading/> :
            <PostList posts={posts}></PostList>
          }
          
        </main>
      </ContentAsPageWrapper>
  );
}