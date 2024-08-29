'use client'
import create from "@/yap/app/actions/post/create";
import { memo, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import ErrorInfo from "../error/ErrorInfo";
import DisappearAfterDelayWrapper from "../Wrappers/DisappearAfterDelayWrapper";


// if CircleChart is under this% it won't show up
const minimumChartPercent = 5;
const CircleChart = memo(function CircleChart({ percent }: {percent: number}) {
    return (
        <>
            {percent < minimumChartPercent ? <></> :
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
            }
        </>
    )
}, (prev, next) => 
    // props are equal or they are both under minimumChartPercent (no need to change chart)
        prev.percent === next.percent || (prev.percent < minimumChartPercent && next.percent < minimumChartPercent)
);
const CHARS_LIMIT = 4_000;

function getTextAreaCharsLength(element: HTMLTextAreaElement | null) : number {
    if (element == null)
        return 0;
    return element.value.length / CHARS_LIMIT * 100;
}

export default function PostForm({ onPostCreated }: { onPostCreated: () => void }) {
    const [formState, action] = useFormState(create, undefined);
    const textAreaHandle = useRef<HTMLTextAreaElement>(null);
    const [charsPercentUsed, setCharsPercentUsed] = useState(0);

    useEffect(() => {
        if (formState && !formState.error) {
            onPostCreated();
            // clear textarea
            if (textAreaHandle.current) {
                textAreaHandle.current.value = "";
                handlePostContentChange()
            }
        }
    }, [formState, onPostCreated]);

    function handlePostContentChange() {
        setCharsPercentUsed(getTextAreaCharsLength(textAreaHandle.current));

        if (textAreaHandle.current == null)
            return;
        // there's nothing to scroll shrink textarea
        textAreaHandle.current.style.height = 'auto';
        // there's content outside of the textarea, grow
        textAreaHandle.current.style.height = `${textAreaHandle.current.scrollHeight}px`;
    }
    
    return (
        <form className="w-full flex flex-col space-y-4 h-fit pr-6" action={action}>
            <textarea className="bg-transparent resize-none"
                placeholder="Post Content"
                ref={textAreaHandle}
                onInput={handlePostContentChange}
                style={{maxHeight: "60vh"}}
                maxLength={CHARS_LIMIT}
                name="content">
            </textarea>
            { formState && formState.error && formState.message && (
                <DisappearAfterDelayWrapper delayMs={4000}>
                    <ErrorInfo error={formState.message}></ErrorInfo>
                </DisappearAfterDelayWrapper>)}
            
            <div className="h-px w-full bg-slate-400"></div>
            <div className="w-full flex flex-row-reverse p-4 gap-4 justify-items-center">
                <button type="submit" className="bg-amber-500 justify-self-end w-24 h-9 rounded-md">Post</button>
                {/* character limit chart */}
                <CircleChart percent={charsPercentUsed}/>
            </div>
        </form>
    )
}