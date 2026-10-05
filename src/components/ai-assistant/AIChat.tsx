import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, Bot, Zap } from "lucide-react";
import styles from "./AIChat.module.scss";
import { cn } from "@/utils/helpers";
import { getAIResponse } from "@/utils/aiResponses";
import type { ChatMessage } from "@/types";

interface AIChatProps {
  className?: string;
}

const SUGGESTION_CHIPS = [
  { label: "What is C2X?", value: "What is C2X?" },
  { label: "AI Features", value: "What AI features does C2X have?" },
  { label: "Installation", value: "How do I install C2X?" },
  { label: "Pricing", value: "Is C2X free?" },
];

const PLACEHOLDER_SUGGESTIONS = [
  "Ask about C2X features...",
  "How do I install C2X?",
  "Explain AI Pair Programming",
  "Does C2X support GitHub?",
  "How can I collaborate with my team?",
  "Is C2X free?",
  "How do Extensions work?",
  "Show keyboard shortcuts",
  "Explain Cloud IDE",
  "Tell me about Security",
];

const AIChat = ({ className }: AIChatProps): React.ReactElement => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "ai",
      content:
        "Hi! I'm C2X. Ask me anything about C2X — features, installation, collaboration, and more!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(
        (prev) => (prev + 1) % PLACEHOLDER_SUGGESTIONS.length,
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }
    if (isTyping) {
      scrollToBottom();
    }
  }, [isTyping]);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const container = messagesContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });
  };

  const handleSend = async (message?: string) => {
    const text = message || input.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    scrollToBottom();

    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 400),
    );

    const response = getAIResponse(text);
    const aiMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      role: "ai",
      content: response,
    };
    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);

    setTimeout(() => scrollToBottom(), 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChipClick = (value: string) => {
    handleSend(value);
  };

  return (
    <div className={cn(styles.chatContainer, className)}>
      <div ref={messagesContainerRef} className={styles.messagesContainer}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 15, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn(styles.message, styles[message.role])}
            >
              <div className={styles.avatar}>
                {message.role === "ai" ? (
                  <Bot size={16} strokeWidth={2} />
                ) : (
                  <User size={16} strokeWidth={2} />
                )}
              </div>
              <div className={styles.messageContent}>
                <p>{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className={cn(styles.message, styles.ai)}
            >
              <div className={styles.avatar}>
                <Bot size={16} strokeWidth={2} />
              </div>
              <div className={styles.messageContent}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className={styles.typingText}>
                  C2X is typing...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.chipsContainer}>
        {SUGGESTION_CHIPS.map((chip) => (
          <motion.button
            key={chip.label}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className={styles.chip}
            onClick={() => handleChipClick(chip.value)}
            disabled={isTyping}
          >
            <Zap size={12} strokeWidth={2.5} />
            {chip.label}
          </motion.button>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={PLACEHOLDER_SUGGESTIONS[placeholderIndex]}
            className={styles.input}
            disabled={isTyping}
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            className={styles.sendButton}
            aria-label="Send message"
          >
            <Send size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
