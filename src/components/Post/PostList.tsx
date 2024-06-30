import Post from "./Post";

export default function PostList() {
    return (
        <section className="w-full flex flex-col gap-8 py-8">
            {[1, 2, 3, 4, 5].map((key) => 
                <Post key={`Post-${key}`}></Post>
            )}
        </section>
    )
}