import ErrorInfo from "./ErrorInfo";

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
                {errors && 
                    errors.map((error) =>  <ErrorInfo key={`ErrorInfo${error}`} error={error}></ErrorInfo>)
                }
            </div>
        </div>
    );
}