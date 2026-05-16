import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedTitle({ text, className = "", delay = 0 }: AnimatedTitleProps) {
  const words = text.split(" ");
  
  return (
    <h2 className={`${className} flex flex-wrap`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            const absoluteIndex = words.slice(0, wordIndex).join("").length + charIndex;
            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ 
                  duration: 0.1, 
                  ease: "linear", 
                  delay: delay + absoluteIndex * 0.2 
                }}
                viewport={{ once: false, margin: "-50px" }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}
