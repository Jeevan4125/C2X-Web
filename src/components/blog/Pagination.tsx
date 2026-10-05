import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.scss";
import { cn } from "@/utils/helpers";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps): React.ReactElement => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  if (totalPages <= 1) return <></>;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        className={cn(styles.button, styles.arrow)}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      <div className={styles.pages}>
        {getPageNumbers().map((page, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.95 }}
            className={cn(styles.button, page === currentPage && styles.active)}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </motion.button>
        ))}
      </div>

      <button
        className={cn(styles.button, styles.arrow)}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
