import { motion } from "framer-motion";
import { Download, FileImage, FileCode, File } from "lucide-react";
import styles from "./PressAssetCard.module.scss";
import { fadeUp } from "@/animations/motion";
import Button from "@/components/common/Button/Button";
import type { BrandAsset } from "@/types/brand";

interface PressAssetCardProps {
  asset: BrandAsset;
  index: number;
}

const PressAssetCard = ({
  asset,
  index,
}: PressAssetCardProps): React.ReactElement => {
  const getIcon = () => {
    switch (asset.type) {
      case "logo":
        return FileCode;
      case "icon":
        return FileImage;
      default:
        return File;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={index}
      className={styles.card}
    >
      <div className={styles.iconWrapper}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <div className={styles.info}>
        <h4 className={styles.name}>{asset.name}</h4>
        <div className={styles.meta}>
          <span className={styles.format}>{asset.format}</span>
          <span className={styles.size}>{asset.size}</span>
        </div>
      </div>
      <Button variant="secondary" size="sm" className={styles.downloadBtn}>
        <Download size={14} />
        Download
      </Button>
    </motion.div>
  );
};

export default PressAssetCard;
