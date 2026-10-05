import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Info,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import styles from "./CalloutBox.module.scss";
import { fadeUp } from "@/animations/motion";
import { cn } from "@/utils/helpers";

type CalloutType = "info" | "warning" | "error" | "success" | "tip";

interface CalloutBoxProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

const CalloutBox = ({
  type = "info",
  title,
  children,
  className,
}: CalloutBoxProps): React.ReactElement => {
  const config = {
    info: { icon: Info, color: styles.info },
    warning: { icon: AlertTriangle, color: styles.warning },
    error: { icon: AlertCircle, color: styles.error },
    success: { icon: CheckCircle, color: styles.success },
    tip: { icon: Lightbulb, color: styles.tip },
  };

  const { icon: Icon, color } = config[type];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className={cn(styles.callout, color, className)}
    >
      <div className={styles.header}>
        <Icon size={18} className={styles.icon} />
        {title && <span className={styles.title}>{title}</span>}
      </div>
      <div className={styles.content}>{children}</div>
    </motion.div>
  );
};

export default CalloutBox;
