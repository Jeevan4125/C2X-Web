import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Download, Menu, X, ChevronDown } from "lucide-react";
import styles from "./Navbar.module.scss";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { GITHUB_REPO_URL } from "@/constants";

// Lazy load MegaMenu - only loads when hovered
const MegaMenu = lazy(() => import("./MegaMenu"));

export interface MegaMenuItem {
  label: string;
  path: string;
  description?: string;
  icon?: string;
}

export interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuData {
  title: string;
  path: string;
  sections: MegaMenuSection[];
  featured?: {
    title: string;
    description: string;
    path: string;
    icon?: string;
  };
}

const NAV_LINKS: MegaMenuData[] = [
  {
    title: "Home",
    path: "/",
    sections: [],
  },
  {
    title: "Features",
    path: "/features",
    sections: [
      {
        title: "Core Features",
        items: [
          {
            label: "AI-Powered Coding",
            path: "/features/ai-coding",
            description: "Intelligent code completion and suggestions",
          },
          {
            label: "Monaco Editor",
            path: "/features/monaco-editor",
            description: "VS Code powered editor",
          },
          {
            label: "Git Integration",
            path: "/features/git-integration",
            description: "Seamless version control",
          },
          {
            label: "Built-in Debugger",
            path: "/features/debugger",
            description: "Powerful debugging tools",
          },
        ],
      },
      {
        title: "DevOps",
        items: [
          {
            label: "Docker Integration",
            path: "/features/docker",
            description: "Container management",
          },
          {
            label: "SSH Development",
            path: "/features/ssh-development",
            description: "Remote development",
          },
        ],
      },
    ],
    featured: {
      title: "All Features",
      description: "Explore all the powerful features C2X has to offer",
      path: "/features",
    },
  },
  {
    title: "AI",
    path: "/ai-assistant",
    sections: [
      {
        title: "AI Capabilities",
        items: [
          {
            label: "AI Assistant",
            path: "/ai-assistant",
            description: "Your intelligent coding partner",
          },
          {
            label: "Code Generation",
            path: "/ai-assistant#generation",
            description: "Generate code from descriptions",
          },
          {
            label: "Code Explanation",
            path: "/ai-assistant#explanation",
            description: "Understand complex code",
          },
          {
            label: "Refactoring",
            path: "/ai-assistant#refactoring",
            description: "Intelligent code improvements",
          },
        ],
      },
      {
        title: "Smart Features",
        items: [
          {
            label: "Inline Completions",
            path: "/ai-assistant#inline",
            description: "Real-time code suggestions",
          },
          {
            label: "Context Awareness",
            path: "/ai-assistant#context",
            description: "Understands your codebase",
          },
        ],
      },
    ],
    featured: {
      title: "AI Assistant",
      description: "Experience the power of AI-powered development",
      path: "/ai-assistant",
    },
  },
  {
    title: "Collaboration",
    path: "/collaboration",
    sections: [
      {
        title: "Team Features",
        items: [
          {
            label: "Live Collaboration",
            path: "/collaboration#live",
            description: "Real-time pair programming",
          },
          {
            label: "Team Workspace",
            path: "/collaboration#workspace",
            description: "Shared development environment",
          },
          {
            label: "Presence",
            path: "/collaboration#presence",
            description: "See who's online",
          },
          {
            label: "Sharing",
            path: "/collaboration#sharing",
            description: "Share projects instantly",
          },
        ],
      },
    ],
    featured: {
      title: "Collaboration",
      description: "Work together seamlessly with your team",
      path: "/collaboration",
    },
  },
  {
    title: "Extensions",
    path: "/extensions",
    sections: [
      {
        title: "Extension Marketplace",
        items: [
          {
            label: "Popular Extensions",
            path: "/extensions#popular",
            description: "Most downloaded extensions",
          },
          {
            label: "Categories",
            path: "/extensions#categories",
            description: "Browse by category",
          },
        ],
      },
    ],
    featured: {
      title: "Extensions",
      description: "Extend C2X with powerful extensions",
      path: "/extensions",
    },
  },
  {
    title: "Docs",
    path: "/docs",
    sections: [
      {
        title: "Getting Started",
        items: [
          {
            label: "Introduction",
            path: "/docs",
            description: "Welcome to C2X",
          },
          {
            label: "Installation",
            path: "/docs/installation",
            description: "Install C2X",
          },
          {
            label: "Quick Start",
            path: "/docs/quick-start",
            description: "Get started in minutes",
          },
        ],
      },
      {
        title: "Documentation",
        items: [
          {
            label: "User Guide",
            path: "/docs/user-guide",
            description: "Complete user guide",
          },
          {
            label: "API Reference",
            path: "/docs/api",
            description: "API documentation",
          },
          {
            label: "CLI Tools",
            path: "/docs/cli",
            description: "Command-line tools",
          },
        ],
      },
    ],
    featured: {
      title: "Documentation",
      description: "Everything you need to know about C2X",
      path: "/docs",
    },
  },
];

