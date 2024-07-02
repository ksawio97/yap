type PostModel = {
        author: {
            name: string | null;
        }
        id: string;
        content: string;
        // this date's being read from server as string, not date that's a bug!
        published: Date;
        likes: number;
        authorId: string;
}

export default PostModel;