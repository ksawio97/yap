import { UserWithPostCount } from "../../services/users";

export default function convertToUserPublicModel(user: UserWithPostCount): UserPublicModel {
    const { id, name, bio, image } = user;

    return { id, name, bio, image, postCount: user._count.posts };
}