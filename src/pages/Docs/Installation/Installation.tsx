import DocPage from "@/components/docs/DocPage";
import CodeBlock from "@/components/docs/CodeBlock";
import InfoBox from "@/components/docs/InfoBox";
import NoteBox from "@/components/docs/NoteBox";
import WarningBox from "@/components/docs/WarningBox";
import type { TocEntry } from "@/components/docs/TableOfContents";

const tocEntries: TocEntry[] = [
  { id: "system-requirements", label: "System Requirements", depth: 2 },
  { id: "windows", label: "Windows Installation", depth: 2 },
  { id: "macos", label: "macOS Installation", depth: 2 },
  { id: "linux", label: "Linux Installation", depth: 2 },
  { id: "post-install", label: "Post-Installation Verification", depth: 2 },
];

const Installation = (): React.ReactElement => {
  return (
    <DocPage
      title="Installation Guide"
      description="Detailed platform-specific installation instructions for C2X on Windows, macOS, and Linux."
      breadcrumbLabel="Installation"
      readingTime={8}
      tocEntries={tocEntries}
    >
      <h2 id="system-requirements">System Requirements</h2>
      <p>
        C2X is optimized for high performance and low resource footprint. Review the minimum and recommended system requirements below before installing:
      </p>
      <ul>
        <li><strong>Operating System:</strong> Windows 10 (1909+), macOS 12 Monterey+, or Linux (glibc 2.28+).</li>
        <li><strong>Processor:</strong> Dual-core 1.6 GHz or faster (Quad-core recommended).</li>
        <li><strong>Memory:</strong> 4 GB RAM minimum (16 GB recommended for large monorepos).</li>
        <li><strong>Disk Space:</strong> 1 GB available storage (SSD recommended).</li>
        <li><strong>Display:</strong> 1280×800 minimum screen resolution.</li>
      </ul>

      <h2 id="windows">Windows Installation</h2>
      <p>
        On Windows, C2X is available as a User Installer (recommended for single users), System Installer (requires Administrator privileges), or portable ZIP package.
      </p>
      <h3>Installing via Package Manager (Winget)</h3>
      <CodeBlock
        language="powershell"
        filename="PowerShell"
        code={`# Install C2X via Windows Package Manager
winget install C2X.IDE`}
      />
      <NoteBox title="User Installer vs System Installer">
        The User Installer places C2X in your local user directory without requiring Administrator rights and supports automatic background updates.
      </NoteBox>

      <h2 id="macos">macOS Installation</h2>
      <p>
        C2X supports both Apple Silicon (M1/M2/M3) and Intel Macs running macOS 12 Monterey or later.
      </p>
      <h3>Installing via Homebrew</h3>
      <CodeBlock
        language="bash"
        filename="Terminal"
        code={`# Install C2X cask via Homebrew
brew install --cask c2x`}
      />
      <InfoBox title="Apple Silicon Optimization">
        The Apple Silicon DMG build is natively compiled for ARM64, delivering up to 3x faster startup times and lower battery consumption.
      </InfoBox>

      <h2 id="linux">Linux Installation</h2>
      <p>
        C2X provides native packages for Debian/Ubuntu (<code>.deb</code>), Fedora/RHEL (<code>.rpm</code>), and distro-agnostic AppImages.
      </p>
      <h3>Installing AppImage</h3>
      <CodeBlock
        language="bash"
        filename="Terminal"
        code={`# Download and grant execution permission
chmod +x C2X-2.4.1.AppImage
./C2X-2.4.1.AppImage`}
      />

      <h2 id="post-install">Post-Installation Verification</h2>
      <p>
        Verify that C2X is correctly installed and registered in your shell PATH by checking the executable version:
      </p>
      <CodeBlock
        language="bash"
        filename="Terminal"
        code={`c2x --version`}
      />
      <WarningBox title="PATH Registration">
        If <code>c2x</code> command is not recognized, open C2X, press <code>Ctrl+Shift+P</code> / <code>Cmd+Shift+P</code>, and select <strong>Shell Command: Install 'c2x' command in PATH</strong>.
      </WarningBox>
    </DocPage>
  );
};

export default Installation;
