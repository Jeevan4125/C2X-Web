import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import { fadeUp } from "@/animations/motion";

interface ComingSoonProps {
  title: string;
}

/**
 * Lightweight placeholder rendered for all routes scheduled for
 * later phases. Keeps the router fully wired without exposing
 * unfinished content as real pages.
 */
const ComingSoon = ({ title }: ComingSoonProps): React.ReactElement => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-center max-w-lg"
      >
        <div className="mx-auto mb-6 w-14 h-14 rounded-xl bg-panel border border-border flex items-center justify-center">
          <Construction size={26} className="text-accent" strokeWidth={1.75} />
        </div>
        <p className="text-eyebrow mb-3">Phase 2</p>
        <h1 className="text-h2 mb-4">{title}</h1>
        <p className="text-body mb-8">
          This section is under active development and will ship in the next
          release phase of the C2X website.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
