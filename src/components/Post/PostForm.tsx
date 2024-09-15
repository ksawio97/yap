'use client'
import create from "@/yap/app/actions/post/create";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import PostContentInput from "./PostContentInput";
import CircleChart from "./CircleChart";

const CHARS_LIMIT = 4_000;

export default function PostForm({ onPostCreated }: { onPostCreated: () => void }) {
    const [formState, action] = useFormState(create, undefined);
    const [charsPercentUsed, setCharsPercentUsed] = useState(0);
    const [postContent, setPostContent] = useState('');

    useEffect(() => {
        if (formState && !formState.error) {
            onPostCreated();
            // clear textarea
            setPostContent('');
        }
    }, [formState, onPostCreated]);
    
    useEffect(() => {
        setCharsPercentUsed(postContent.length / CHARS_LIMIT * 100);
    }, [postContent]);
    return (
        <form className="w-full flex flex-col space-y-4 h-fit pr-6" action={action}>
            <PostContentInput errorMessage={formState?.message || null} charsLimit={CHARS_LIMIT} value={postContent} onChange={(e) => setPostContent(e.target.value)}> 
            </PostContentInput>
            
            <div className="h-px w-full bg-slate-400"></div>
            <div className="w-full flex flex-row-reverse p-4 gap-4 justify-items-center">
                <button type="submit" className="bg-amber-500 justify-self-end w-24 h-9 rounded-md">Post</button>
                {/* character limit chart */}
                <CircleChart percent={charsPercentUsed}/>
            </div>
        </form>
    )
}