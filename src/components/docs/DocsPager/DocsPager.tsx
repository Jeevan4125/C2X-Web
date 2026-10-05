import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./DocsPager.module.scss";
import { getAdjacentDocs } from "@/data/docsNav";
import { cn } from "@/utils/helpers";

interface DocsPagerProps {
  currentPath: string;
}

/** Bottom-of-page Previous/Next links, derived from the docs flow order. */
const DocsPager = ({ currentPath }: DocsPagerProps): React.ReactElement => {
  const { prev, next } = getAdjacentDocs(currentPath);

  if (!prev && !next) return <></>;

  return (
    <div className={styles.pager}>
      {prev ? (
        <Link to={prev.path} className={cn(styles.card, styles.prev)}>
          <span className={styles.direction}>
            <ArrowLeft size={14} strokeWidth={2} />
            Previous
          </span>
          <span className={styles.label}>{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link to={next.path} className={cn(styles.card, styles.next)}>
          <span className={styles.direction}>
            Next
            <ArrowRight size={14} strokeWidth={2} />
          </span>
          <span className={styles.label}>{next.label}</span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
};

export default DocsPager;
