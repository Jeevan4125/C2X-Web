import { motion } from "framer-motion";
import { GraduationCap, User, Users2, Zap, Rocket, Building2 } from "lucide-react";
import styles from "./UseCases.module.scss";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { fadeUp } from "@/animations/motion";

const USE_CASES = [
  {
    icon: GraduationCap,
    title: "Students & Learners",
    description:
      "Learn programming concepts with AI explanations, instant syntax error guidance, zero-config setups, and interactive code generation.",
  },
  {
    icon: User,
    title: "Individual Developers",
    description:
      "Boost personal productivity with ultra-fast autocomplete, integrated terminal workflows, quick bug fixes, and seamless Git sync.",
  },
  {
    icon: Users2,
    title: "Engineering Teams",
    description:
      "Collaborate in real time on shared codebases with live presence, pair programming rooms, role permissions, and integrated pull reviews.",
  },
  {
    icon: Zap,
    title: "Hackathons & Sprints",
    description:
      "Spin up cloud workspaces in seconds, draft rapid prototypes with AI assistance, and code together live without environment friction.",
  },
  {
    icon: Rocket,
    title: "Startups & Growth",
    description:
      "Accelerate product shipping velocity, maintain clean architectural patterns, and onboarding new engineers in minutes.",
  },
  {
    icon: Building2,
    title: "Educational Institutions",
    description:
      "Conduct live coding classes, review assignments in real time, and eliminate 'it works on my machine' problems across student devices.",
  },
];

const UseCases = (): React.ReactElement => {
  return (
    <section className={styles.useCasesSection} aria-label="Use Cases">
      <Container>
        <SectionTitle
          eyebrow="Solutions"
          title="Built for every developer workflow"
          description="Whether you're building solo, learning to code, or scaling an engineering team."
          align="center"
        />
        <div className={styles.grid}>
          {USE_CASES.map((uc, index) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index}
                className={styles.card}
              >
                <div className={styles.header}>
                  <div className={styles.iconWrap}>
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className={styles.title}>{uc.title}</h3>
                </div>
                <p className={styles.desc}>{uc.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default UseCases;
