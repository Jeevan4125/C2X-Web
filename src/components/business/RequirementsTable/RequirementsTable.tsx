import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import styles from "./RequirementsTable.module.scss";
import { fadeUp, viewportOnce } from "@/animations/motion";
import type { ChecksumEntry } from "@/types";

interface RequirementsTableProps {
  entries: ChecksumEntry[];
}

/**
 * SHA-256 checksum table for verifying Download page artifacts.
 * Despite the name (matching the requested component set), this
 * renders the Checksums section — a compact, copyable data table.
 */
const RequirementsTable = ({ entries }: RequirementsTableProps): React.ReactElement => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, value: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1800);
    } catch {
      // Clipboard API unavailable — silently ignore.
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className={styles.wrapper}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Platform</th>
            <th scope="col">File</th>
            <th scope="col">SHA-256</th>
            <th scope="col" className={styles.actionCol}>
              <span className="sr-only">Copy</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className={styles.platformCell}>{entry.platform}</td>
              <td className={styles.fileCell}>{entry.fileName}</td>
              <td className={styles.hashCell}>
                <span className={styles.hashText}>{entry.sha256}</span>
              </td>
              <td className={styles.actionCol}>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() => handleCopy(entry.id, entry.sha256)}
                  aria-label={`Copy checksum for ${entry.fileName}`}
                >
                  {copiedId === entry.id ? (
                    <Check size={14} strokeWidth={2.25} />
                  ) : (
                    <Copy size={14} strokeWidth={2} />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default RequirementsTable;
