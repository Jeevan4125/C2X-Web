import { useEffect, type ReactNode } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import styles from "./DocPage.module.scss";
import Breadcrumb from "@/components/docs/Breadcrumb";
import DocsPager from "@/components/docs/DocsPager";
import type { DocsOutletContext } from "@/layouts/DocsLayout";
import type { TocEntry } from "@/components/docs/TableOfContents";
import { fadeUp } from "@/animations/motion";

interface DocPageProps {
  title: string;
  description: string;
  breadcrumbLabel: string;
  readingTime: number;
  tocEntries: TocEntry[];
  children: ReactNode;
}

/**
 * Common page chrome for every documentation article: breadcrumb, title
 * block with reading time, animated entrance, TOC registration with the
 * DocsLayout, and the prev/next pager at the bottom.
 */
const DocPage = ({
  title,
  description,
  breadcrumbLabel,
  readingTime,
  tocEntries,
  children,
}: DocPageProps): React.ReactElement => {
  const { setTocEntries } = useOutletContext<DocsOutletContext>();
  const location = useLocation();

  useEffect(() => {
    setTocEntries(tocEntries);
    return () => setTocEntries([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <motion.article
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className={styles.page}
    >
      <Breadcrumb items={[{ label: breadcrumbLabel }]} />

      <header className={styles.header}>
        <h1 className={`text-h1 ${styles.title}`}>{title}</h1>
        <p className={`text-body-lg ${styles.description}`}>{description}</p>
        <div className={styles.meta}>
          <Clock size={13} strokeWidth={2} />
          <span>{readingTime} min read</span>
        </div>
      </header>

      <div className={styles.body}>{children}</div>

      <DocsPager currentPath={location.pathname} />
    </motion.article>
  );
};

export default DocPage;
