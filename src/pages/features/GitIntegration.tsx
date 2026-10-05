import FeaturePage from "./FeaturePage";
import { FEATURES } from "@/data/featureData";

const GitIntegration = (): React.ReactElement => {
  const feature = FEATURES.find((f) => f.slug === "git-integration");
  return <FeaturePage feature={feature} />;
};

export default GitIntegration;
