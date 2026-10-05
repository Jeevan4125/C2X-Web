import FeaturePage from "./FeaturePage";
import { FEATURES } from "@/data/featureData";

const SSHDevelopment = (): React.ReactElement => {
  const feature = FEATURES.find((f) => f.slug === "ssh-development");
  return <FeaturePage feature={feature} />;
};

export default SSHDevelopment;
