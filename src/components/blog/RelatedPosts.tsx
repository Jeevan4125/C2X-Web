import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import styles from "./RelatedPosts.module.scss";
import CategoryBadge from "./CategoryBadge";
import { formatDate } from "@/utils/helpers";
import { fadeUp } from "@/animations/motion";
import type { BlogPost } from "@/types/blog";

interface RelatedPostsProps {
  posts: BlogPost[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps): React.ReactElement => {
  if (posts.length === 0) return <></>;

  return (
    <section className={styles.related}>
      <h2 className={styles.title}>Related Articles</h2>
      <div className={styles.grid}>
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className={styles.card}
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
                </div>
              )}
              <div className={styles.content}>
                <CategoryBadge category={post.category} />
                <h3 className={styles.postTitle}>{post.title}</h3>
                <div className={styles.meta}>
                  <span className={styles.date}>
                    <Calendar size={12} />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className={styles.readTime}>
                    <Clock size={12} />
                    {post.readingTime} min read
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
