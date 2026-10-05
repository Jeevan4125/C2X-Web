import { motion } from "framer-motion";
import {
  Sparkles,
  Download,
  Upload,
  Copy,
  ThumbsDown,
  Trash2,
  X,
  Bot,
  User,
  RotateCcw,
  FileCode,
  Code,
  Send,
} from "lucide-react";
import styles from "./AiAssistantMockup.module.scss";
import { fadeUp } from "@/animations/motion";

const AiAssistantMockup = (): React.ReactElement => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.mockupContainer}
      aria-label="C2X AI Assistant Interactive Interface Preview"
    >
      {/* Panel Header */}
      <div className={styles.panelHeader}>
        <div className={styles.headerLeft}>
          <Sparkles size={16} className={styles.sparkleIcon} />
          <span className={styles.panelTitle}>AI Assistant</span>
          <span className={styles.countBadge}>2</span>
        </div>
        <div className={styles.headerActions}>
          <Download size={14} />
          <Upload size={14} />
          <Copy size={14} />
          <ThumbsDown size={14} />
          <Trash2 size={14} />
          <X size={14} />
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className={styles.chatBody}>
        {/* Message 1 - Assistant */}
        <div className={styles.messageItem}>
          <div className={styles.avatar}>
            <Bot size={18} />
          </div>
          <div className={styles.messageContent}>
            <div className={styles.messageMeta}>
              <span className={styles.senderName}>AI Assistant</span>
              <span className={styles.timestamp}>09:49 AM</span>
            </div>
            <p className={styles.messageText}>
              👋 Hello! I'm your AI coding assistant. I can help you with code explanation, debugging, optimization, and more. What can I help you with today?
            </p>
            <div className={styles.actionRow}>
              <Copy size={13} />
              <ThumbsDown size={13} />
            </div>
          </div>
        </div>

        {/* Message 2 - User */}
        <div className={styles.messageItem}>
          <div className={styles.avatar}>
            <User size={18} />
          </div>
          <div className={styles.messageContent}>
            <div className={styles.messageMeta}>
              <span className={styles.senderName}>You</span>
              <span className={styles.timestamp}>10:00 AM</span>
              <span className={styles.youBadge}>You</span>
            </div>
            <p className={styles.messageText}>hi</p>
          </div>
        </div>

        {/* Message 3 - Assistant */}
        <div className={styles.messageItem}>
          <div className={styles.avatar}>
            <Bot size={18} />
          </div>
          <div className={styles.messageContent}>
            <div className={styles.messageMeta}>
              <span className={styles.senderName}>AI Assistant</span>
              <span className={styles.timestamp}>10:00 AM</span>
            </div>
            <p className={styles.messageText}>
              Hello. I'm here to help with any questions or issues you have with your TypeScript code in the <code>pdf-editor.models.ts</code> file. How can I assist you today? Do you need help understanding a specific part of the code, or are you looking to add new functionality or fix an issue?
            </p>
            <div className={styles.actionRow}>
              <Copy size={13} />
              <RotateCcw size={13} />
              <ThumbsDown size={13} />
            </div>
          </div>
        </div>
      </div>

      {/* Context Bar */}
      <div className={styles.contextBar}>
        <FileCode size={13} />
        <span>pdf-editor.models.ts</span>
        <span>•</span>
        <span>typescript</span>
      </div>

      {/* Input Box Area */}
      <div className={styles.inputBoxArea}>
        <div className={styles.inputGroup}>
          <span className={styles.inputText}>Ask me anything...</span>
          <div className={styles.inputIcons}>
            <Code size={15} />
            <div className={styles.sendBtn}>
              <Send size={12} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AiAssistantMockup;
