import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Clock, DollarSign, ArrowRight } from "lucide-react";
import styles from "./JobCard.module.scss";
import { fadeUp } from "@/animations/motion";
import type { Job } from "@/types/jobs";

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard = ({ job, index }: JobCardProps): React.ReactElement => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index}
      className={styles.card}
    >
      <Link to={`/careers/${job.id}`} className={styles.link}>
        <div className={styles.header}>
          <div className={styles.badge}>{job.department}</div>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <MapPin size={14} />
              {job.location}
            </span>
            <span className={styles.metaItem}>
              <Briefcase size={14} />
              {job.type}
            </span>
          </div>
        </div>

        <h3 className={styles.title}>{job.title}</h3>
        <p className={styles.overview}>{job.overview}</p>

        <div className={styles.footer}>
          <div className={styles.details}>
            <span className={styles.detail}>
              <Clock size={14} />
              {job.experience}
            </span>
            <span className={styles.detail}>
              <DollarSign size={14} />
              {job.salary}
            </span>
          </div>
          <span className={styles.apply}>
            Apply Now
            <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default JobCard;
