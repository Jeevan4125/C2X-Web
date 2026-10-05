import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./Careers.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { JOBS } from "@/data/jobs";
import JobCard from "@/components/business/JobCard";
import BenefitCard from "@/components/business/BenefitCard";
import HiringStep from "@/components/business/HiringStep";

const Careers = (): React.ReactElement => {
  const [filter, setFilter] = useState<string>("all");

  const filteredJobs =
    filter === "all" ? JOBS : JOBS.filter((job) => job.department === filter);

  const departments = ["all", ...new Set(JOBS.map((job) => job.department))];

  const benefits = [
    {
      icon: "🏠",
      title: "Remote First",
      description: "Distributed collaboration culture across timezones",
    },
    {
      icon: "🕒",
      title: "Flexible Work",
      description: "Asynchronous task execution and self-directed schedules",
    },
    {
      icon: "📚",
      title: "Learning Focus",
      description: "Continuous development in systems, compilers and AI tooling",
    },
    {
      icon: "💻",
      title: "Modern Tech Stack",
      description: "Work with TypeScript, Monaco Kernel, Electron, and Socket.IO",
    },
  ];

  const hiringSteps = [
    {
      step: 1,
      title: "Initial Application",
      description: "Submit your code repositories and background details",
    },
    {
      step: 2,
      title: "Technical Discussion",
      description: "Review system architecture and real-world scenarios",
    },
    {
      step: 3,
      title: "Code Assessment",
      description: "Complete a practical engineering exercise",
    },
    {
      step: 4,
      title: "Team Review",
      description: "Discuss project alignment and onboarding steps",
    },
  ];

  return (
    <div className={styles.careers}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className={styles.heroContent}
          >
            <motion.span variants={fadeUp} className={styles.badge}>
              Careers & Contributions
            </motion.span>
            <motion.h1 variants={fadeUp} className={styles.title}>
              Build the Future of <br />
              <span className={styles.gradient}>Developer Tools</span>
            </motion.h1>
            <motion.p variants={fadeUp} className={styles.description}>
              C2X is an evolving developer-tool project focused on bringing coding, AI assistance, and real-time collaboration into one connected workspace.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            Why Build C2X?
          </motion.h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.title}
                benefit={benefit}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className={styles.positions}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            Open Positions
          </motion.h2>

          <div className={styles.filters}>
            {departments.map((dept) => (
              <button
                key={dept}
                className={`${styles.filterBtn} ${filter === dept ? styles.active : ""}`}
                onClick={() => setFilter(dept)}
              >
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.jobsGrid}>
            {filteredJobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className={styles.emptyState}>
              <p>No open positions in this department right now.</p>
            </div>
          )}
        </div>
      </section>

      {/* Hiring Process */}
      <section className={styles.hiringProcess}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            Engineering Hiring Process
          </motion.h2>
          <div className={styles.steps}>
            {hiringSteps.map((step, index) => (
              <HiringStep key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
