import type { ReactNode } from "react";
import { Lightbulb } from "lucide-react";
import styles from "../Callout.module.scss";
import { cn } from "@/utils/helpers";

interface NoteBoxProps {
  title?: string;
  children: ReactNode;
}

/** Teal callout for tips and supplementary notes. */
const NoteBox = ({ title = "Tip", children }: NoteBoxProps): React.ReactElement => (
  <div className={cn(styles.callout, styles.note)}>
    <Lightbulb size={18} strokeWidth={2} className={styles.icon} />
    <div className={styles.body}>
      <span className={styles.title}>{title}</span>
      <div className={styles.content}>{children}</div>
    </div>
  </div>
);

export default NoteBox;
