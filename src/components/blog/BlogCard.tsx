import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import styles from "./BlogCard.module.scss";
import CategoryBadge from "./CategoryBadge";
import { formatDate } from "@/utils/helpers";
import { fadeUp } from "@/animations/motion";
import { cn } from "@/utils/helpers";
import type { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

const BlogCard = ({
  post,
  index = 0,
  featured = false,
}: BlogCardProps): React.ReactElement => {
  return (
    <motion.article
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className={cn(styles.card, featured && styles.featured)}
    >
      <Link to={`/blog/${post.slug}`} className={styles.link}>
        {post.heroImage && (
          <div className={styles.imageWrapper}>
            <img
              src={post.heroImage}
              alt={post.title}
              className={styles.image}
              loading="lazy"
            />
            {post.featured && (
              <span className={styles.featuredBadge}>Featured</span>
            )}
          </div>
        )}

        <div className={styles.body}>
          <div className={styles.meta}>
            <CategoryBadge category={post.category} />
            <span className={styles.date}>
              <Calendar size={14} />
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.footer}>
            <div className={styles.author}>
              <User size={14} />
              <span>{post.authorName}</span>
            </div>
            <div className={styles.readTime}>
              <Clock size={14} />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
