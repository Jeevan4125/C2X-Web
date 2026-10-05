import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import DocsLayout from "@/layouts/DocsLayout";
import ComingSoon from "@/pages/ComingSoon";
import ProtectedRoute from "@/app/ProtectedRoute";

// Minimal loader
const PageLoader = (): React.ReactElement => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
  </div>
);

// Each page is a separate chunk - THIS IS CRITICAL FOR PERFORMANCE
const Home = lazy(
  () => import(/* webpackChunkName: "home" */ "@/pages/Home/Home"),
);
const Features = lazy(
  () => import(/* webpackChunkName: "features" */ "@/pages/features/Features"),
);
const AIAssistant = lazy(
  () => import(/* webpackChunkName: "ai" */ "@/pages/AIAssistant/AIAssistant"),
);
const Collaboration = lazy(
  () =>
    import(
      /* webpackChunkName: "collaboration" */ "@/pages/Collaboration/Collaboration"
    ),
);
const Extensions = lazy(
  () =>
    import(
      /* webpackChunkName: "extensions" */ "@/pages/Extensions/Extensions"
    ),
);
const Themes = lazy(
  () => import(/* webpackChunkName: "themes" */ "@/pages/Themes/Themes"),
);
const Download = lazy(
  () => import(/* webpackChunkName: "download" */ "@/pages/Download/Download"),
);

const WebIDE = lazy(
  () => import(/* webpackChunkName: "editor" */ "@/pages/WebIDE/WebIDE"),
);

