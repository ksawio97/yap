import SuccessInfo from "./SuccessInfo";

export default function SuccessInfoWithButton({ text, buttonText, onClick }: { text: string, buttonText: string, onClick: () => void }) {
    return (
        <div className="flex flex-col gap-4">
            <SuccessInfo text={text}></SuccessInfo>
            <div className="py-3 px-5 rounded-md bg-amber-500 w-fit h-fit select-none hover:cursor-pointer text-white" onClick={onClick}>{buttonText}</div>
        </div> 
    );
}