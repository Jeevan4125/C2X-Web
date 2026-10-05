import { motion } from "framer-motion";
import styles from "./About.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { COMPANY_STATS } from "@/data/companyStats";
import { TEAM } from "@/data/team";
import { TIMELINE } from "@/data/timeline";
import StatisticCard from "@/components/business/StatisticCard";
import TeamCard from "@/components/business/TeamCard";
import Timeline from "@/components/business/Timeline";
import TechnologyCard from "@/components/business/TechnologyCard";
import LeadershipCard from "@/components/business/LeadershipCard";
import CultureCard from "@/components/business/CultureCard";

const About = (): React.ReactElement => {
  const technologies = [
    { name: "React", icon: "⚛️", category: "Frontend UI Engine" },
    { name: "TypeScript", icon: "📘", category: "Strict Type Safety" },
    { name: "Vite", icon: "⚡", category: "Build Tooling & HMR" },
    { name: "Monaco Editor", icon: "✏️", category: "Code Editor Kernel" },
    { name: "Node.js & Express", icon: "🟢", category: "Backend Microservices" },
    { name: "Socket.IO", icon: "🔌", category: "Real-time Collaboration" },
    { name: "Electron", icon: "💻", category: "Cross-Platform Runtime" },
    { name: "SCSS Modules", icon: "🎨", category: "Scoped Design System" },
  ];

  const philosophy = [
    {
      title: "Developer-First Focus",
      desc: "Every design decision prioritizes keystroke latency, keyboard navigation, and workspace responsiveness.",
    },
    {
      title: "Seamless Collaboration",
      desc: "Coding should be a connected experience with instant pair programming and zero environment hurdles.",
    },
    {
      title: "Responsible AI Integration",
      desc: "AI is an intelligent assistant that enhances developer capability while respecting privacy and code ownership.",
    },
    {
      title: "Open Extensibility",
      desc: "Built on open standards so developers can extend language tools, themes, and debug adapters easily.",
    },
  ];

  const leadership = TEAM.filter((member) => member.leadership);

  return (
    <div className={styles.about}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className={styles.heroContent}
          >
            <motion.span variants={fadeUp} className={styles.badge}>
              About C2X
            </motion.span>
            <motion.h1 variants={fadeUp} className={styles.title}>
              Connected Workspaces for
              <br />
              <span className={styles.gradient}>Modern Software Engineering</span>
            </motion.h1>
            <motion.p variants={fadeUp} className={styles.description}>
              C2X is a developer-focused development environment designed to bring coding, AI assistance, terminal workflows, debugging, and collaboration into a connected workspace.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.missionVision}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={styles.missionCard}
            >
              <div className={styles.cardIcon}>🎯</div>
              <h2>Our Mission</h2>
              <p>
                To empower developers, students, and software teams with an integrated workspace that makes real-time team collaboration, AI-assisted coding, and debugging accessible.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={styles.visionCard}
            >
              <div className={styles.cardIcon}>🔭</div>
              <h2>Our Vision</h2>
              <p>
                A unified development environment where code editing, context-aware AI assistance, and real-time pair programming work together effortlessly across any project.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Philosophy */}
      <section className={styles.culture}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            Product Philosophy
          </motion.h2>
          <div className={styles.philosophyGrid}>
            {philosophy.map((item) => (
              <div key={item.title} className={styles.philosophyCard}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            C2X Platform Capabilities
          </motion.h2>
          <div className={styles.statsGrid}>
            {COMPANY_STATS.map((stat, index) => (
              <StatisticCard key={stat.id} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            Development Journey
          </motion.h2>
          <Timeline items={TIMELINE} />
        </div>
      </section>

      {/* Culture */}
      <section className={styles.culture}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            Engineering Principles
          </motion.h2>
          <div className={styles.cultureGrid}>
            <CultureCard
              title="Responsiveness First"
              description="We prioritize keystroke latency, fast file indexing, and UI fluidity."
              icon="💡"
            />
            <CultureCard
              title="Open Ecosystem"
              description="We build upon and respect open developer standards like VS Code extension protocols."
              icon="🌍"
            />
            <CultureCard
              title="Connected Workflows"
              description="We design features so coding, terminal execution, and pair sessions happen in one view."
              icon="🌐"
            />
            <CultureCard
              title="Developer Control"
              description="Developers maintain full oversight over code commits, diff approvals, and AI prompts."
              icon="📚"
            />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className={styles.technology}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            Technology Architecture
          </motion.h2>
          <div className={styles.techGrid}>
            {technologies.map((tech, index) => (
              <TechnologyCard key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Focus Areas */}
      <section className={styles.leadership}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            Engineering Focus Areas
          </motion.h2>
          <div className={styles.leadershipGrid}>
            {leadership.map((member, index) => (
              <LeadershipCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
