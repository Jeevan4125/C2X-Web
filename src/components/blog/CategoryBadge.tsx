import { Link } from "react-router-dom";
import styles from "./CategoryBadge.module.scss";
import { cn } from "@/utils/helpers";
import { CATEGORIES } from "@/data/categories";

interface CategoryBadgeProps {
  category: string;
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
}

const CategoryBadge = ({
  category,
  size = "md",
  clickable = false,
}: CategoryBadgeProps): React.ReactElement => {
  const categoryData = CATEGORIES.find((c) => c.id === category);

  if (!categoryData) {
    return <span className={cn(styles.badge, styles[size])}>{category}</span>;
  }

  const content = (
    <span
      className={cn(styles.badge, styles[size])}
      style={{
        backgroundColor: categoryData.color + "20",
        borderColor: categoryData.color,
        color: categoryData.color,
      }}
    >
      {categoryData.icon && (
        <span className={styles.icon}>{categoryData.icon}</span>
      )}
      {categoryData.label}
    </span>
  );

  if (clickable) {
    return <Link to={`/blog?category=${categoryData.id}`}>{content}</Link>;
  }

  return content;
};

export default CategoryBadge;
