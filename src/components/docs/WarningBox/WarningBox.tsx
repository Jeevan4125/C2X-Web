import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import styles from "../Callout.module.scss";
import { cn } from "@/utils/helpers";

interface WarningBoxProps {
  title?: string;
  children: ReactNode;
}

/** Amber callout for actions that need caution. */
const WarningBox = ({ title = "Warning", children }: WarningBoxProps): React.ReactElement => (
  <div className={cn(styles.callout, styles.warning)}>
    <AlertTriangle size={18} strokeWidth={2} className={styles.icon} />
    <div className={styles.body}>
      <span className={styles.title}>{title}</span>
      <div className={styles.content}>{children}</div>
    </div>
  </div>
);

export default WarningBox;
