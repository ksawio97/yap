import PopupMessageProps from "./Props/PopupMessageProps";

export default function PopupMessage({ show, backgroundColor, color }: PopupMessageProps) {
    return (
        <div>
            <div className={`absolute text-white p-1 transition-transform scale-0 ${show ? "opacity-100" : "opacity-0"}`} 
                style={{ 
                    transform: `${show ? "translate(0, -120%)" : ""}`,
                    color: color,
                    backgroundColor: backgroundColor}}>
                Copied to clipboard!
            </div>
        </div>
    )
}