import FeaturePage from "./FeaturePage";
import { FEATURES } from "@/data/featureData";

const Debugger = (): React.ReactElement => {
  const feature = FEATURES.find((f) => f.slug === "debugger");
  return <FeaturePage feature={feature} />;
};

export default Debugger;
