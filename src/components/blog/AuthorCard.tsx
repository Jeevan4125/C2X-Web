import { motion } from "framer-motion";
import { Twitter, Github, Linkedin, Globe } from "lucide-react";
import styles from "./AuthorCard.module.scss";
import { fadeUp } from "@/animations/motion";
import type { Author } from "@/types/blog";

interface AuthorCardProps {
  author: Author;
}

const AuthorCard = ({ author }: AuthorCardProps): React.ReactElement => {
  const socialLinks = [
    { icon: Twitter, href: author.twitter, label: "Twitter" },
    { icon: Github, href: author.github, label: "GitHub" },
    { icon: Linkedin, href: author.linkedin, label: "LinkedIn" },
    { icon: Globe, href: author.website, label: "Website" },
  ].filter(
    (link): link is { icon: typeof Twitter; href: string; label: string } =>
      link.href !== null && link.href !== undefined,
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className={styles.card}
    >
      <div className={styles.avatar}>
        {author.avatar ? (
          <img src={author.avatar} alt={author.name} />
        ) : (
          <span>{author.initials}</span>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{author.name}</h3>
        <p className={styles.title}>{author.title}</p>
        <p className={styles.bio}>{author.bio}</p>

        {socialLinks.length > 0 && (
          <div className={styles.social}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AuthorCard;
