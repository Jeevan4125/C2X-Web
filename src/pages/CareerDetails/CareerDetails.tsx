import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Check,
  ArrowRight,
} from "lucide-react";
import styles from "./CareerDetails.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { JOBS } from "@/data/jobs";
import Button from "@/components/common/Button/Button";
import type { Job } from "@/types/jobs";

const CareerDetails = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const foundJob = JOBS.find((j) => j.id === id);
    if (foundJob) {
      setJob(foundJob);
    } else {
      navigate("/careers", { replace: true });
    }
  }, [id, navigate]);

  if (!job) {
    return (
      <div className={styles.loading}>
        <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  const relatedJobs = JOBS.filter(
    (j) => j.id !== job.id && j.department === job.department,
  ).slice(0, 3);

  return (
    <div className={styles.careerDetails}>
      <div className={styles.navBar}>
        <div className={styles.navContent}>
          <Link to="/careers" className={styles.backLink}>
            <ArrowLeft size={18} />
            Back to Careers
          </Link>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className={styles.content}
      >
        {/* Header */}
        <header className={styles.header}>
          <motion.div variants={fadeUp} className={styles.badge}>
            {job.department}
          </motion.div>
          <motion.h1 variants={fadeUp} className={styles.title}>
            {job.title}
          </motion.h1>
          <motion.div variants={fadeUp} className={styles.meta}>
            <span className={styles.metaItem}>
              <MapPin size={16} />
              {job.location}
            </span>
            <span className={styles.metaItem}>
              <Briefcase size={16} />
              {job.type}
            </span>
            <span className={styles.metaItem}>
              <Clock size={16} />
              {job.experience}
            </span>
            <span className={styles.metaItem}>
              <DollarSign size={16} />
              {job.salary}
            </span>
          </motion.div>
        </header>

        <div className={styles.grid}>
          {/* Main Content */}
          <div className={styles.main}>
            <section className={styles.section}>
              <h2>Role Overview</h2>
              <p>{job.overview}</p>
            </section>

            <section className={styles.section}>
              <h2>Key Responsibilities</h2>
              <ul className={styles.list}>
                {job.responsibilities.map((item, index) => (
                  <li key={index}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2>Requirements</h2>
              <ul className={styles.list}>
                {job.requirements.map((item, index) => (
                  <li key={index}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2>Benefits</h2>
              <ul className={styles.list}>
                {job.benefits.map((item, index) => (
                  <li key={index}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className={styles.applySection}>
              <Button variant="primary" size="lg" fullWidth>
                Apply Now
                <ArrowRight size={18} />
              </Button>
              <p className={styles.applyNote}>
                We'll review your application and get back to you within 48
                hours.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3>Job Details</h3>
              <dl>
                <dt>Department</dt>
                <dd>{job.department}</dd>
                <dt>Location</dt>
                <dd>{job.location}</dd>
                <dt>Employment Type</dt>
                <dd>{job.type}</dd>
                <dt>Experience</dt>
                <dd>{job.experience}</dd>
                <dt>Salary Range</dt>
                <dd>{job.salary}</dd>
              </dl>
            </div>

            {relatedJobs.length > 0 && (
              <div className={styles.sidebarCard}>
                <h3>Similar Positions</h3>
                <div className={styles.relatedJobs}>
                  {relatedJobs.map((related) => (
                    <Link
                      key={related.id}
                      to={`/careers/${related.id}`}
                      className={styles.relatedJob}
                    >
                      <span className={styles.relatedTitle}>
                        {related.title}
                      </span>
                      <span className={styles.relatedDept}>
                        {related.department}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </motion.div>
    </div>
  );
};

export default CareerDetails;
