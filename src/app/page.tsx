import PostForm from "../components/PostForm";

export default function Home() {
  return (
    <main className="inline-grid w-full p-8">
      <section className="w-full md:w-2/3 xl:w-1/2 justify-self-center h-full">
        <PostForm></PostForm>
      </section>
    </main>
  );
}