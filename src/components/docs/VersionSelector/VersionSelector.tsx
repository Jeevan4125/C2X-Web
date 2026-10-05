import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import styles from "./VersionSelector.module.scss";
import { cn } from "@/utils/helpers";

const VERSIONS = ["v2.4 (latest)", "v2.3", "v2.2", "v2.1"];

/**
 * Docs version dropdown shown in the sidebar header. Phase 3A only ships
 * "latest" content, so switching versions is presentational for now.
 */
const VersionSelector = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(VERSIONS[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected}</span>
        <ChevronDown size={14} strokeWidth={2} className={cn(styles.chevron, open && styles.open)} />
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {VERSIONS.map((version) => (
            <li key={version}>
              <button
                type="button"
                className={styles.option}
                role="option"
                aria-selected={selected === version}
                onClick={() => {
                  setSelected(version);
                  setOpen(false);
                }}
              >
                <span>{version}</span>
                {selected === version && <Check size={14} strokeWidth={2} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VersionSelector;
