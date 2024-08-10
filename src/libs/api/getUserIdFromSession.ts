import { NextRequest } from "next/server";
import getJwtToken from "../auth/getJwtToken";

export default async function getUserIdFromSession(req: NextRequest) {
    const session = await getJwtToken(req);

    if (!session || !('id' in session) || typeof session.id !== 'string')
        return null;
    return session.id;
}