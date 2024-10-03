'use client'

import ProfileContent from "@/yap/components/Profile/ProfileContent";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile() {
    const [user, setUser] = useState<UserPublicModel>();
    const { userId } = useParams();

    useEffect(() => {
        fetch(`/api/user/${userId}`)
          .then(value => { value.json().then(data => setUser(data))});
    }, [userId]);

    return (
        <ProfileContent user={user}></ProfileContent>
    );
}