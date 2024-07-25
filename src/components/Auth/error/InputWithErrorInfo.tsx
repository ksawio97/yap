import ErrorInfo from "./ErrorInfo";
import ErrorInfoList from "./ErrorInfoList";

export type InputWithErrorInfoProps = {
    type: string,
    name: string,
    labelText: string,
    errors: string[] | undefined,
}


export default function InputWithErrorInfo({ type, name, labelText, errors }: InputWithErrorInfoProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-xl">{labelText}</label>
            <div className="flex flex-col">
                <input type={type} name={name} id={name} className="p-2 text-black"required></input>
                <ErrorInfoList errors={errors}></ErrorInfoList>
            </div>
        </div>
    );
}