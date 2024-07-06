import { ReactNode } from "react";

export default function ContentAsPageWrapper({children}: {children: ReactNode}) {
    return (
        <div className="w-full md:w-2/3 xl:w-1/2 justify-self-center h-full">
            {children}
        </div>
    );
}