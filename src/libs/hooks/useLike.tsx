'use client'

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

// Define the shape of the context
interface LikeQueueContextType {
  likeQueue: Record<string, { liked: boolean }>;
  updateLike: (postId: string, liked: boolean) => void;
}

// Default context values
const defaultLikeQueueContextValue: LikeQueueContextType = {
  likeQueue: {},
  updateLike: () => {},
};

// Create the context
const LikeQueueContext = createContext<LikeQueueContextType>(
  defaultLikeQueueContextValue
);

// Create the provider component
export function LikeQueueProvider({ children }: { children: ReactNode }) {
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
    if (!likePostsIds.length || !dislikePostsIds.length)
      return;

    // TODO fetch request to bulk update likes count
    fetch(`/api/posts/like/change`, {
      method: "POST",
      body: JSON.stringify({ likePostsIds, dislikePostsIds }),
    }).then((response) => console.log(response));
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
      processLikes(likeQueue);
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

  // Context value
  const contextValue: LikeQueueContextType = {
    likeQueue,
    updateLike,
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