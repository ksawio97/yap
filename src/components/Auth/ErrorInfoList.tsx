import ErrorInfo from "./ErrorInfo";

export default function ErrorInfoList({ errors }: { errors: string[] | undefined }) {
    return errors ? errors.map((error) =>  <ErrorInfo key={`ErrorInfo${error}`} error={error}></ErrorInfo>) : <></>;
}