import { useState, type FormEvent, memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Mail, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import styles from "./Footer.module.scss";
import Container from "@/components/common/Container";
import type { FooterLinkGroup } from "@/types";
import { fadeUp, viewportOnce } from "@/animations/motion";
import { GITHUB_REPO_URL } from "@/constants";
import { useSubscriber } from "@/hooks/useSubscriber";

const FOOTER_GROUPS: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", path: "/features" },
      { label: "AI Assistant", path: "/ai-assistant" },
      { label: "Collaboration", path: "/collaboration" },
      { label: "Extensions", path: "/extensions" },
      { label: "Download", path: "/download" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", path: "/docs" },
      { label: "API Reference", path: "/docs/api" },
      { label: "GitHub", path: GITHUB_REPO_URL, external: true },
      { label: "Open Source", path: GITHUB_REPO_URL, external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", path: "/about" },
      { label: "Careers", path: "/careers" },
      { label: "Press Kit", path: "/press-kit" },
      { label: "Blog", path: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Service", path: "/terms-of-service" },
      { label: "Cookie Policy", path: "/cookie-policy" },
    ],
  },
];

const SOCIALS = [
  { icon: Github, href: GITHUB_REPO_URL, label: "GitHub" },
  { icon: Mail, href: "mailto:support@c2x.dev", label: "Email" },
];

const Footer = memo((): React.ReactElement => {
  const [email, setEmail] = useState("");
  const { loading, success, error, subscribe, reset } = useSubscriber();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = await subscribe(email);
    if (ok) {
      setEmail("");
      setTimeout(reset, 5000);
    }
  };

  const showSuccess = success && !error;
  const showError = error && !success;

  return (
    <footer className={styles.footer}>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className={styles.newsletter}
        >
          <div className={styles.newsletterText}>
            <h3 className="text-h3 mb-2">Get C2X updates</h3>
            <p className="text-body">
              Get product updates, release notes, and engineering deep-dives
              delivered straight to your inbox.
            </p>
          </div>

          <form className={styles.newsletterForm} onSubmit={handleSubmit} noValidate>
            {showSuccess ? (
              <div className={styles.successMessage}>
                <CheckCircle2 size={18} className={styles.successIcon} />
                <span>You're subscribed!</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.newsletterInput}
                  aria-label="Enter your email address"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className={styles.subscribeBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className={styles.spinner} />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {showError && <p className={styles.errorMessage}>{error}</p>}
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className={styles.brandCol}
          >
            <Link to="/" className={styles.brandLogo}>
              <img
                src="/c2x-white.svg"
                alt="C2X"
                className={styles.brandLogoImage}
                width="32"
                height="32"
                loading="lazy"
              />
              <span className={styles.brandLogoText}>C2X</span>
            </Link>
            <p className={`${styles.brandDesc} text-small`}>
              An AI-assisted collaborative development environment for modern software workflows.
            </p>
            <div className={styles.socialRow}>
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={label}
                >
                  <Icon size={16} strokeWidth={1.9} />
                </a>
              ))}
            </div>
          </motion.div>

          {FOOTER_GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              custom={i + 1}
            >
              <p className={styles.colTitle}>{group.title}</p>
              <ul className={styles.colList}>
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.colLink}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.path} className={styles.colLink}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className={styles.bottomBar}>
          <p className="text-small">
            © 2026 C2X. All rights reserved.
          </p>
          <span className={styles.statusBadge}>
            <span className={styles.statusDot} />
            All systems operational
          </span>
        </div>
      </Container>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
