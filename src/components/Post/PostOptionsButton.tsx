import { useEffect, useRef, useState } from "react";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";
import { useOneActive } from "@/yap/libs/contexts/useOneActive";
import TrashIcon from "../icons/TrashIcon";
import getURL from "@/yap/libs/getURL";

export default function PostOptionsButton({ postId, onPostDelete }: { postId: string, onPostDelete: () => void }) {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <>
            <div className="w-8 h-8 p-1 hover:bg-slate-700 rounded-md" onClick={() => {
                setShowOptions(!showOptions);
            }}>
                <ThreeDotsIcon></ThreeDotsIcon>
            </div>      
            <Options forceShow={showOptions} onClosed={() => { setShowOptions(false); }} postId={postId} onPostDelete={onPostDelete}></Options>
        </>

    );
}

function Options({ forceShow, onClosed, postId, onPostDelete }: { forceShow: boolean, onClosed: () => void, postId: string, onPostDelete: () => void }) {
    const [show, setShow] = useState(forceShow);
    const { generateId, setNewActive, onActiveChange, forceDeactivate } = useOneActive();
    const { current: activeId } = useRef<string>(generateId());

    useEffect(() => {
        const detach = onActiveChange(activeId, (active) => {
            setShow(active);
            if (!active)
                onClosed();
        });

        return () => {
            detach();
        }
    }, [activeId, onActiveChange, onClosed]);
     
    useEffect(() => {
        // when show close all other
        if (forceShow) {
            setNewActive(activeId);
        // just hide
        } else {
            forceDeactivate(activeId);
        }
    }, [forceShow, activeId, setNewActive, forceDeactivate]);
    return (
        !show ? <></> : 
        <ul className="w-40 h-auto bg-slate-900 absolute mt-2select-none text-sm right-2 md:right-auto md:px-auto">
            <li className="text-red-500 flex flex-row gap-2 hover:bg-slate-700 p-2 select-none" onClick={() => { 
                // try delete current post
                fetch(getURL(`/api/posts/delete/${postId}`)) 
                    .then((response) => {
                        if (response.ok) {
                            setShow(false);
                            onPostDelete();
                        }
                        else
                            console.error('Error while deleting post ' + postId);
                    });
            }}>
                <div className="size-4">
                    <TrashIcon></TrashIcon>
                </div>
                Delete
            </li>
        </ul>
    )
}