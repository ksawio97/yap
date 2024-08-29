'use client'

import Loading from "@/yap/components/Loading";
import PostList from "@/yap/components/Post/PostList";
import ProfilePicture from "@/yap/components/Profile/ProfilePicture";
import ContentAsPageWrapper from "@/yap/components/Wrappers/ContentAsPageWrapper";
import PostModel from "@/yap/db/models/PostModel";
import useSessionState from "@/yap/libs/hooks/useSessionState";
import { useEffect, useState } from "react";


const getPostsCountText = (posts: any[] | undefined) => {
  if (!posts || posts.length === 0) 
    return "";
  return `${posts.length} ${posts.length === 1 ? "post" : "posts"}`;
}

export default function Profile() {
    const [bio, setBio] = useState("");
    const [posts, setPosts] = useState<PostModel[] | undefined>();

    const { session } = useSessionState((prev, curr) => prev?.user?.id !== curr?.user?.id);
    
    useEffect(() => {
      const userId = session?.user?.id;
      if (!userId) {
        setPosts([]);
        return;
      }

      fetch(`api/posts/user/${session?.user!.id}`)
        .then(
          (value) => value.json(), 
          (rejection) => console.error(rejection))
        .then((value) => {
            const posts = value as PostModel[];
            setPosts(posts);
        })
        .catch((rejected) => console.error(rejected));

        fetch(`api/user/${session?.user!.id}`)
          .then(value => { value.json().then(data => setBio(data.bio))});
    }, [session]);

    return (
      <ContentAsPageWrapper>
        <div className="flex flex-row gap-10">
          <div className="w-fit h-fit shrink-0 grow-0">
            <ProfilePicture sizeMultiplier={2}></ProfilePicture>
          </div>
          <div className="flex flex-col">
            <div className="font-light text-gray-400 flex flex-row gap-2 items-center">
              <h3 className="text-white font-bold md:text-3xl text-2xl">{session && session.user ? session?.user?.name : 'You need to sign in'}</h3>
              <p className="text-center">{getPostsCountText(posts)}</p>
            </div>
            <p>{bio}</p>
          </div>
        </div>
        { !posts ? <Loading/> :
            <PostList posts={posts}></PostList>
          }
      </ContentAsPageWrapper>
    );
}