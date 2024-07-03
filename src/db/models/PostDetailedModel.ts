import PostModel from "./PostModel";

type PostDetailedModel = PostModel & {
    parent: {
        id: string;
        authorId: string;
        author: {
            name: string | null;
        };
    } | null;
    replies: PostModel[];
}

export default PostDetailedModel;