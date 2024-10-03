'use client'

import ProfileContent from "@/yap/components/Profile/ProfileContent";
import useSessionState from "@/yap/libs/hooks/useSessionState";
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState<UserPublicModel>();

    const { session } = useSessionState((prev, curr) => prev?.user?.id !== curr?.user?.id);
    
    useEffect(() => {
        if (!session)
        {
          setUser(undefined);
          return;
        }
        fetch(`api/user/${session?.user!.id}`)
          .then(value => { value.json().then(data => setUser(data))});
    }, [session]);

    return (
      <ProfileContent user={user}></ProfileContent>
    )
}