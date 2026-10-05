import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Sparkles,
  Lightbulb,
  Zap,
  FileCode,
} from "lucide-react";
import styles from "./SubscriptionSection.module.scss";
import useSubscriber from "@/hooks/useSubscriber";
import { fadeUp } from "@/animations/motion";

const WHAT_YOU_RECEIVE = [
  {
    icon: Sparkles,
    title: "Product Updates",
    description:
      "Stay informed about new C2X features, improvements, and important product announcements.",
  },
  {
    icon: Lightbulb,
    title: "Developer Tips",
    description:
      "Receive practical coding, productivity, debugging, and development workflow tips.",
  },
  {
    icon: Zap,
    title: "Early Access",
    description:
      "Get opportunities to explore selected upcoming C2X features before wider availability.",
  },
  {
    icon: FileCode,
    title: "Release Notes",
    description:
      "Follow major releases, improvements, fixes, and changes across the C2X platform.",
  },
];

const SubscriptionSection = (): React.ReactElement => {
  const [email, setEmail] = useState("");
  const { loading, success, error, subscribe } = useSubscriber();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = await subscribe(email);
    if (ok) {
      setEmail("");
    }
  };

  return (
    <section className={styles.subscriptionSection} aria-label="Subscribe to C2X Updates">
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className={styles.header}
        >
          <h2 className={styles.title}>Stay Updated with C2X</h2>
          <p className={styles.subtitle}>
            Get the latest C2X releases, developer tips, product updates, AI features, collaboration improvements, and early access announcements.
          </p>
        </motion.div>

        <div className={styles.formBox}>
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.successBox}
            >
              <CheckCircle2 size={32} className={styles.successIcon} />
              <h3 className={styles.successTitle}>You're subscribed.</h3>
              <p className={styles.successText}>
                Thanks for joining C2X developer updates.
              </p>
            </motion.div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={styles.input}
                  disabled={loading}
                  aria-label="Enter your email address"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className={styles.spinner} />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {error && <p className={styles.errorMessage}>{error}</p>}

              <p className={styles.supportNote}>
                Product updates only. No unnecessary emails. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>

        {/* What Users Receive */}
        <div className={styles.receivesGrid}>
          {WHAT_YOU_RECEIVE.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index}
                className={styles.receiveCard}
              >
                <div className={styles.cardIcon}>
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Privacy Text */}
        <p className={styles.privacyText}>
          By subscribing, you agree to receive C2X product and developer updates. You can unsubscribe at any time. Read our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
      </div>
    </section>
  );
};

export default SubscriptionSection;
