type PostModel = {
    author: {
        name: string | null;
    };
    _count: {
        replies: number;
    };
    id: string;
    content: string;
    published: Date;
    likes: {
        count: string;
        liked: boolean;
    }
    authorId: string;
    parentId: string | null;
}

export default PostModel;