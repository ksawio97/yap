import Image from "next/image";

export default function ProfilePicture({ sizeMultiplier = 1 } : { sizeMultiplier : 1 | 2 | 4}) {
    return (
        <Image src="/pfp.png" alt="profile picture" className="rounded-full bg-slate-500" width={sizeMultiplier * 56} height={sizeMultiplier * 56}></Image>
    )
}