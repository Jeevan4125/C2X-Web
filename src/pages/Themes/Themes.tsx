import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Themes.module.scss";
import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import SectionTitle from "@/components/common/SectionTitle";
import ThemeCard from "@/components/themes/ThemeCard";
import { cn } from "@/utils/helpers";
import type { EditorTheme, ThemeGroup } from "@/types";

const GROUPS: ThemeGroup[] = ["Dark", "Light", "High Contrast"];

const THEMES: EditorTheme[] = [
  { id: "t1", name: "Midnight Pro", author: "C2X", group: "Dark", downloads: "2.6M", colors: { background: "#09090b", panel: "#181818", accent: "#007acc", keyword: "#569cd6", string: "#ce9178", comment: "#6a9955", text: "#d4d4d4" } },
  { id: "t2", name: "Obsidian Grove", author: "ThemeForge", group: "Dark", downloads: "1.3M", colors: { background: "#0d1117", panel: "#161b22", accent: "#58a6ff", keyword: "#ff7b72", string: "#a5d6ff", comment: "#8b949e", text: "#c9d1d9" } },
  { id: "t3", name: "Nightowl", author: "OpenSource", group: "Dark", downloads: "980K", colors: { background: "#011627", panel: "#0e293f", accent: "#82aaff", keyword: "#c792ea", string: "#addb67", comment: "#637777", text: "#d6deeb" } },
  { id: "t4", name: "Paper Light", author: "C2X", group: "Light", downloads: "1.1M", colors: { background: "#ffffff", panel: "#f5f5f5", accent: "#007acc", keyword: "#0000ff", string: "#a31515", comment: "#008000", text: "#1e1e1e" } },
  { id: "t5", name: "Solstice", author: "ThemeForge", group: "Light", downloads: "640K", colors: { background: "#fdf6e3", panel: "#eee8d5", accent: "#268bd2", keyword: "#859900", string: "#2aa198", comment: "#93a1a1", text: "#586e75" } },
  { id: "t6", name: "Cotton", author: "OpenSource", group: "Light", downloads: "410K", colors: { background: "#faf9f7", panel: "#f0eeea", accent: "#5b6ee1", keyword: "#a626a4", string: "#50a14f", comment: "#a0a1a7", text: "#383a42" } },
  { id: "t7", name: "Contrast+", author: "Accessibility Labs", group: "High Contrast", downloads: "320K", colors: { background: "#000000", panel: "#0a0a0a", accent: "#3ffb9b", keyword: "#ffff00", string: "#00ffff", comment: "#7fff00", text: "#ffffff" } },
  { id: "t8", name: "Vivid Ink", author: "Accessibility Labs", group: "High Contrast", downloads: "205K", colors: { background: "#ffffff", panel: "#f0f0f0", accent: "#0000ee", keyword: "#d1004a", string: "#006400", comment: "#5a5a5a", text: "#000000" } },
  { id: "t9", name: "Blackout", author: "C2X", group: "High Contrast", downloads: "150K", colors: { background: "#000000", panel: "#111111", accent: "#ff9500", keyword: "#00d4ff", string: "#ffcc00", comment: "#8a8a8a", text: "#ffffff" } },
];

const Themes = (): React.ReactElement => {
  const [activeId, setActiveId] = useState(THEMES[0].id);
  const [group, setGroup] = useState<ThemeGroup>("Dark");

  const active = useMemo(() => THEMES.find((t) => t.id === activeId) ?? THEMES[0], [activeId]);
  const filtered = useMemo(() => THEMES.filter((t) => t.group === group), [group]);
  const c = active.colors;

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Themes"
        title="A color theme for every mood and monitor."
        description="Dozens of curated Dark, Light, and High Contrast themes — select one below to preview it instantly."
      >
        <motion.div
          className={styles.livePreview}
          animate={{ backgroundColor: c.background, borderColor: c.accent }}
          transition={{ duration: 0.4 }}
        >
          <motion.div className={styles.previewBar} animate={{ backgroundColor: c.panel }} transition={{ duration: 0.4 }}>
            <span style={{ background: "#ff5f57" }} />
            <span style={{ background: "#febc2e" }} />
            <span style={{ background: "#28c840" }} />
            <span className={styles.previewLabel} style={{ color: c.text, opacity: 0.6 }}>
              {active.name}.theme — live preview
            </span>
          </motion.div>
          <div className={styles.previewBody}>
            <div className={styles.previewLine}>
              <span style={{ color: c.keyword }}>import</span>
              <span style={{ color: c.text }}> {"{ Editor }"} </span>
              <span style={{ color: c.keyword }}>from</span>
              <span style={{ color: c.string }}> "@c2x/core"</span>
              <span style={{ color: c.text }}>;</span>
            </div>
            <div className={styles.previewLine}>
              <span style={{ color: c.comment }}>// {active.group} theme by {active.author}</span>
            </div>
            <div className={styles.previewLine}>
              <span style={{ color: c.keyword }}>export default function</span>
              <span style={{ color: c.text }}> App() {"{"}</span>
            </div>
            <div className={styles.previewLine}>
              <span style={{ color: c.text }}>  return </span>
              <span style={{ color: c.accent }}>{"<Editor theme=\""}{active.name}{"\" />"}</span>
              <span style={{ color: c.text }}>;</span>
            </div>
            <div className={styles.previewLine}>
              <span style={{ color: c.text }}>{"}"}</span>
            </div>
          </div>
        </motion.div>
      </PageHero>

      <section className="section-pad">
        <Container>
          <div className={styles.groupTabs} role="tablist" aria-label="Theme groups">
            {GROUPS.map((g) => (
              <button
                key={g}
                className={cn(styles.groupBtn, group === g && styles.active)}
                onClick={() => setGroup(g)}
              >
                {g}
              </button>
            ))}
          </div>

          <motion.div layout className={styles.grid}>
            {filtered.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} active={theme.id === activeId} onSelect={setActiveId} />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Why Personalize Themes */}
      <section className={styles.sectionBlock}>
        <Container>
          <SectionTitle
            eyebrow="Personalization"
            title="Optimized for focus & eye comfort"
            description="Syntax colors tailored to reduce cognitive fatigue during long development sessions."
          />
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>Dark Themes for Low Light</h3>
              <p>
                Deep background contrast minimizes glare and eye strain, keeping keywords and syntax tokens clearly distinguishable.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h3>High-Contrast Accessibility</h3>
              <p>
                Designed to comply with WCAG 2.1 AA contrast ratios, offering maximum legibility for low-vision developers.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h3>Light Themes for Daylight</h3>
              <p>
                Crisp, paper-like background palettes optimized for high ambient light environments and daytime coding.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Theme Configuration Guidance */}
      <section className={styles.sectionBlock}>
        <Container>
          <SectionTitle
            eyebrow="Configuration"
            title="Custom theme configuration"
            description="Configure your workspace theme in settings or customize token colors via JSON."
          />
          <pre className={styles.configCodeBlock}>
{`// .c2x/settings.json
{
  "workbench.colorTheme": "${active.name}",
  "editor.tokenColorCustomizations": {
    "comments": "${c.comment}",
    "keywords": "${c.keyword}",
    "strings": "${c.string}"
  }
}`}
          </pre>
        </Container>
      </section>
    </div>
  );
};

export default Themes;
