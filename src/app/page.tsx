'use client'

import PostForm from "@/yap/components/Post/PostForm";
import ProfilePicture from "@/yap/components/Profile/ProfilePicture";
import PostList from "@/yap/components/Post/PostList";
import { useEffect, useState } from "react";
import PostModel from "../db/models/PostModel";
import Loading from "../components/Loading";

export default function Home() {
  const [posts, setPosts] = useState<PostModel[] | undefined>();
  useEffect(() => {
    (async () => {
      fetch('api/posts')
        .then(
          (value) => value.json(), 
          (rejection) => console.error(rejection))
        .then((value) => {
            const posts = value as PostModel[];
            if (posts.length > 0)
              setPosts(posts);
        })
        .catch((rejected) => console.error(rejected));
    })()
  }, [])

  return (
      <main className="w-full md:w-2/3 xl:w-1/2 justify-self-center h-full divide-y divide-white">
        <div className="w-full flex flex-row">
          <div className="px-4">
            <ProfilePicture></ProfilePicture>
          </div>
          <PostForm></PostForm>
        </div>
        { !posts ? <Loading/> :
          <PostList posts={posts}></PostList>
        }
        
      </main>
  );
}