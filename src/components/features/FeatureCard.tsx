import { motion } from "framer-motion";
import { Check, ChevronRight, GitCommit, TerminalSquare } from "lucide-react";
import styles from "./FeatureCard.module.scss";
import { cn } from "@/utils/helpers";
import { fadeUp, viewportOnce, cardHover } from "@/animations/motion";
import type { DetailedFeature } from "@/types";

interface FeatureCardProps {
  feature: DetailedFeature;
  index: number;
}

/**
 * Feature showcase card: icon, title, description, and a small
 * interactive-feeling preview panel that reveals detail on hover.
 * Reused across the Features page and other Phase 2A capability grids.
 */
const FeatureCard = ({ feature, index }: FeatureCardProps): React.ReactElement => {
  const { icon: Icon, title, description, preview } = feature;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      custom={index % 4}
      whileHover={cardHover}
      className={styles.card}
    >
      <div className={styles.icon}>
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={cn("text-small", styles.description)}>{description}</p>

      <div className={styles.previewWrap}>
        {preview.kind === "code" && (
          <div className={styles.codePreview}>
            {preview.lines.map((line, i) => (
              <div key={i} className={styles.codeLine}>
                <span className={styles.lineNum}>{i + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        )}

        {preview.kind === "terminal" && (
          <div className={styles.terminalPreview}>
            <TerminalSquare size={12} className={styles.terminalIcon} />
            <div>
              {preview.lines.map((line, i) => (
                <div key={i} className={styles.terminalLine}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {preview.kind === "nodes" && (
          <div className={styles.nodesPreview}>
            {preview.lines.map((line, i) => (
              <div key={i} className={styles.node}>
                <GitCommit size={12} />
                <span>{line}</span>
              </div>
            ))}
          </div>
        )}

        {preview.kind === "badge" && (
          <div className={styles.badgePreview}>
            {preview.lines.map((line, i) => (
              <span key={i} className={styles.badge}>
                <Check size={11} /> {line}
              </span>
            ))}
          </div>
        )}

        {preview.kind === "diff" && (
          <div className={styles.diffPreview}>
            {preview.lines.map((line, i) => (
              <div
                key={i}
                className={cn(
                  styles.diffLine,
                  line.startsWith("+") && styles.added,
                  line.startsWith("-") && styles.removed
                )}
              >
                {line}
              </div>
            ))}
          </div>
        )}

        <div className={styles.previewFooter}>
          <span>View details</span>
          <ChevronRight size={13} />
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
