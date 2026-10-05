import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./FAQAccordion.module.scss";
import { cn } from "@/utils/helpers";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

/** Accordion list of question/answer pairs with smooth expand animation. */
const FAQAccordion = ({ items }: FAQAccordionProps): React.ReactElement => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={styles.list}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className={cn(styles.item, isOpen && styles.open)}>
            <button
              type="button"
              className={styles.question}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-${item.id}`}
            >
              <span>{item.question}</span>
              <ChevronDown size={16} strokeWidth={2} className={cn(styles.chevron, isOpen && styles.rotated)} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className={styles.answerWrap}
                >
                  <p className={styles.answer}>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
