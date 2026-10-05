import { motion } from "framer-motion";
import { Users, MousePointer2, MessageSquare, Radio } from "lucide-react";
import styles from "./Collaboration.module.scss";
import Container from "@/components/common/Container";
import { fadeUp, slideInRight, viewportOnce } from "@/animations/motion";

const PEERS = [
  { initials: "AR", color: "#007acc" },
  { initials: "MK", color: "#4ec9b0" },
  { initials: "JD", color: "#dcdcaa" },
];

const POINTS = [
  {
    icon: Users,
    title: "Real-time editing",
    description: "Multiple developers edit the same file simultaneously with zero merge conflicts.",
  },
  {
    icon: MousePointer2,
    title: "Live cursors",
    description: "See exactly where teammates are working, down to the character.",
  },
  {
    icon: MessageSquare,
    title: "In-editor chat",
    description: "Discuss changes right next to the code without switching tools.",
  },
  {
    icon: Radio,
    title: "Presence awareness",
    description: "Know who's online, what they're viewing, and when they go idle.",
  },
];

const CODE_LINES = [
  "function authenticateUser(token: string) {",
  "  const session = verifyToken(token);",
  "  if (!session.valid) {",
  "    throw new AuthError('Invalid session');",
  "  }",
  "  return session.user;",
  "}",
];

const Collaboration = (): React.ReactElement => {
  return (
    <section className={`${styles.section} section-pad`} aria-label="Collaboration">
      <Container>
        <div className={styles.layout}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className={styles.panel}
          >
            <div className={styles.panelHeader}>
              <p className="text-small" style={{ color: "#fff", fontWeight: 600 }}>
                authFlow.ts — live session
              </p>
              <div className={styles.presenceRow}>
                {PEERS.map((peer) => (
                  <span
                    key={peer.initials}
                    className={styles.presenceAvatar}
                    style={{ backgroundColor: peer.color }}
                  >
                    {peer.initials}
                  </span>
                ))}
              </div>
            </div>

            {CODE_LINES.map((line, i) => (
              <div key={i} className={styles.docLine}>
                {i === 1 ? (
                  <span className={styles.remoteCursor}>
                    <span className={styles.cursorFlag} style={{ backgroundColor: "#4ec9b0" }}>
                      Maya — typing…
                    </span>
                    {line}
                    <span className={styles.cursorBar} style={{ backgroundColor: "#4ec9b0" }} />
                  </span>
                ) : i === 4 ? (
                  <span className={styles.remoteCursor}>
                    {line}
                    <span className={styles.cursorBar} style={{ backgroundColor: "#dcdcaa" }} />
                    <span
                      className={styles.cursorFlag}
                      style={{ backgroundColor: "#dcdcaa", top: "16px" }}
                    >
                      Jordan — cursor active
                    </span>
                  </span>
                ) : (
                  line
                )}
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.5 }}
              className={styles.chatBubbleFloat}
            >
              <strong style={{ color: "#fff" }}>Alex:</strong> pushed the token
              refresh fix — can you review?
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={slideInRight}
          >
            <p className="text-eyebrow mb-3">Collaboration</p>
            <h2 className="text-h2 mb-4">Build together, in real time</h2>
            <p className="text-body-lg">
              C2X brings your whole team into one workspace — see edits,
              cursors, and conversations as they happen, no context switching
              required.
            </p>

            <div className={styles.pointGrid}>
              {POINTS.map((point) => (
                <div key={point.title} className={styles.pointCard}>
                  <point.icon size={18} className={styles.pointIcon} strokeWidth={1.8} />
                  <h3 className="text-h3 mb-1" style={{ fontSize: "0.9375rem" }}>
                    {point.title}
                  </h3>
                  <p className="text-small">{point.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Collaboration;
