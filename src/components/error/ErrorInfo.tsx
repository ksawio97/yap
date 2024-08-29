import WarningIcon from "../icons/WarningIcon";

export default function ErrorInfo({ error }: { error: string}) {
    return (
        <div className="w-full bg-red-100 flex flex-row">
            <div className="h-6 p-2">
                <div className="size-6">
                    <WarningIcon></WarningIcon>
                </div>
            </div>
            <p className="text-red-900 font-bold p-2">{error}</p>
        </div>
    );
}