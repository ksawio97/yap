import { User } from "@prisma/client";

export default function convertToUserPublicModel(user: User): UserPublicModel {
    const { id, name, bio, image } = user;

    return { id, name, bio, image };
}