import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import styles from "./Blog.module.scss";
import BlogHero from "@/components/blog/BlogHero";
import BlogCard from "@/components/blog/BlogCard";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import BlogSearch from "@/components/blog/BlogSearch";
import TagFilter from "@/components/blog/TagFilter";
import Pagination from "@/components/blog/Pagination";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import { BLOG_POSTS } from "@/data/blogPosts";
import { CATEGORIES } from "@/data/categories";
import { TAGS } from "@/data/tags";
import { fadeUp } from "@/animations/motion";
import { cn } from "@/utils/helpers";

const POSTS_PER_PAGE = 6;

const Blog = (): React.ReactElement => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    let posts = BLOG_POSTS;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    if (selectedCategory) {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      posts = posts.filter((post) =>
        selectedTags.some((tag) => post.tags.includes(tag)),
      );
    }

    return posts;
  }, [searchQuery, selectedCategory, selectedTags]);

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  const totalPages = Math.ceil(regularPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = regularPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery || selectedCategory || selectedTags.length > 0;

  return (
    <div className={styles.blog}>
      <BlogHero />

      <div className={styles.content}>
        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <BlogSearch
              value={searchQuery}
              onChange={(value) => {
                setSearchQuery(value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className={styles.filters}>
            <TagFilter
              selectedTags={selectedTags}
              onChange={(tags) => {
                setSelectedTags(tags);
                setCurrentPage(1);
              }}
            />
          </div>
          {hasActiveFilters && (
            <button
              className={styles.clearFilters}
              onClick={handleClearFilters}
              aria-label="Clear all filters"
            >
              <X size={16} />
              Clear filters
            </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className={styles.emptyState}
          >
            <Search size={48} strokeWidth={1.5} />
            <h3>No posts found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button className={styles.resetBtn} onClick={handleClearFilters}>
              Reset filters
            </button>
          </motion.div>
        ) : (
          <>
            {featuredPost && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className={styles.featuredSection}
              >
                <FeaturedArticle post={featuredPost} />
              </motion.div>
            )}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={styles.grid}
            >
              {paginatedPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>

      <NewsletterCTA />
    </div>
  );
};

export default Blog;
