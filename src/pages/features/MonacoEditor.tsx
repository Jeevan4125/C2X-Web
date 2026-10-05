import FeaturePage from "./FeaturePage";
import { FEATURES } from "@/data/featureData";

const MonacoEditor = (): React.ReactElement => {
  const feature = FEATURES.find((f) => f.slug === "monaco-editor");
  return <FeaturePage feature={feature} />;
};

export default MonacoEditor;
