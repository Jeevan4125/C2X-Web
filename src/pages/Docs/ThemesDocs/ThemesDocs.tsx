import DocPage from "@/components/docs/DocPage";
import CodeBlock from "@/components/docs/CodeBlock";
import InfoBox from "@/components/docs/InfoBox";
import type { TocEntry } from "@/components/docs/TableOfContents";

const tocEntries: TocEntry[] = [
  { id: "overview", label: "Overview", depth: 2 },
  { id: "selecting-theme", label: "Selecting a Theme", depth: 2 },
  { id: "curated-palettes", label: "Curated Theme Palettes", depth: 2 },
  { id: "customizing-tokens", label: "Customizing Token Colors via JSON", depth: 2 },
];

const ThemesDocs = (): React.ReactElement => {
  return (
    <DocPage
      title="Themes Guide"
      description="Personalize C2X workbench appearance, syntax colors, dark/light themes, and WCAG accessibility contrast settings."
      breadcrumbLabel="Themes"
      readingTime={6}
      tocEntries={tocEntries}
    >
      <h2 id="overview">Overview</h2>
      <p>
        C2X includes a theme engine with built-in Dark, Light, and High-Contrast color palettes designed to minimize eye strain and maximize code legibility.
      </p>

      <h2 id="selecting-theme">Selecting a Theme</h2>
      <p>
        Open the Theme Picker via <code>Ctrl/Cmd + K</code> followed by <code>Ctrl/Cmd + T</code>, or via command palette (<code>Ctrl/Cmd + Shift + P</code> → <strong>Preferences: Color Theme</strong>). Use arrow keys to preview themes live before accepting.
      </p>

      <h2 id="curated-palettes">Curated Theme Palettes</h2>
      <ul>
        <li><strong>Midnight Pro (Default Dark):</strong> Deep dark background (<code>#09090b</code>) tuned for OLED screens and long coding sessions.</li>
        <li><strong>Obsidian Grove:</strong> Cool dark blue palette inspired by GitHub Dark.</li>
        <li><strong>Paper Light:</strong> Clean, high-contrast light theme for bright daylight environments.</li>
        <li><strong>Contrast+:</strong> High-contrast black background (<code>#000000</code>) meeting WCAG 2.1 AA accessibility ratios.</li>
      </ul>

      <h2 id="customizing-tokens">Customizing Token Colors via JSON</h2>
      <p>
        Override specific syntax colors or workbench UI tokens in your workspace settings file:
      </p>
      <CodeBlock
        language="json"
        filename=".c2x/settings.json"
        code={`{
  "workbench.colorTheme": "Midnight Pro",
  "editor.tokenColorCustomizations": {
    "comments": "#6a9955",
    "keywords": "#569cd6",
    "strings": "#ce9178",
    "functions": "#dcdcaa"
  }
}`}
      />
      <InfoBox title="Theme Extensions">
        You can also install third-party VS Code theme packages directly from the C2X Extension Marketplace.
      </InfoBox>
    </DocPage>
  );
};

export default ThemesDocs;
