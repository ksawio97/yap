import { ReactNode } from "react";

export default function FloatingBlockWrapper({children}: {children: ReactNode}) {
    return (
        <div className="fixed w-full h-full">
            <div className="absolute top-1/2 left-1/2 mr-1/2 w-fit h-fit -translate-x-1/2 -translate-y-1/2">
                {children}
            </div>
        </div>
    );
}