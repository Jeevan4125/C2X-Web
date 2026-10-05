import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Apple,
  Terminal as LinuxIcon,
  Cpu,
  MemoryStick,
  HardDrive,
  MonitorCheck,
  Rocket,
  FlaskConical,
  Moon,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import styles from "./Download.module.scss";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import PageHero from "@/components/common/PageHero";
import PlatformCard from "@/components/business/PlatformCard";
import SystemRequirementCard from "@/components/business/SystemRequirementCard";
import VersionCard from "@/components/business/VersionCard";
import RequirementsTable from "@/components/business/RequirementsTable";
import { fadeUp, viewportOnce, staggerContainer } from "@/animations/motion";
import { cn } from "@/utils/helpers";
import type {
  Platform,
  SystemRequirement,
  InstallStep,
  ReleaseChannel,
  ChecksumEntry,
  VersionEntry,
} from "@/types";

const PLATFORMS: Platform[] = [
  {
    id: "windows",
    icon: Monitor,
    name: "Windows",
    tagline: "Windows 10 and 11, 64-bit.",
    downloads: [
      {
        id: "win-exe",
        label: "User Installer",
        format: ".exe",
        size: "94 MB",
        href: "/downloads/C2X-IDE-Setup-1.0.0.exe",
      },
      {
        id: "win-msi",
        label: "System Installer",
        format: ".msi",
        size: "96 MB",
        href: "#",
      },
      {
        id: "win-zip",
        label: "Portable",
        format: ".zip",
        size: "112 MB",
        href: "#",
      },
      {
        id: "win-arm",
        label: "ARM64",
        format: ".exe",
        size: "91 MB",
        href: "#",
      },
    ],
    recommended: "Most users should choose the User Installer.",
  },
  {
    id: "macos",
    icon: Apple,
    name: "macOS",
    tagline: "macOS 12 Monterey or later.",
    downloads: [
      {
        id: "mac-intel",
        label: "Intel Chip",
        format: ".dmg",
        size: "128 MB",
        href: "#",
      },
      {
        id: "mac-arm",
        label: "Apple Silicon",
        format: ".dmg",
        size: "121 MB",
        href: "#",
      },
      {
        id: "mac-zip",
        label: "Portable",
        format: ".zip",
        size: "130 MB",
        href: "#",
      },
    ],
    recommended: "Apple Silicon covers all M-series Macs.",
  },
  {
    id: "linux",
    icon: LinuxIcon,
    name: "Linux",
    tagline: "64-bit, glibc 2.28 or later.",
    downloads: [
      {
        id: "lin-deb",
        label: "Debian / Ubuntu",
        format: ".deb",
        size: "88 MB",
        href: "#",
      },
      {
        id: "lin-rpm",
        label: "Fedora / RHEL",
        format: ".rpm",
        size: "89 MB",
        href: "#",
      },
      {
        id: "lin-appimage",
        label: "AppImage",
        format: ".AppImage",
        size: "104 MB",
        href: "#",
      },
      {
        id: "lin-tar",
        label: "Portable",
        format: ".tar.gz",
        size: "106 MB",
        href: "#",
      },
    ],
    recommended: "AppImage runs on most distributions without install.",
  },
];

