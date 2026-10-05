import { lazy, Suspense } from "react";
import styles from "./Home.module.scss";
import Hero from "@/components/home/Hero";

// Lazy load all sections below the fold
const AIShowcase = lazy(() => import("@/components/home/AIShowcase"));
const Features = lazy(() => import("@/components/home/Features"));
const DevWorkflow = lazy(() => import("@/components/home/DevWorkflow"));
const C2XInAction = lazy(() => import("@/components/home/C2XInAction"));
const Collaboration = lazy(() => import("@/components/home/Collaboration"));
const Performance = lazy(() => import("@/components/home/Performance"));
const LanguageSupport = lazy(() => import("@/components/home/LanguageSupport"));
const UseCases = lazy(() => import("@/components/home/UseCases"));
const Screenshots = lazy(() => import("@/components/home/Screenshots"));
const SubscriptionSection = lazy(() => import("@/components/subscription/SubscriptionSection"));
const FAQPreview = lazy(() => import("@/components/home/FAQPreview"));

// Minimal loader
const SectionLoader = (): React.ReactElement => (
  <div className="py-8 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-border border-t-accent rounded-full animate-spin" />
  </div>
);

const Home = (): React.ReactElement => {
  return (
    <div className={styles.home}>
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <AIShowcase />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <DevWorkflow />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <C2XInAction />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Collaboration />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Performance />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <LanguageSupport />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <UseCases />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Screenshots />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SubscriptionSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQPreview />
      </Suspense>
    </div>
  );
};

export default Home;