const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const ProjectsManager = lazy(() => import("@/pages/Projects/ProjectsManager"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail/ProjectDetail"));
const NewProject = lazy(() => import("@/pages/NewProject/NewProject"));
const Login = lazy(() => import("@/pages/Login/Login"));

const PrivacyPolicy = lazy(
  () => import(/* webpackChunkName: "privacy" */ "@/pages/Legal/PrivacyPolicy"),
);
const TermsOfService = lazy(
  () => import(/* webpackChunkName: "terms" */ "@/pages/Legal/TermsOfService"),
);
const CookiePolicy = lazy(
  () => import(/* webpackChunkName: "cookie" */ "@/pages/Legal/CookiePolicy"),
);

const AICoding = lazy(
  () => import(/* webpackChunkName: "ai-coding" */ "@/pages/features/AICoding"),
);
const MonacoEditor = lazy(
  () =>
    import(/* webpackChunkName: "monaco" */ "@/pages/features/MonacoEditor"),
);
const GitIntegration = lazy(
  () => import(/* webpackChunkName: "git" */ "@/pages/features/GitIntegration"),
);
const Debugger = lazy(
  () => import(/* webpackChunkName: "debugger" */ "@/pages/features/Debugger"),
);
const Docker = lazy(
  () => import(/* webpackChunkName: "docker" */ "@/pages/features/Docker"),
);
const SSHDevelopment = lazy(
  () => import(/* webpackChunkName: "ssh" */ "@/pages/features/SSHDevelopment"),
);

const Blog = lazy(
  () => import(/* webpackChunkName: "blog" */ "@/pages/Blog/Blog"),
);
const BlogPost = lazy(
  () => import(/* webpackChunkName: "blog-post" */ "@/pages/BlogPost/BlogPost"),
);

const About = lazy(
  () => import(/* webpackChunkName: "about" */ "@/pages/About/About"),
);
const Careers = lazy(
  () => import(/* webpackChunkName: "careers" */ "@/pages/Careers/Careers"),
);
const CareerDetails = lazy(
  () =>
    import(
      /* webpackChunkName: "career-details" */ "@/pages/CareerDetails/CareerDetails"
    ),
);
const PressKit = lazy(
  () => import(/* webpackChunkName: "press" */ "@/pages/PressKit/PressKit"),
);

// Documentation pages
const DocsHome = lazy(
  () => import(/* webpackChunkName: "docs-home" */ "@/pages/Docs/DocsHome"),
);
const GettingStarted = lazy(
  () =>
    import(
      /* webpackChunkName: "docs-getting-started" */ "@/pages/Docs/GettingStarted"
    ),
);
const Installation = lazy(
  () =>
    import(
      /* webpackChunkName: "docs-installation" */ "@/pages/Docs/Installation"
    ),
);
const QuickStart = lazy(
  () =>
    import(
      /* webpackChunkName: "docs-quick-start" */ "@/pages/Docs/QuickStart"
    ),
);
const UserGuide = lazy(
  () =>
    import(/* webpackChunkName: "docs-user-guide" */ "@/pages/Docs/UserGuide"),
);
const ApiDocs = lazy(
  () => import(/* webpackChunkName: "docs-api" */ "@/pages/Docs/ApiDocs"),
);
const AiDocs = lazy(
  () => import(/* webpackChunkName: "docs-ai" */ "@/pages/Docs/AiDocs"),
);
const CollaborationDocs = lazy(
  () =>
    import(
      /* webpackChunkName: "docs-collab" */ "@/pages/Docs/CollaborationDocs"
    ),
);
const ExtensionsDocs = lazy(
  () =>
    import(
      /* webpackChunkName: "docs-extensions" */ "@/pages/Docs/ExtensionsDocs"
    ),
);
const ThemesDocs = lazy(
  () => import(/* webpackChunkName: "docs-themes" */ "@/pages/Docs/ThemesDocs"),
);
const CliDocs = lazy(
  () => import(/* webpackChunkName: "docs-cli" */ "@/pages/Docs/CliDocs"),
);
const Shortcuts = lazy(
  () =>
    import(/* webpackChunkName: "docs-shortcuts" */ "@/pages/Docs/Shortcuts"),
);
const Troubleshooting = lazy(
  () =>
    import(
      /* webpackChunkName: "docs-troubleshooting" */ "@/pages/Docs/Troubleshooting"
    ),
);
const Faq = lazy(
  () => import(/* webpackChunkName: "docs-faq" */ "@/pages/Docs/Faq"),
);
const Releases = lazy(
  () => import(/* webpackChunkName: "releases" */ "@/pages/Releases"),
);

export const AppRouter = (): React.ReactElement => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Standalone full-screen C2X Web IDE at /editor */}
        <Route path="/editor" element={<WebIDE />} />

        {/* Protected Cloud Project Manager Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsManager />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/new-project" element={<NewProject />} />
        </Route>
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/extensions" element={<Extensions />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/download" element={<Download />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          <Route path="/features/ai-coding" element={<AICoding />} />
          <Route path="/features/monaco-editor" element={<MonacoEditor />} />
          <Route
            path="/features/git-integration"
            element={<GitIntegration />}
          />
          <Route path="/features/debugger" element={<Debugger />} />
          <Route path="/features/docker" element={<Docker />} />
          <Route
            path="/features/ssh-development"
            element={<SSHDevelopment />}
          />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<CareerDetails />} />
          <Route path="/press-kit" element={<PressKit />} />

          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocsHome />} />
            <Route path="getting-started" element={<GettingStarted />} />
            <Route path="installation" element={<Installation />} />
            <Route path="quick-start" element={<QuickStart />} />
            <Route path="user-guide" element={<UserGuide />} />
            <Route path="api" element={<ApiDocs />} />
            <Route path="ai" element={<AiDocs />} />
            <Route path="collaboration" element={<CollaborationDocs />} />
            <Route path="extensions" element={<ExtensionsDocs />} />
            <Route path="themes" element={<ThemesDocs />} />
            <Route path="cli" element={<CliDocs />} />
            <Route path="shortcuts" element={<Shortcuts />} />
            <Route path="troubleshooting" element={<Troubleshooting />} />
            <Route path="faq" element={<Faq />} />
            <Route path="*" element={<ComingSoon title="Documentation" />} />
          </Route>

          <Route path="/releases" element={<Releases />} />
          <Route path="*" element={<ComingSoon title="Page Not Found" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
