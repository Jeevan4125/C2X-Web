import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import styles from "./Breadcrumb.module.scss";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/** Docs breadcrumb trail: Docs / Section / Current Page. */
const Breadcrumb = ({ items }: BreadcrumbProps): React.ReactElement => {
  return (
    <nav aria-label="Breadcrumb" className={styles.crumbs}>
      <Link to="/docs" className={styles.crumb}>
        <Home size={13} strokeWidth={2} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className={styles.segment}>
          <ChevronRight size={13} strokeWidth={2} className={styles.sep} />
          {item.path ? (
            <Link to={item.path} className={styles.crumb}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
