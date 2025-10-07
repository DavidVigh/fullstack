import { TagsDestruct } from "@/app/types";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoTriangleDown } from "react-icons/go";

export default function Tags({ tags }: TagsDestruct) {
  return (
    <div>
      {tags.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-2 md:px-4">
          {tags.map((tag) => (
            <p
              key={tag.id}
              className="bg-blue-950 px-2 rounded-2xl border-1 border-sky-600"
            >
              <span className="text-blue-500 me-1">#</span>
              {tag.name}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 ps-5 mb-4">No tags given</p>
      )}
    </div>
  );
}

export function CardTags({ tags }: TagsDestruct) {
  const [displayTags, setDisplayTags] = useState<string[]>([]);
  const [moreTags, setMoreTags] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (tags && tags.length > 0) {
      const firstThree = tags.map((tag) => tag.name).slice(0, 3);
      const remaining = tags.length - firstThree.length;

      if (remaining > 0) {
        setDisplayTags(firstThree);
        setMoreTags(remaining);
      } else {
        setDisplayTags(firstThree);
        setMoreTags(0);
      }
    } else {
      setDisplayTags([]);
      setMoreTags(0);
    }
  }, [tags]);

  const handleToggle = () => setExpanded((prev) => !prev);
  const shownTags = expanded ? tags.map((t) => t.name) : displayTags;

  return (
    <motion.div layout className="md:px-4">
      {tags.length > 0 ? (
        <div className="flex flex-col gap-2">
          {/* Animate tag list */}
          <motion.div layout className="flex flex-row flex-wrap gap-2">
            <AnimatePresence>
              {shownTags.map((tag, index) => (
                <motion.p
                  key={tag}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.05,
                    ease: "easeInOut",
                  }}
                  className="bg-blue-950 px-2 rounded-2xl border-1 border-sky-600"
                >
                  <span className="text-blue-500 me-1">#</span>
                  {tag}
                </motion.p>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Toggle button with layout animation */}
          {moreTags > 0 && (
            <motion.button
              layout
              onClick={handleToggle}
              className="flex flex-row items-center gap-2 text-sm text-blue-400 underline hover:text-blue-300 transition-all"
              whileTap={{ scale: 0.98 }}
              transition={{ layout: { duration: 0.35, ease: "easeInOut" } }}
            >
              {/* Rotating icon */}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <GoTriangleDown />
              </motion.span>

              {/* Fading / sliding text */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={expanded ? "less" : "more"}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {expanded ? "Show less" : `+${moreTags} more`}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      ) : (
        <p className="text-gray-400 ps-5 mb-4">No tags given</p>
      )}
    </motion.div>
  );
}
