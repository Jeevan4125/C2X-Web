import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import styles from "./FeaturedArticle.module.scss";
import CategoryBadge from "./CategoryBadge";
import { formatDate } from "@/utils/helpers";
import { fadeUp } from "@/animations/motion";
import type { BlogPost } from "@/types/blog";

interface FeaturedArticleProps {
  post: BlogPost;
}

const FeaturedArticle = ({
  post,
}: FeaturedArticleProps): React.ReactElement => {
  return (
    <motion.article
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className={styles.featured}
    >
      <Link to={`/blog/${post.slug}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img
            src={post.heroImage || "/images/featured-placeholder.jpg"}
            alt={post.title}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <CategoryBadge category={post.category} size="lg" />

          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.meta}>
            <div className={styles.author}>
              <User size={16} />
              <span>{post.authorName}</span>
            </div>
            <div className={styles.date}>
              <Calendar size={16} />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className={styles.readTime}>
              <Clock size={16} />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          <div className={styles.readMore}>
            Read Article
            <ArrowRight size={18} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default FeaturedArticle;
