import type { ReactNode } from "react";
import { Info } from "lucide-react";
import styles from "../Callout.module.scss";
import { cn } from "@/utils/helpers";

interface InfoBoxProps {
  title?: string;
  children: ReactNode;
}

/** Blue informational callout for helpful context. */
const InfoBox = ({ title = "Info", children }: InfoBoxProps): React.ReactElement => (
  <div className={cn(styles.callout, styles.info)}>
    <Info size={18} strokeWidth={2} className={styles.icon} />
    <div className={styles.body}>
      <span className={styles.title}>{title}</span>
      <div className={styles.content}>{children}</div>
    </div>
  </div>
);

export default InfoBox;
