import { useState } from "react";
import { Check, Copy } from "lucide-react";
import styles from "./CopyButton.module.scss";
import { cn } from "@/utils/helpers";

interface CopyButtonProps {
  value: string;
  className?: string;
}

/**
 * Small icon button that copies `value` to the clipboard and shows a
 * transient "copied" state. Used inside CodeBlock's header.
 */
const CopyButton = ({ value, className }: CopyButtonProps): React.ReactElement => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable — fail silently, no UI is worth blocking on this.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(styles.copyBtn, copied && styles.copied, className)}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={2} />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
};

export default CopyButton;
