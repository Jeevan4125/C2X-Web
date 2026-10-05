import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Rocket,
  Terminal,
  Code2,
  Settings,
  Users,
  FileText,
  HelpCircle,
  Clock,
  Package,
  Sparkles,
  Zap,
  Shield,
  Globe,
  ArrowRight,
} from "lucide-react";
import styles from "./DocsHome.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import Button from "@/components/common/Button/Button";
import DocsSearch from "@/components/docs/DocsSearch";

const DocsHome = (): React.ReactElement => {
  // Introduction page has NO TOC entries
  // This ensures the right sidebar doesn't render

  const quickStartCards = [
    {
      icon: Rocket,
      title: "Quick Start",
      description: "Get up and running in 5 minutes with C2X.",
      link: "/docs/quick-start",
    },
    {
      icon: Terminal,
      title: "Installation",
      description: "Install C2X on Windows, macOS, or Linux.",
      link: "/docs/installation",
    },
  ];

  const popularGuides = [
    { label: "AI Assistant", path: "/docs/ai" },
    { label: "Collaboration", path: "/docs/collaboration" },
    { label: "Extensions", path: "/docs/extensions" },
    { label: "Themes", path: "/docs/themes" },
    { label: "API Reference", path: "/docs/api" },
    { label: "CLI Tools", path: "/docs/cli" },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI Assistance",
      description: "Context-aware completions and intelligent suggestions.",
      link: "/docs/ai",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Real-time pair programming and shared workspaces.",
      link: "/docs/collaboration",
    },
    {
      icon: Package,
      title: "Extensions",
      description: "Extend C2X with community and custom extensions.",
      link: "/docs/extensions",
    },
    {
      icon: Settings,
      title: "Customization",
      description: "Configure themes, keybindings, and editor settings.",
      link: "/docs/user-guide",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Enterprise-grade security and compliance.",
      link: "/docs/troubleshooting",
    },
    {
      icon: Globe,
      title: "Remote Development",
      description: "Develop on remote servers with SSH.",
      link: "/docs/cli",
    },
  ];

  const recentUpdates = [
    {
      title: "AI Assistant 2.0 Release",
      description: "Improved context awareness and faster completions.",
      date: "2 days ago",
    },
    {
      title: "New Extension API",
      description: "Build custom extensions with the new API.",
      date: "5 days ago",
    },
    {
      title: "Collaboration Improvements",
      description: "Better presence indicators and live cursors.",
      date: "1 week ago",
    },
  ];

  const developerResources = [
    { label: "API Reference", path: "/docs/api" },
    { label: "CLI Tools", path: "/docs/cli" },
    { label: "Extension API", path: "/docs/extensions" },
    { label: "GitHub", path: "/github" },
  ];

  return (
    <div className={styles.docsHome}>
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className={styles.hero}
        >
          <motion.span variants={fadeUp} className={styles.badge}>
            <BookOpen size={14} strokeWidth={2.5} />
            Documentation
          </motion.span>
          <motion.h1 variants={fadeUp} className={styles.title}>
            Welcome to the
            <br />
            <span className={styles.gradient}>C2X Docs</span>
          </motion.h1>
          <motion.p variants={fadeUp} className={styles.description}>
            Everything you need to start building, collaborating, and shipping
            with C2X.
          </motion.p>

          <motion.div variants={fadeUp} className={styles.searchWrapper}>
            <DocsSearch />
          </motion.div>

          <motion.div variants={fadeUp} className={styles.quickStartGrid}>
            {quickStartCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  to={card.link}
                  className={styles.quickStartCard}
                >
                  <div className={styles.quickStartIcon}>
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className={styles.quickStartContent}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                  <ArrowRight size={16} className={styles.quickStartArrow} />
                </Link>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Popular Guides */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={styles.popularGuides}
        >
          <motion.h2 variants={fadeUp} className={styles.sectionTitle}>
            Popular Guides
          </motion.h2>
          <motion.div variants={fadeUp} className={styles.guidesGrid}>
            {popularGuides.map((guide) => (
              <Link
                key={guide.label}
                to={guide.path}
                className={styles.guideCard}
              >
                <span>{guide.label}</span>
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            ))}
          </motion.div>
        </motion.section>

        {/* Feature Cards */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={styles.featuresSection}
        >
          <motion.h2 variants={fadeUp} className={styles.sectionTitle}>
            Explore Documentation
          </motion.h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  custom={index}
                  className={styles.featureCard}
                >
                  <Link to={feature.link} className={styles.featureLink}>
                    <div className={styles.featureIcon}>
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    <span className={styles.featureCta}>
                      Learn more
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Developer Resources & Recent Updates */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={styles.resourcesSection}
        >
          <div className={styles.resourcesGrid}>
            <div className={styles.resourcesCol}>
              <motion.h2 variants={fadeUp} className={styles.sectionTitle}>
                Developer Resources
              </motion.h2>
              <motion.div variants={fadeUp} className={styles.resourcesList}>
                {developerResources.map((resource) => (
                  <Link
                    key={resource.label}
                    to={resource.path}
                    className={styles.resourceItem}
                  >
                    <span>{resource.label}</span>
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </Link>
                ))}
              </motion.div>
            </div>

            <div className={styles.resourcesCol}>
              <motion.h2 variants={fadeUp} className={styles.sectionTitle}>
                Recent Updates
              </motion.h2>
              <motion.div variants={fadeUp} className={styles.updatesList}>
                {recentUpdates.map((update) => (
                  <div key={update.title} className={styles.updateItem}>
                    <div className={styles.updateContent}>
                      <h4>{update.title}</h4>
                      <p>{update.description}</p>
                    </div>
                    <span className={styles.updateDate}>
                      <Clock size={12} strokeWidth={2} />
                      {update.date}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Newsletter */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={styles.newsletterSection}
        >
          <div className={styles.newsletterCard}>
            <div className={styles.newsletterContent}>
              <h2>Stay updated</h2>
              <p>Get the latest docs, tutorials, and release notes.</p>
            </div>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.newsletterInput}
                aria-label="Email address"
              />
              <Button variant="primary" size="md">
                Subscribe
              </Button>
            </form>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default DocsHome;
