export default function SuccessInfo({ text }: { text: string }) {
    return (
        <p className="bg-green-200 text-green-950 p-4">
            {text}
        </p>
    );
}