"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface Hint {
    id: string;
    text: string;
}

// base on the prediction result from trash classifier, give the end user suitable hints for recycles
export default function RecyclingHints({ hints }: { hints: Hint[] }) {
    const [showAll, setShowAll] = useState(false);

    const displayedHints = showAll ? hints : hints.slice(0, 3);

    const r = useTranslations('RecyclingHints');
    // Example usage with dummy data
    const exampleHints: Hint[] = [
        { id: "1", text: r('hint1') },
        { id: "2", text: r('hint2') },
        { id: "3", text: r('hint3') },
        { id: "4", text: r('hint4') },
        { id: "5", text: r('hint5') },
    ];

    const App: React.FC = () => (
        <div>
            {exampleHints.map((hint) => (
                <p key={hint.id}>{hint.text}</p>
            ))}
        </div>
    );


    // use the dummy data to show the hints
    return (
        <div className="flex flex-col w-full max-w-4xl">
            <h2 className="text-2xl font-bold">{r('recyclingHints')}</h2>
            <ul className="list-disc pl-8">
                {displayedHints.map((hint) => (
                    <li key={hint.id} className="text-lg">
                        {hint.text}
                    </li>
                ))}
            </ul>
            {hints.length > 3 && (
                <button
                    className="text-blue-500 underline"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? "Show less" : "Show more"}
                </button>
            )}
            <div>
                <App />
            </div>
        </div>
    );
}