const SYSTEM_REQUIREMENTS: SystemRequirement[] = [
  {
    id: "windows",
    icon: Monitor,
    platformName: "Windows",
    specs: [
      {
        label: "OS Version",
        minimum: "Windows 10 (1909+)",
        recommended: "Windows 11",
      },
      {
        label: "Processor",
        minimum: "Dual-core 1.6 GHz",
        recommended: "Quad-core 2.4 GHz+",
      },
      { label: "Memory", minimum: "4 GB RAM", recommended: "16 GB RAM" },
      { label: "Storage", minimum: "1 GB free", recommended: "SSD, 4 GB free" },
      { label: "Display", minimum: "1280×800", recommended: "1920×1080+" },
    ],
  },
  {
    id: "macos",
    icon: Apple,
    platformName: "macOS",
    specs: [
      {
        label: "OS Version",
        minimum: "macOS 12 Monterey",
        recommended: "macOS 14 Sonoma+",
      },
      {
        label: "Processor",
        minimum: "Intel Core i5 / M1",
        recommended: "Apple M2 or later",
      },
      { label: "Memory", minimum: "8 GB RAM", recommended: "16 GB RAM" },
      { label: "Storage", minimum: "1 GB free", recommended: "SSD, 4 GB free" },
      { label: "Display", minimum: "1280×800", recommended: "Retina display" },
    ],
  },
  {
    id: "linux",
    icon: LinuxIcon,
    platformName: "Linux",
    specs: [
      {
        label: "Distribution",
        minimum: "glibc 2.28+",
        recommended: "Ubuntu 22.04 LTS+",
      },
      {
        label: "Processor",
        minimum: "Dual-core 1.6 GHz",
        recommended: "Quad-core 2.4 GHz+",
      },
      { label: "Memory", minimum: "4 GB RAM", recommended: "16 GB RAM" },
      { label: "Storage", minimum: "1 GB free", recommended: "SSD, 4 GB free" },
      {
        label: "Display server",
        minimum: "X11",
        recommended: "X11 or Wayland",
      },
    ],
  },
];

const INSTALL_STEPS: InstallStep[] = [
  {
    id: "step-1",
    step: 1,
    title: "Download the installer",
    description:
      "Choose your platform above and download the recommended package.",
  },
  {
    id: "step-2",
    step: 2,
    title: "Run the installer",
    description:
      "Launch the downloaded file and follow the on-screen setup wizard.",
  },
  {
    id: "step-3",
    step: 3,
    title: "Verify from the CLI (optional)",
    description:
      "Confirm the install by checking the version from your terminal.",
    command: "c2x --version",
  },
  {
    id: "step-4",
    step: 4,
    title: "Sign in and sync settings",
    description:
      "Sign in with your C2X account to sync themes, snippets, and extensions.",
  },
];

const RELEASE_CHANNELS: ReleaseChannel[] = [
  {
    id: "stable",
    icon: Rocket,
    name: "Stable",
    description:
      "Fully tested releases. Recommended for daily development work.",
    version: "2.4.1",
    cadence: "Every 4–6 weeks",
    stability: "Production",
  },
  {
    id: "insiders",
    icon: FlaskConical,
    name: "Insiders",
    description:
      "Preview upcoming features a few weeks before they reach Stable.",
    version: "2.5.0-insiders.3",
    cadence: "Weekly",
    stability: "Beta",
  },
  {
    id: "nightly",
    icon: Moon,
    name: "Nightly",
    description:
      "Latest commits, built automatically every night. Expect rough edges.",
    version: "2.5.0-nightly.0802",
    cadence: "Daily",
    stability: "Experimental",
  },
];

const CHECKSUMS: ChecksumEntry[] = [
  {
    id: "cs-win-exe",
    platform: "Windows",
    fileName: "C2XSetup-2.4.1.exe",
    sha256: "a3f8c1e9d24b7760f1e5c9a8b3d2f4e6c7a1b9d0e3f5a7c9b1d3e5f7a9c1b3d5",
  },
  {
    id: "cs-mac-arm",
    platform: "macOS (Apple Silicon)",
    fileName: "C2X-2.4.1-arm64.dmg",
    sha256: "e7b2d4f6a8c1e3b5d7f9a1c3e5b7d9f1a3c5e7b9d1f3a5c7e9b1d3f5a7c9e1b3",
  },
  {
    id: "cs-mac-intel",
    platform: "macOS (Intel)",
    fileName: "C2X-2.4.1-x64.dmg",
    sha256: "c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3",
  },
  {
    id: "cs-lin-deb",
    platform: "Linux (deb)",
    fileName: "c2x_2.4.1_amd64.deb",
    sha256: "f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1",
  },
];

