import { NextRequest } from "next/server";
import getJwtToken from "../auth/getJwtToken";
import createResponse from "./createResponse";

export default async function getUserIdFromSession(req: NextRequest) {
  const session = await getJwtToken(req);

  if (!session || !("id" in session) || typeof session.id !== "string")
    return null;
  return session.id;
}

export async function checkUserExistence(req: NextRequest) {
  const userId = await getUserIdFromSession(req);

  if (!userId)
    return {
      userId: null,
      userNotFound: createResponse({
        message: "You need to sign in",
        status: 401,
      }),
    }
  return {
    userId: userId,
    userNotFound: null,
  };
}