const Navbar = (): React.ReactElement => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (title: string) => {
    if (window.innerWidth < 1024) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(title);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1024) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      closeTimeoutRef.current = null;
    }, 150);
  };

  const handleMenuMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMenuMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      closeTimeoutRef.current = null;
    }, 150);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    if (path.includes("#")) {
      e.preventDefault();
      const [basePath, anchor] = path.split("#");
      navigate(basePath);
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const handleMobileNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className={styles.navbar} ref={navbarRef}>
      <Container className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label="C2X Home">
          <img
            src="/c2x-white.svg"
            alt="C2X"
            className={styles.logoImage}
            width="32"
            height="32"
            loading="eager"
          />
          <span className={styles.logoText}>C2X</span>
        </Link>

        <nav className={styles.links} aria-label="Primary navigation">
          {NAV_LINKS.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path !== "/" && location.pathname.startsWith(link.path));

            const hasSections = link.sections && link.sections.length > 0;

            return (
              <div
                key={link.title}
                className={styles.navItemWrapper}
                onMouseEnter={() => hasSections && handleMouseEnter(link.title)}
                onMouseLeave={handleMouseLeave}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive: isNavActive }) =>
                    `${styles.link} ${isNavActive || isActive ? styles.active : ""}`
                  }
                >
                  {link.title}
                  {hasSections && (
                    <ChevronDown
                      size={14}
                      strokeWidth={2}
                      className={styles.chevronIcon}
                    />
                  )}
                </NavLink>
                {hasSections && (
                  <Suspense fallback={null}>
                    <MegaMenu
                      data={link}
                      isOpen={activeMenu === link.title}
                      onMouseEnter={handleMenuMouseEnter}
                      onMouseLeave={handleMenuMouseLeave}
                    />
                  </Suspense>
                )}
              </div>
            );
          })}
        </nav>

        <div className={styles.actions}>
          {localStorage.getItem("c2x_user_email") ? (
            <Button to="/dashboard" size="sm" variant="secondary">
              Dashboard
            </Button>
          ) : (
            <Button to="/login" size="sm" variant="secondary">
              Sign In
            </Button>
          )}
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconButton}
            aria-label="View C2X on GitHub"
          >
            <Github size={17} strokeWidth={2} />
          </a>
          <Button to="/download" size="sm" icon={<Download size={15} />}>
            Download
          </Button>
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleMobileNavClick}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={styles.mobileMenu}
            >
              <nav aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <div key={link.title} className={styles.mobileNavGroup}>
                    <NavLink
                      to={link.path}
                      onClick={handleMobileNavClick}
                      className={({ isActive }) =>
                        `${styles.mobileLink} ${isActive ? styles.active : ""}`
                      }
                    >
                      {link.title}
                    </NavLink>
                    {link.sections && link.sections.length > 0 && (
                      <div className={styles.mobileSubLinks}>
                        {link.sections.map((section) => (
                          <div key={section.title}>
                            <span className={styles.mobileSubTitle}>
                              {section.title}
                            </span>
                            {section.items.map((item) => (
                              <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={handleMobileNavClick}
                                className={({ isActive }) =>
                                  `${styles.mobileSubLink} ${isActive ? styles.active : ""}`
                                }
                              >
                                {item.label}
                              </NavLink>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className={styles.mobileActions}>
                <Button
                  to="/download"
                  fullWidth
                  icon={<Download size={16} />}
                  onClick={handleMobileNavClick}
                >
                  Download C2X
                </Button>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileGitHubBtn}
                  onClick={handleMobileNavClick}
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
