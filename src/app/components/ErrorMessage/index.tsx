import { JSX } from "react";

export default function ErrorMessage({ message, showError }: { message: string, showError: boolean }): JSX.Element {
    return (
        <div>
            {showError && (<div title="error-message" className="w-full px-2 py-2 bg-red-300 text-center mb-6">{message}</div>)}
        </div>
    );
}