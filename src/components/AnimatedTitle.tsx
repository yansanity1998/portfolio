import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedTitle({ text, className = "", delay = 0 }: AnimatedTitleProps) {
  const words = text.split(" ");
  
  return (
    <motion.h2
      className={`${className} flex flex-wrap`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut", delay: delay + wordIndex * 0.1 } }
          }}
          className="inline-flex whitespace-nowrap mr-[0.25em] will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}
