import Image from "next/image";
import { useEffect, useState } from "react";

export default function FloatingBlock({children, handleClose} : {children: React.ReactNode, handleClose: () => undefined}) {
    const [boxBgOpacity, setBoxBgOpacity] = useState("00");

    // trigger shadow animation
    useEffect(() => {
        setBoxBgOpacity("80");
    })

    return (
        <div className="fixed w-full h-full z-50 duration-300 bg-black transition-colors" style={{backgroundColor: `#000000${boxBgOpacity}`}}>
            <section className="absolute top-1/2 left-1/2 mr-1/2 box-border p-12 w-1/4 bg-slate-800" style={{marginRight: "-50%", transform: "translate(-50%, -50%)"}}>
                {/* close button */}
                <button className="absolute top-3 right-3 p-2" onClick={handleClose}>
                    <Image
                        priority
                        src="/x.svg"
                        width={16}
                        height={16}
                        alt="Close">
                    </Image>
                </button>
                {children}
            </section>
        </div>

    )
}