import FeaturePage from "./FeaturePage";
import { FEATURES } from "@/data/featureData";

const Docker = (): React.ReactElement => {
  const feature = FEATURES.find((f) => f.slug === "docker");
  return <FeaturePage feature={feature} />;
};

export default Docker;
