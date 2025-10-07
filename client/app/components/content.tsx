import { Post } from "../types";

export default function Content({ content }: { content: string }) {
    const paragraphs: string[] = content.split("  ");

    return (
        <div className="md:mx-4 mt-4 mb-2 sm:px-6 lg:px-8 pt-2 pb-4 px-4 indent-4 text-justify border-1 rounded-xl border-teal-800/95">
            {paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-sm md:text-lg">{paragraph}</p>

            ))
            }

        </div>
    )
}