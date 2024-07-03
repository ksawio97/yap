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
    likes: number;
    authorId: string;
    parentId: string | null;
}

export default PostModel;