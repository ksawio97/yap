'use client'

import create from "@/yap/app/actions/post/create";
import { useFormState } from "react-dom";
import PostContentInput from "./PostContentInput";
import { useEffect, useState } from "react";
import CircleChart from "./CircleChart";

const CHARS_LIMIT = 4000;
export default function ReplyForm({ replyToId, onPostCreated }: { replyToId: string, onPostCreated: () => void }) {
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
        <form className="w-full flex flex-col space-y-4 h-fit" action={action}>
            <input name="parentId" type="hidden" defaultValue={replyToId}></input>
            <div className="flex flex-row">
                <div className="w-full p-3 border-solid rounded border-2 border-opacity-35">
                    <PostContentInput errorMessage={formState?.message || null} charsLimit={CHARS_LIMIT} value={postContent} onChange={(e) => setPostContent(e.target.value)}> 
                    </PostContentInput>
                </div>
                <div className="flex flex-col p-2 gap-y-2">
                    <button type="submit" className="bg-amber-500 justify-self-end w-24 h-9 rounded-md">Reply</button>
                    <CircleChart percent={charsPercentUsed}></CircleChart>
                </div>
            </div>
        </form>
    );
}