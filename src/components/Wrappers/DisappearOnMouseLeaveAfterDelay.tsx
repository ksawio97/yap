import { useEffect, useState } from "react";

const TICK_COUNT = 500;
function TimeLeftLine({ mouseLeft, time, onTimeEnd }: { mouseLeft: boolean, time: number, onTimeEnd: () => void }) {
    const [percent, setPercent] = useState<number>(0);

    useEffect(() => {
        setPercent(0); 
    }, [mouseLeft]);

    useEffect(() => {
        if (percent >= 100)
            onTimeEnd();
    }, [percent, onTimeEnd]);

    useEffect(() => {
        if (!mouseLeft)
            return;

        const interval = setInterval(() => {
            setPercent(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + (100 / TICK_COUNT)});
        }, time / TICK_COUNT);

        return () => clearInterval(interval);
    }, [mouseLeft, time, onTimeEnd]);
    return (
        <div className='bg-amber-200 h-1' style={{ 'width': `${percent}%`}}></div>
    );
}
export default function DisappearOnMouseLeaveAfterDelay({ delayAfterMouseLeave, onDisappear, children }: { delayAfterMouseLeave: number, onDisappear: () => void, children: React.ReactNode }) {
    const [show, setShow] = useState(true);
    const [mouseLeft, setMouseLeft] = useState(true);    

    useEffect(() => {
        if (!show)
            onDisappear();
    }, [show, onDisappear]);

    return (
        <div
            onMouseEnter={() => {
                setMouseLeft(false);
            }} 
            onMouseLeave={() => {
                setMouseLeft(true);
            }}>
                { show && <>
                    <TimeLeftLine mouseLeft={mouseLeft} time={delayAfterMouseLeave} onTimeEnd={() => setShow(false)}></TimeLeftLine>
                    {children}
                </> }
        </div>
    );
}