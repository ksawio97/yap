'use client'

import { useRouter } from "next/navigation";

export default function NotFound() {
    const route = useRouter();

    return (
        <div className="flex justify-center h-fit w-full absolute top-1/2 left-1/2 mr-1/2" style={{marginRight: "-50%", transform: "translate(-50%, -50%)"}}>
            <div className="flex w-fit gap-8 flex-col rounded-xl p-10">
                <div>
                    <h2 className="md:text-8xl text-5xl text-white">4<span className="text-red-600">0</span>4</h2>
                    <p className="md:text-5xl text-3xl text-white">Post not found!</p>
                </div>
                <button
                    className="rounded-lg bg-red-600 p-4 grow-0 w-fit self-center" 
                    onClick={() => {
                        route.back()
                    }}>Go back</button>
            </div>

        </div>
    )
}