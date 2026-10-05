import { motion } from "framer-motion";
import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";
import styles from "./ShareButtons.module.scss";
import { buttonTap } from "@/animations/motion";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({
  title,
  url,
}: ShareButtonsProps): React.ReactElement => {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      icon: Twitter,
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "#1DA1F2",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "#1877F2",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "#0A66C2",
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={styles.shareButtons}>
      <span className={styles.label}>Share this article</span>
      <div className={styles.buttons}>
        {shareLinks.map(({ icon: Icon, label, href, color }) => (
          <motion.a
            key={label}
            whileTap={buttonTap}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
            style={{ "--hover-color": color } as React.CSSProperties}
            aria-label={`Share on ${label}`}
          >
            <Icon size={18} />
          </motion.a>
        ))}
        <motion.button
          whileTap={buttonTap}
          onClick={handleCopyLink}
          className={styles.button}
          aria-label="Copy link"
        >
          {copied ? <Check size={18} /> : <Link2 size={18} />}
        </motion.button>
      </div>
    </div>
  );
};

export default ShareButtons;
