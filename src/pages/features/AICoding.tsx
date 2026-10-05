import FeaturePage from "./FeaturePage";
import { FEATURES } from "@/data/featureData";

const AICoding = (): React.ReactElement => {
  const feature = FEATURES.find((f) => f.slug === "ai-coding");
  return <FeaturePage feature={feature} />;
};

export default AICoding;
