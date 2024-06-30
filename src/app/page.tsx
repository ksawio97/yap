import PostForm from "@/yap/components/Post/PostForm";
import ProfilePicture from "@/yap/components/Profile/ProfilePicture";
import PostList from "@/yap/components/Post/PostList";

export default function Home() {
  return (
    <div className="inline-grid w-full p-8">
      <main className="w-full md:w-2/3 xl:w-1/2 justify-self-center h-full divide-y divide-white">
        <div className="w-full flex flex-row">
          <div className="px-4">
            <ProfilePicture></ProfilePicture>
          </div>
          <PostForm></PostForm>
        </div>
        <PostList></PostList>
        
      </main>
    </div>
  );
}