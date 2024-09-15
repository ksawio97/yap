import { useEffect, useRef } from "react";
import DisappearAfterDelayWrapper from "../Wrappers/DisappearAfterDelayWrapper";
import ErrorInfo from "../error/ErrorInfo";

type PostContentInputProps = {
    charsLimit: number,
    value: string,
    errorMessage: string | null,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export default function PostContentInput({ charsLimit, value, errorMessage, onChange }: PostContentInputProps) {
    const textAreaHandle = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaHandle.current == null)
            return;
        // there's nothing to scroll shrink textarea
        textAreaHandle.current.style.height = 'auto';
        // there's content outside of the textarea, grow
        textAreaHandle.current.style.height = `${textAreaHandle.current.scrollHeight}px`;
    }, [value]);

    return (
        <div>
            <textarea className="bg-transparent resize-none w-full"
                placeholder="Post Content"
                ref={textAreaHandle}
                style={{maxHeight: "60vh"}}
                value={value}
                onChange={onChange}
                maxLength={charsLimit}
                name="content">
            </textarea>
            { errorMessage &&             
                <DisappearAfterDelayWrapper delayMs={4000}>
                    <ErrorInfo error={errorMessage}></ErrorInfo>
                </DisappearAfterDelayWrapper>
            }
        </div>
    );
}