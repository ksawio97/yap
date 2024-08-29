import { ReactNode, useEffect, useState } from "react";

export default function DisappearAfterDelayWrapper({ delayMs, children }: { delayMs: number, children: ReactNode}) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setShow(true);
        const timeout = setTimeout(() => {
            setShow(false);
        }, delayMs);

        return () => clearTimeout(timeout);
    }, [delayMs, children]);
    
    return (
        <div className="ease-out">
            {show && (children)}
        </div>
    );
}