type PostModel = {
        author: {
            name: string | null;
        }
        id: string;
        content: string;
        published: Date;
        likes: number;
        authorId: string;
}

export default PostModel;