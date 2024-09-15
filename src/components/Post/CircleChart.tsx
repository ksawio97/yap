import { memo } from "react";

const minimumChartPercent = 5;
function CircleChart({ percent }: {percent: number}) {
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
};

export default memo(CircleChart, (prev, next) => 
    // props are equal or they are both under minimumChartPercent (no need to change chart)
    prev.percent === next.percent || (prev.percent < minimumChartPercent && next.percent < minimumChartPercent)
);