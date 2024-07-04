export default function Loading() {
    const boxShadowColor = "rgb(245,158,11)";

    return (
        <div className="p-8 w-full flex justify-center">
            <style jsx>{`
                .loading {
                    font-size: 8px;
                    border-radius: 0.5em;
                    animation: spinner 1500ms infinite linear;
                    box-shadow: ${boxShadowColor} 1.5em 0 0 0, ${boxShadowColor} 1.1em 1.1em 0 0, ${boxShadowColor} 0 1.5em 0 0, ${boxShadowColor} -1.1em 1.1em 0 0, ${boxShadowColor} -1.5em 0 0 0, ${boxShadowColor} -1.1em -1.1em 0 0, ${boxShadowColor} 0 -1.5em 0 0, ${boxShadowColor} 1.1em -1.1em 0 0;
                }

                @keyframes spinner {
                    0% {
                      transform: rotate(0deg);
                    }
                    100% {
                      transform: rotate(360deg);
                    }
                  }
            `}</style>
            <div className="loading w-1 h-1"></div>
        </div>
    );
}