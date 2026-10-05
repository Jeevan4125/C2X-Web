export interface BrandAsset {
  id: string;
  name: string;
  type: "logo" | "icon" | "asset";
  format: string;
  size: string;
  url: string;
}
