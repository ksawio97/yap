'use client'

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import ChangeManager from "../ChangeManager";

// Define the shape of the context
interface LikeQueueContextType {
  likeQueue: Record<string, { liked: boolean }>;
  updateLike: (postId: string, liked: boolean) => void;
  onLikeCountChange: (postId: string, onChange: (postId: string) => void) => () => boolean;
}

// Default context values
const defaultLikeQueueContextValue: LikeQueueContextType = {
  likeQueue: {},
  updateLike: () => {},
  onLikeCountChange: () => () => false,
};

// Create the context
const LikeQueueContext = createContext<LikeQueueContextType>(
  defaultLikeQueueContextValue
);

// Create the provider component
export function LikeQueueProvider({ children }: { children: ReactNode }) {
  const likeCountChangedManager = new ChangeManager<string, string>();
  const [likeQueue, setLikeQueue] = useState<
    Record<string, { liked: boolean }>
  >({});

  const processLikes = async (likes: Record<string, { liked: boolean }>) => {
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
      return;

    // TODO fetch request to bulk update likes count
    fetch(`/api/posts/like/change`, {
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

  useEffect(() => {
    const interval = setInterval(() => {
      processLikes({ ...likeQueue });
      setLikeQueue({});
    }, 1000 * 30 /* 30s */);

    return () => clearInterval(interval);
  }, [likeQueue]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      processLikes({ ...likeQueue });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [likeQueue]);

  // Function to update the like state
  const updateLike = (postId: string, liked: boolean) => {
    setLikeQueue((prevQueue) => ({
      ...prevQueue,
      [postId]: { liked },
    }));
  };

  const onLikeCountChange = (postId: string, onChange: (likes: string) => void) => {
    return likeCountChangedManager.subscribe(postId, onChange);
  };

  // Context value
  const contextValue: LikeQueueContextType = {
    likeQueue,
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