'use client'

import Loading from "@/yap/components/Loading";
import PostList from "@/yap/components/Post/PostList";
import ProfilePicture from "@/yap/components/Profile/ProfilePicture";
import ContentAsPageWrapper from "@/yap/components/Wrappers/ContentAsPageWrapper";
import PostModel from "@/yap/db/models/PostModel";
import useSessionState from "@/yap/libs/hooks/useSessionState";
import { useCallback, useEffect, useState } from "react";


const getPostsCountText = (postCount: number) => {
  return `${postCount} ${postCount === 1 ? "post" : "posts"}`;
}

export default function Profile() {
    const [user, setUser] = useState<UserPublicModel>();

    const { session } = useSessionState((prev, curr) => prev?.user?.id !== curr?.user?.id);
    
    useEffect(() => {
        fetch(`api/user/${session?.user!.id}`)
          .then(value => { value.json().then(data => setUser(data))});
    }, [session]);

    const getPosts = useCallback(async (lastPostId?: string | undefined) => {
      return fetch(`/api/posts/user/${session?.user!.id}?lastPostId=${lastPostId}`)
        .then(
          (value) => value.json(), 
          (rejection) => { console.error(rejection); return []})
        .then((value) => {
            const posts = value as PostModel[];
            return posts;
        })
        .catch((rejected) => { console.error(rejected); return [];});
    }, [session?.user]);

    return (
      <ContentAsPageWrapper>
        <div className="flex flex-row gap-10">
          <div className="w-fit h-fit shrink-0 grow-0">
            <ProfilePicture sizeMultiplier={2}></ProfilePicture>
          </div>
          <div className="flex flex-col">
            <div className="font-light text-gray-400 flex flex-row gap-2 items-center">
              <h3 className="text-white font-bold md:text-3xl text-2xl">{session && session.user ? session?.user?.name : 'You need to sign in'}</h3>
              <p className="text-center">{getPostsCountText(user?.postCount || 0)}</p>
            </div>
            <p>{user?.bio}</p>
          </div>
        </div>
        <PostList getPosts={getPosts}></PostList>
      </ContentAsPageWrapper>
    );
}