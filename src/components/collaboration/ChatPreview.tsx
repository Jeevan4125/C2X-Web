import { motion } from "framer-motion";
import { Send } from "lucide-react";
import styles from "./Collaboration.module.scss";
import type { CollabMessage } from "@/types";

interface ChatPreviewProps {
  messages: CollabMessage[];
}

/**
 * Compact team chat panel shown alongside the collaborative editor,
 * demonstrating in-context conversation between active collaborators.
 */
const ChatPreview = ({ messages }: ChatPreviewProps): React.ReactElement => {
  return (
    <div className={styles.chatPreview} aria-label="Team chat">
      <p className={styles.presenceHeader}>Room chat</p>
      <div className={styles.chatMessages}>
        {messages.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.35 }}
            className={styles.chatMsgRow}
          >
            <span className={styles.presenceAvatar} style={{ backgroundColor: m.color }}>
              {m.initials}
            </span>
            <div>
              <p className={styles.chatMsgMeta}>
                {m.author} <span>{m.time}</span>
              </p>
              <p className={styles.chatMsgText}>{m.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className={styles.chatInputBar}>
        <span>Message the room…</span>
        <Send size={14} />
      </div>
    </div>
  );
};

export default ChatPreview;
