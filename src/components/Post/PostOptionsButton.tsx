import { useEffect, useRef, useState } from "react";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";
import { useOneActive } from "@/yap/libs/contexts/useOneActive";
import TrashIcon from "../icons/TrashIcon";

export default function PostOptionsButton() {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <>
            <div className="w-8 h-8 p-1 hover:bg-slate-700 rounded-md" onClick={() => {
                setShowOptions(!showOptions);
                console.log(`clicked now show: ${!showOptions}`);
            }}>
                <ThreeDotsIcon></ThreeDotsIcon>
            </div>      
            <Options forceShow={showOptions} onClosed={() => { setShowOptions(false); }}></Options>
        </>

    );
}

function Options({ forceShow, onClosed }: { forceShow: boolean, onClosed: () => void }) {
    const [show, setShow] = useState(forceShow);
    const { generateId, setNewActive, onActiveChange, forceDeactivate } = useOneActive();
    const { current: activeId } = useRef<string>(generateId());

    useEffect(() => {
        const detach = onActiveChange(activeId, (active) => {
            console.log(`active: ${active} ${activeId}`);
            setShow(active);
            if (!active)
                onClosed();
        });

        return () => {
            detach();
        }
    }, [activeId, onActiveChange, onClosed]);
     
    useEffect(() => {
        console.log(`force ${forceShow}`);
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
        <ul className="w-40 h-auto bg-slate-900 hover:bg-slate-700 absolute mt-2 p-2 select-none text-sm right-2 px-2 md:right-auto md:px-auto">
            <li className="text-red-500 flex flex-row gap-2">
                <div className="size-4">
                    <TrashIcon></TrashIcon>
                </div>
                Delete
            </li>
        </ul>
    )
}