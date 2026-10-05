import { motion } from "framer-motion";
import styles from "./TagFilter.module.scss";
import { TAGS } from "@/data/tags";
import { cn } from "@/utils/helpers";

interface TagFilterProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  maxDisplay?: number;
}

const TagFilter = ({
  selectedTags,
  onChange,
  maxDisplay = 12,
}: TagFilterProps): React.ReactElement => {
  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter((t) => t !== tagId));
    } else {
      onChange([...selectedTags, tagId]);
    }
  };

  const clearTags = () => {
    onChange([]);
  };

  const displayedTags = TAGS.slice(0, maxDisplay);
  const hasMore = TAGS.length > maxDisplay;

  return (
    <div className={styles.tagFilter}>
      <div className={styles.header}>
        <span className={styles.label}>Filter by tags</span>
        {selectedTags.length > 0 && (
          <button className={styles.clear} onClick={clearTags}>
            Clear all
          </button>
        )}
      </div>
      <div className={styles.tags}>
        {displayedTags.map((tag) => {
          const isSelected = selectedTags.includes(tag.id);
          return (
            <motion.button
              key={tag.id}
              whileTap={{ scale: 0.95 }}
              className={cn(styles.tag, isSelected && styles.selected)}
              onClick={() => toggleTag(tag.id)}
              aria-pressed={isSelected}
              style={{
                borderColor: isSelected ? tag.color : undefined,
                color: isSelected ? tag.color : undefined,
              }}
            >
              {tag.icon && <span className={styles.tagIcon}>{tag.icon}</span>}
              {tag.label}
            </motion.button>
          );
        })}
        {hasMore && (
          <span className={styles.more}>+{TAGS.length - maxDisplay} more</span>
        )}
      </div>
    </div>
  );
};

export default TagFilter;
