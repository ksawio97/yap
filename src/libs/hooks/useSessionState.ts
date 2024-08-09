import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function useSessionState(
    trigger: (prevSession: Session | null | undefined, session: Session | null) => boolean,
) {
    const { data: sessionData, status} = useSession();

    const prevSession = useRef<Session | null | undefined>(sessionData);
    const [session, setSession] = useState<Session | null>(sessionData);

    useEffect(() => {
        if (trigger(prevSession.current, sessionData))
            setSession(sessionData);
        prevSession.current = sessionData;
    }, [sessionData, trigger]);

    return { session };
}