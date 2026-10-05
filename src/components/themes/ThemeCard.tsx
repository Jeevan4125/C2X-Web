import { motion } from "framer-motion";
import { Download, Check } from "lucide-react";
import styles from "./ThemeCard.module.scss";
import { cn } from "@/utils/helpers";
import { cardHover } from "@/animations/motion";
import type { EditorTheme } from "@/types";

interface ThemeCardProps {
  theme: EditorTheme;
  active: boolean;
  onSelect: (id: string) => void;
}

/**
 * Theme gallery card: a miniature editor screenshot rendered from the
 * theme's own color tokens, plus name, author, and install action.
 * Clicking previews the theme in the page's live preview panel.
 */
const ThemeCard = ({ theme, active, onSelect }: ThemeCardProps): React.ReactElement => {
  const { colors } = theme;

  return (
    <motion.button
      layout
      whileHover={cardHover}
      onClick={() => onSelect(theme.id)}
      className={cn(styles.card, active && styles.active)}
      aria-pressed={active}
    >
      <div className={styles.screenshot} style={{ backgroundColor: colors.background }}>
        <div className={styles.screenshotBar} style={{ backgroundColor: colors.panel }}>
          <span style={{ background: "#ff5f57" }} />
          <span style={{ background: "#febc2e" }} />
          <span style={{ background: "#28c840" }} />
        </div>
        <div className={styles.screenshotBody}>
          <div className={styles.screenshotLine}>
            <span style={{ color: colors.keyword }}>const</span>
            <span style={{ color: colors.text }}> theme = </span>
            <span style={{ color: colors.string }}>"{theme.name}"</span>
          </div>
          <div className={styles.screenshotLine}>
            <span style={{ color: colors.comment }}>// {theme.group.toLowerCase()} theme</span>
          </div>
          <div className={styles.screenshotLine}>
            <span style={{ color: colors.accent }}>render</span>
            <span style={{ color: colors.text }}>(theme);</span>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <div>
          <p className={styles.name}>{theme.name}</p>
          <p className={styles.author}>{theme.author}</p>
        </div>
        {active && (
          <span className={styles.activeBadge}>
            <Check size={12} />
          </span>
        )}
      </div>

      <div className={styles.tokens}>
        {Object.values(colors).map((c, i) => (
          <span key={i} className={styles.token} style={{ backgroundColor: c }} />
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.downloads}>
          <Download size={12} /> {theme.downloads}
        </span>
        <span className={styles.installLabel}>{active ? "Previewing" : "Preview"}</span>
      </div>
    </motion.button>
  );
};

export default ThemeCard;
