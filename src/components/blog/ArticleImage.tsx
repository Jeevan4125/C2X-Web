import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageOff } from "lucide-react";
import styles from "./ArticleImage.module.scss";
import { cn } from "@/utils/helpers";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string | null;
  className?: string;
  aspectRatio?: "auto" | "16:9" | "4:3" | "1:1";
}

const ArticleImage = ({
  src,
  alt,
  caption,
  className,
  aspectRatio = "auto",
}: ArticleImageProps): React.ReactElement => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={cn(styles.figure, className)}>
      <div
        className={cn(
          styles.wrapper,
          aspectRatio !== "auto" &&
            styles[`ratio-${aspectRatio.replace(":", "-")}`],
        )}
      >
        <AnimatePresence mode="wait">
          {!error ? (
            <motion.img
              key="image"
              src={src}
              alt={alt}
              className={cn(styles.image, loaded && styles.loaded)}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              key="error"
              className={styles.error}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ImageOff size={32} />
              <span>Failed to load image</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
};

export default ArticleImage;
