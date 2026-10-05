import { Calendar, Clock, User, Tag } from "lucide-react";
import styles from "./ArticleHeader.module.scss";
import CategoryBadge from "./CategoryBadge";
import { formatDate } from "@/utils/helpers";
import type { BlogPost } from "@/types/blog";
import type { Author } from "@/types/blog";

interface ArticleHeaderProps {
  post: BlogPost;
  author?: Author;
}

const ArticleHeader = ({
  post,
  author,
}: ArticleHeaderProps): React.ReactElement => {
  return (
    <header className={styles.header}>
      <div className={styles.meta}>
        <CategoryBadge category={post.category} size="lg" />
        <span className={styles.date}>
          <Calendar size={16} />
          {formatDate(post.publishedAt)}
        </span>
        <span className={styles.readTime}>
          <Clock size={16} />
          {post.readingTime} min read
        </span>
      </div>

      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.excerpt}>{post.excerpt}</p>

      {author && (
        <div className={styles.author}>
          <div className={styles.avatar}>
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} />
            ) : (
              <span>{author.initials}</span>
            )}
          </div>
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>{author.name}</span>
            <span className={styles.authorTitle}>{author.title}</span>
          </div>
        </div>
      )}

      <div className={styles.tags}>
        <Tag size={14} />
        {post.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>
    </header>
  );
};

export default ArticleHeader;
