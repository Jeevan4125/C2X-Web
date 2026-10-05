import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Tag, Menu, X } from "lucide-react";
import styles from "./BlogPost.module.scss";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleImage from "@/components/blog/ArticleImage";
import CodeSnippet from "@/components/blog/CodeSnippet";
import QuoteBlock from "@/components/blog/QuoteBlock";
import CalloutBox from "@/components/blog/CalloutBox";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedPosts from "@/components/blog/RelatedPosts";
import AuthorCard from "@/components/blog/AuthorCard";
import ReadingProgress from "@/components/blog/ReadingProgress";
import StickyTOC from "@/components/blog/StickyTOC";
import { BLOG_POSTS } from "@/data/blogPosts";
import { AUTHORS } from "@/data/authors";
import { fadeUp } from "@/animations/motion";
import { formatDate } from "@/utils/helpers";
import type { BlogPost as BlogPostType, TocEntry } from "@/types/blog";

const BlogPost = (): React.ReactElement => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    const foundPost = BLOG_POSTS.find((p) => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate("/blog", { replace: true });
    }
  }, [slug, navigate]);

  useEffect(() => {
    if (mobileTocOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileTocOpen]);

  if (!post) {
    return (
      <div className={styles.loading}>
        <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  const author = AUTHORS.find((a) => a.id === post.authorId);
  const relatedPosts = BLOG_POSTS.filter(
    (p) =>
      p.id !== post.id &&
      (p.category === post.category ||
        p.tags.some((tag) => post.tags.includes(tag))),
  ).slice(0, 3);

  const tocEntries: TocEntry[] =
    post.headings?.map((heading) => ({
      id: heading.id,
      label: heading.text,
      depth: heading.depth,
    })) || [];

  return (
    <div className={styles.blogPost}>
      <ReadingProgress target={contentRef} />

      <div className={styles.navBar}>
        <div className={styles.navContent}>
          <Link to="/blog" className={styles.backLink}>
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
          <button
            className={styles.mobileTocToggle}
            onClick={() => setMobileTocOpen(true)}
            aria-label="Open table of contents"
          >
            <Menu size={18} />
            Contents
          </button>
        </div>
      </div>

      <div className={styles.articleWrapper}>
        <div className={styles.articleContainer}>
          {/* Left Column - Table of Contents */}
          <aside className={styles.tocColumn}>
            <StickyTOC entries={tocEntries} />
          </aside>

          {/* Middle Column - Main Article */}
          <motion.article
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className={styles.articleColumn}
          >
            <ArticleHeader post={post} author={author} />

            {post.heroImage && (
              <div className={styles.heroImage}>
                <ArticleImage
                  src={post.heroImage}
                  alt={post.title}
                  caption={post.imageCaption}
                />
              </div>
            )}

            <div ref={contentRef} className={styles.content}>
              {post.contentBlocks?.map((block, index) => {
                switch (block.type) {
                  case "paragraph":
                    return (
                      <p key={index} className={styles.paragraph}>
                        {block.content}
                      </p>
                    );
                  case "heading":
                    return (
                      <h2 key={index} id={block.id} className={styles.heading}>
                        {block.content}
                      </h2>
                    );
                  case "code":
                    return (
                      <CodeSnippet
                        key={index}
                        code={block.code || ""}
                        language={block.language || "typescript"}
                        title={block.caption || undefined}
                      />
                    );
                  case "image":
                    return (
                      <ArticleImage
                        key={index}
                        src={block.src || ""}
                        alt={block.caption || ""}
                        caption={block.caption}
                      />
                    );
                  case "quote":
                    return (
                      <QuoteBlock
                        key={index}
                        quote={block.content || ""}
                        author={block.author || undefined}
                      />
                    );
                  case "callout":
                    return (
                      <CalloutBox
                        key={index}
                        type={block.calloutType || "info"}
                        title={block.title || undefined}
                      >
                        {block.content}
                      </CalloutBox>
                    );
                  default:
                    return null;
                }
              })}

              <div className={styles.metaFooter}>
                <div className={styles.tags}>
                  <Tag size={16} />
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog?tag=${tag}`}
                      className={styles.tag}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <Calendar size={16} />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className={styles.metaItem}>
                    <Clock size={16} />
                    {post.readingTime} min read
                  </span>
                  {author && (
                    <span className={styles.metaItem}>
                      <User size={16} />
                      {author.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.article>

          {/* Right Column - Share */}
          <aside className={styles.shareColumn}>
            <div className={styles.shareSection}>
              <ShareButtons
                title={post.title}
                url={`https://c2x.dev/blog/${post.slug}`}
              />
            </div>
          </aside>
        </div>
      </div>

      {author && (
        <div className={styles.authorSection}>
          <AuthorCard author={author} />
        </div>
      )}

      {relatedPosts.length > 0 && (
        <div className={styles.relatedSection}>
          <RelatedPosts posts={relatedPosts} />
        </div>
      )}

      {/* Mobile TOC Overlay */}
      <AnimatePresence>
        {mobileTocOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.mobileTocOverlay}
              onClick={() => setMobileTocOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={styles.mobileTocPanel}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h3
                  style={{
                    color: "var(--color-text-primary)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  On this page
                </h3>
                <button
                  onClick={() => setMobileTocOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--color-text-secondary)",
                  }}
                  aria-label="Close table of contents"
                >
                  <X size={20} />
                </button>
              </div>
              <StickyTOC entries={tocEntries} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPost;
