import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";
import styles from "./TeamCard.module.scss";
import { fadeUp } from "@/animations/motion";
import type { TeamMember } from "@/types/team";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps): React.ReactElement => {
  const socials = [
    { icon: Github, url: member.socials?.github, label: "GitHub" },
    { icon: Twitter, url: member.socials?.twitter, label: "Twitter" },
    { icon: Linkedin, url: member.socials?.linkedin, label: "LinkedIn" },
  ].filter((s) => s.url);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index}
      className={styles.card}
    >
      <div className={styles.avatar}>
        <img src={member.avatar} alt={member.name} />
      </div>
      <h3 className={styles.name}>{member.name}</h3>
      <p className={styles.role}>{member.role}</p>
      <p className={styles.bio}>{member.bio}</p>
      {socials.length > 0 && (
        <div className={styles.socials}>
          {socials.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TeamCard;
