'use client'
import { memo, useRef, useState } from "react";

const CircleChart = memo(function CircleChart({ percent }: {percent: number}) {
    return (
        <>
            <style jsx>{`
                        .circle-chart {
                            border-radius: 50%;
                            border: 1px solid white;
                            background: conic-gradient(#b91c1c calc(${percent}%),#0000 0);
                        }
                    `}</style>
            <span className="w-9 h-9 circle-chart"></span>
        </>
    )
});

export default function PostForm() {
    const charsLimit = 4_000;

    const textAreaHandle = useRef<HTMLTextAreaElement>(null);
    const [charsPercentUsed, setCharsPercentUsed] = useState(0);

    function getTextAreaCharsLength() : number {
        if (textAreaHandle.current == null)
            return 0;
        return textAreaHandle.current.value.length / charsLimit * 100;
    }

    function handlePostContentChange() {
        setCharsPercentUsed(getTextAreaCharsLength());

        if (textAreaHandle.current == null)
            return;
        // there's nothing to scroll shrink textarea
        textAreaHandle.current.style.height = 'auto';
        // there's content outside of the textarea, grow
        textAreaHandle.current.style.height = `${textAreaHandle.current.scrollHeight}px`;
    }
    
    // TODO on form submit replace multiple new lines with just one
    return (
        <form className="w-full flex flex-col divide-y divide-opacity-25 space-y-4 h-fit">
            <textarea className="bg-transparent resize-none"
                placeholder="Post Content"
                ref={textAreaHandle}
                onInput={handlePostContentChange}
                style={{maxHeight: "60vh"}}
                maxLength={charsLimit}>
            </textarea>
            <div className="w-full flex flex-row-reverse p-4 gap-4 justify-items-center">
                <button type="submit" className="bg-amber-500 justify-self-end w-24 h-9 rounded-md">Post</button>
                {/* character limit chart */}
                <CircleChart percent={charsPercentUsed}/>
            </div>
        </form>
    )
}