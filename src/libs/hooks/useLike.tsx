'use client'

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import ChangeManager from "../ChangeManager";
import useDynamicInterval from "./useDynamicInterval";

// Define the shape of the context
interface LikeQueueContextType {
  updateLike: (postId: string, liked: boolean) => void;
  onLikeCountChange: (postId: string, onChange: (postId: string) => void) => () => boolean;
}

// Default context values
const defaultLikeQueueContextValue: LikeQueueContextType = {
  updateLike: () => {},
  onLikeCountChange: () => () => false,
};

// Create the context
const LikeQueueContext = createContext<LikeQueueContextType>(
  defaultLikeQueueContextValue
);

function getChangeApiRequestParams(likes: Record<string, { liked: boolean }>) {
  // assign which one should be liked or disliked
  const likePostsIds: string[] = [];
  const dislikePostsIds: string[] = [];

  Object.entries(likes).forEach(([k, v]) => {
    if (v.liked) {
      likePostsIds.push(k);
    } else {
      dislikePostsIds.push(k);
    }
  });
  // no changes, no need for fetch request
  if (!likePostsIds.length && !dislikePostsIds.length)
    return null;
  return { likePostsIds, dislikePostsIds };
}

// Create the provider component
export function LikeQueueProvider({ children }: { children: ReactNode }) {
  const likeCountChangedManager = useMemo(() => new ChangeManager<string, string>(), []);
  const likeQueue = useRef<
    Record<string, { liked: boolean }>
  >({});

  const processLikes = async (likes: Record<string, { liked: boolean }>) => {
    const params = getChangeApiRequestParams(likes);
    if (!params)
      return;
    const { likePostsIds, dislikePostsIds } = params;


    await fetch(`/api/posts/like/change`, {
      method: "POST",
      body: JSON.stringify({ likePostsIds, dislikePostsIds }),
    }).then((response) => {
      if (response.ok)
        return response.json();
      return null;
    }).then((data) => {
      if (!data)
        return;

      const [likes, dislikes] = [data.likes as [string, string][], data.dislikes as [string, string][]];

      likeCountChangedManager.changed([...likes, ...dislikes]);
    });
  };

  useDynamicInterval(() => {
    processLikes({ ...likeQueue.current });
    likeQueue.current = {};
  }, 1000 * 30 /* 30s */);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const params = getChangeApiRequestParams(likeQueue.current);
      if (!params)
        return;
      // safer than fetch for beforeUnload
      navigator.sendBeacon('/api/posts/like/change', JSON.stringify(params));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [likeQueue]);

  // Function to update the like state
  const updateLike = (postId: string, liked: boolean) => {
    likeQueue.current = {
      ...likeQueue.current,
      [postId]: { liked },
    }
  };

  const onLikeCountChange = (postId: string, onChange: (likes: string) => void) => {
    return likeCountChangedManager.subscribe(postId, onChange);
  };

  // Context value
  const contextValue: LikeQueueContextType = {
    updateLike,
    onLikeCountChange,
  };

  return (
    <LikeQueueContext.Provider value={contextValue}>
      {children}
    </LikeQueueContext.Provider>
  );
}

// Custom hook to use the LikeQueueContext
export function useLikeQueue() {
  return useContext(LikeQueueContext);
}