const VERSION_HISTORY: VersionEntry[] = [
  {
    id: "v241",
    version: "2.4.1",
    date: "July 28, 2026",
    channel: "stable",
    isLatest: true,
    highlights: [
      "Fixed Prettier formatting freeze on files larger than 5,000 lines",
      "Improved startup time by ~180ms on cold launch",
      "Fixed keyboard shortcut conflicts on non-US layouts",
    ],
  },
  {
    id: "v240",
    version: "2.4.0",
    date: "July 8, 2026",
    channel: "stable",
    highlights: [
      "New Theme Manager with live preview",
      "User Snippets editor with JSON import/export",
      "Tasks panel with real-time stdout/stderr streaming",
    ],
  },
  {
    id: "v230",
    version: "2.3.0",
    date: "June 2, 2026",
    channel: "stable",
    highlights: [
      "Redesigned Keyboard Shortcuts editor with conflict detection",
      "Chord-sequence shortcut support (e.g. Ctrl+K Ctrl+S)",
      "Split-editor toolbar improvements",
    ],
  },
];

/**
 * /download — Phase 2B. Platform selection, system requirements,
 * install guide, release channels, checksums, and version history.
 */
const Download = (): React.ReactElement => {
  const [activeChannel, setActiveChannel] =
    useState<ReleaseChannel["id"]>("stable");
  const [openStep, setOpenStep] = useState<string | null>("step-1");

  const selectedChannel = useMemo(
    () =>
      RELEASE_CHANNELS.find((c) => c.id === activeChannel) ??
      RELEASE_CHANNELS[0],
    [activeChannel],
  );

  return (
    <div className={styles.page}>
      <div className={styles.heroWrapper}>
        <PageHero
          eyebrow="Download"
          title="Download C2X"
          description="Develop faster on Windows, macOS and Linux. Free to install, with a 60-second setup."
        />
        <div className={styles.heroBadge}>
          <span className={styles.latestBadge}>
            <span className={styles.badgeDot} />
            Latest Stable Release v2.4.1
          </span>
        </div>
      </div>

      {/* Supported Platforms */}
      <section className={cn("section-pad", styles.platformsSection)}>
        <Container>
          <SectionTitle
            eyebrow="Supported Platforms"
            title="Pick your operating system"
            description="Native builds for every major desktop platform, updated with every release."
            align="center"
          />
          <div className={styles.platformGrid}>
            {PLATFORMS.map((platform, i) => (
              <PlatformCard key={platform.id} platform={platform} index={i} />
            ))}
          </div>
          <p className={cn("text-small", styles.checksumNote)}>
            <ShieldCheck
              size={14}
              strokeWidth={2}
              className={styles.checksumNoteIcon}
            />
            Windows may show an "unverified publisher" warning on the
            installer — this is expected until code signing is added, and
            it's safe to proceed.
          </p>
        </Container>
      </section>

      {/* System Requirements */}
      <section className={cn("section-pad", styles.requirementsSection)}>
        <Container>
          <SectionTitle
            eyebrow="System Requirements"
            title="Minimum vs. recommended specs"
            description="C2X runs comfortably on modest hardware, but scales up with more memory and cores."
          />
          <div className={styles.requirementsGrid}>
            {SYSTEM_REQUIREMENTS.map((req, i) => (
              <SystemRequirementCard key={req.id} requirement={req} index={i} />
            ))}
          </div>
          <div className={styles.reqLegend}>
            <span className={styles.legendItem}>
              <Cpu size={13} strokeWidth={2} /> Processor
            </span>
            <span className={styles.legendItem}>
              <MemoryStick size={13} strokeWidth={2} /> Memory
            </span>
            <span className={styles.legendItem}>
              <HardDrive size={13} strokeWidth={2} /> Storage
            </span>
            <span className={styles.legendItem}>
              <MonitorCheck size={13} strokeWidth={2} /> Display
            </span>
          </div>
        </Container>
      </section>

      {/* Installation Guide */}
      <section className={cn("section-pad", styles.installSection)}>
        <Container>
          <SectionTitle
            eyebrow="Installation Guide"
            title="Get set up in four steps"
            description="From download to a fully synced editor in under a minute."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className={styles.stepsList}
          >
            {INSTALL_STEPS.map((step) => {
              const isOpen = openStep === step.id;
              return (
                <motion.div
                  key={step.id}
                  variants={fadeUp}
                  className={styles.stepItem}
                >
                  <button
                    type="button"
                    className={styles.stepHeader}
                    onClick={() => setOpenStep(isOpen ? null : step.id)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.stepNumber}>{step.step}</span>
                    <span className={styles.stepTitle}>{step.title}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2}
                      className={cn(
                        styles.chevron,
                        isOpen && styles.chevronOpen,
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className={styles.stepBody}>
                      <p className="text-body">{step.description}</p>
                      {step.command && (
                        <pre className={styles.stepCommand}>
                          <code>{step.command}</code>
                        </pre>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Release Channel */}
      <section className={cn("section-pad", styles.channelSection)}>
        <Container>
          <SectionTitle
            eyebrow="Release Channel"
            title="Choose your update cadence"
            description="Switch channels any time from within the app without reinstalling."
          />
          <div className={styles.channelTabs} role="tablist">
            {RELEASE_CHANNELS.map((channel) => {
              const Icon = channel.icon;
              const isActive = channel.id === activeChannel;
              return (
                <button
                  key={channel.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={cn(
                    styles.channelTab,
                    isActive && styles.channelTabActive,
                  )}
                  onClick={() => setActiveChannel(channel.id)}
                >
                  <Icon size={16} strokeWidth={2} />
                  {channel.name}
                </button>
              );
            })}
          </div>

          <motion.div
            key={selectedChannel.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.channelPanel}
          >
            <div className={styles.channelPanelHeader}>
              <div>
                <h3 className={styles.channelName}>
                  {selectedChannel.name} channel
                </h3>
                <p className="text-small">{selectedChannel.description}</p>
              </div>
              <span
                className={cn(
                  styles.stabilityBadge,
                  styles[selectedChannel.stability],
                )}
              >
                {selectedChannel.stability}
              </span>
            </div>
            <div className={styles.channelMeta}>
              <div>
                <span className={styles.channelMetaLabel}>Current version</span>
                <span className={styles.channelMetaValue}>
                  {selectedChannel.version}
                </span>
              </div>
              <div>
                <span className={styles.channelMetaLabel}>Release cadence</span>
                <span className={styles.channelMetaValue}>
                  {selectedChannel.cadence}
                </span>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Checksums */}
      <section className={cn("section-pad", styles.checksumSection)}>
        <Container>
          <SectionTitle
            eyebrow="Checksums"
            title="Verify your download"
            description="Compare the SHA-256 hash of your downloaded file against the values below."
          />
          <RequirementsTable entries={CHECKSUMS} />
          <p className={cn("text-small", styles.checksumNote)}>
            <ShieldCheck
              size={14}
              strokeWidth={2}
              className={styles.checksumNoteIcon}
            />
            All C2X releases are signed and reproducibly built from the
            public source tree.
          </p>
        </Container>
      </section>

      {/* Version History / Release Notes Preview */}
      <section className={cn("section-pad", styles.historySection)}>
        <Container>
          <SectionTitle
            eyebrow="Version History"
            title="Release notes preview"
            description="A running log of what shipped in each Stable release."
          />
          <div className={styles.timeline}>
            {VERSION_HISTORY.map((entry, i) => (
              <VersionCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Installation Troubleshooting */}
      <section className={cn("section-pad", styles.historySection)}>
        <Container>
          <SectionTitle
            eyebrow="Troubleshooting"
            title="Common installer issues & solutions"
            description="Quick resolutions for common installation and setup questions."
          />
          <div className={styles.troubleGrid}>
            <div className={styles.troubleCard}>
              <h3>Windows SmartScreen Warning</h3>
              <p>
                Click 'More info' and select 'Run anyway'. This warning occurs on new release binaries until code-signing certificates establish reputational threshold.
              </p>
            </div>
            <div className={styles.troubleCard}>
              <h3>macOS Gatekeeper Warning</h3>
              <p>
                If macOS blocks launching, open System Settings → Privacy & Security, scroll down, and click 'Open Anyway' under the Security section.
              </p>
            </div>
            <div className={styles.troubleCard}>
              <h3>Linux Permission Issues</h3>
              <p>
                For AppImage executables, ensure execute permissions are granted via terminal: <code>chmod +x C2X.AppImage</code> before launching.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Download;
