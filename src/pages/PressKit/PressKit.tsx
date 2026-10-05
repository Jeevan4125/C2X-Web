import { motion } from "framer-motion";
import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import styles from "./PressKit.module.scss";
import { fadeUp, staggerContainer } from "@/animations/motion";
import { BRAND_ASSETS } from "@/data/brandAssets";
import PressAssetCard from "@/components/business/PressAssetCard";
import BrandColorCard from "@/components/business/BrandColorCard";
import Button from "@/components/common/Button/Button";

const PressKit = (): React.ReactElement => {
  const [copied, setCopied] = useState<string | null>(null);

  const typography = [
    {
      name: "Inter",
      category: "Primary",
      weight: "400-800",
      sample: "The quick brown fox",
    },
    {
      name: "JetBrains Mono",
      category: "Monospace",
      weight: "400-600",
      sample: "const code = 'hello';",
    },
  ];

  const brandColors = [
    { name: "Primary", hex: "#007acc", rgb: "0, 122, 204" },
    { name: "Primary Hover", hex: "#1b8fe0", rgb: "27, 143, 224" },
    { name: "Background", hex: "#09090b", rgb: "9, 9, 11" },
    { name: "Surface", hex: "#111111", rgb: "17, 17, 17" },
    { name: "Border", hex: "#2a2a2a", rgb: "42, 42, 42" },
    { name: "Text Primary", hex: "#ffffff", rgb: "255, 255, 255" },
    { name: "Text Secondary", hex: "#a1a1aa", rgb: "161, 161, 170" },
    { name: "Accent Dim", hex: "#0a5a96", rgb: "10, 90, 150" },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const mediaKitItems = [
    { label: "Logo Package", size: "2.4 MB", format: "ZIP" },
    { label: "Icon Set", size: "1.2 MB", format: "ZIP" },
    { label: "Screenshots", size: "8.6 MB", format: "ZIP" },
    { label: "Press Release", size: "0.3 MB", format: "PDF" },
    { label: "Brand Guidelines", size: "1.8 MB", format: "PDF" },
  ];

  return (
    <div className={styles.pressKit}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className={styles.heroContent}
          >
            <motion.span variants={fadeUp} className={styles.badge}>
              Press Kit
            </motion.span>
            <motion.h1 variants={fadeUp} className={styles.title}>
              Brand Assets & <br />
              <span className={styles.gradient}>Media Resources</span>
            </motion.h1>
            <motion.p variants={fadeUp} className={styles.description}>
              Everything you need to write about C2X. Logos, brand colors,
              typography, and media resources.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className={styles.assets}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            Brand Assets
          </motion.h2>
          <div className={styles.assetsGrid}>
            {BRAND_ASSETS.map((asset, index) => (
              <PressAssetCard key={asset.id} asset={asset} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Colors */}
      <section className={styles.colors}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            Brand Colors
          </motion.h2>
          <div className={styles.colorsGrid}>
            {brandColors.map((color, index) => (
              <BrandColorCard
                key={color.name}
                color={color}
                index={index}
                onCopy={() => handleCopy(color.hex, color.name)}
                copied={copied === color.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className={styles.typography}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            Typography
          </motion.h2>
          <div className={styles.typographyGrid}>
            {typography.map((font, index) => (
              <motion.div
                key={font.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index}
                className={styles.fontCard}
              >
                <div className={styles.fontHeader}>
                  <span className={styles.fontName}>{font.name}</span>
                  <span className={styles.fontCategory}>{font.category}</span>
                </div>
                <div
                  className={styles.fontSample}
                  style={{ fontFamily: font.name }}
                >
                  {font.sample}
                </div>
                <div className={styles.fontMeta}>
                  <span>Weight: {font.weight}</span>
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopy(font.name, `font-${font.name}`)}
                  >
                    {copied === `font-${font.name}` ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className={styles.mediaKit}>
        <div className={styles.container}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.sectionTitle}
          >
            Media Kit
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.mediaGrid}
          >
            {mediaKitItems.map((item) => (
              <div key={item.label} className={styles.mediaItem}>
                <div className={styles.mediaInfo}>
                  <span className={styles.mediaLabel}>{item.label}</span>
                  <span className={styles.mediaMeta}>
                    {item.size} • {item.format}
                  </span>
                </div>
                <Button variant="secondary" size="sm">
                  <Download size={14} />
                  Download
                </Button>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contact}>
        <div className={styles.container}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={styles.contactCard}
          >
            <h2>Press Contact</h2>
            <p>
              For media inquiries or brand asset permissions, please reach out to the C2X team.
            </p>
            <div className={styles.contactInfo}>
              <span className={styles.contactEmail}>press@c2x.dev</span>
              <span className={styles.contactResponse}>
                Response time: 24 hours
              </span>
            </div>
            <Button variant="primary">Email Press Team</Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PressKit;
