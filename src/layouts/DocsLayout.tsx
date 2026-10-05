import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DocsSidebar from "@/components/docs/DocsSidebar";
import TableOfContents from "@/components/docs/TableOfContents";
import styles from "./DocsLayout.module.scss";
import Container from "@/components/common/Container";
import type { TocEntry } from "@/components/docs/TableOfContents";

export interface DocsOutletContext {
  tocEntries: TocEntry[];
  setTocEntries: (entries: TocEntry[]) => void;
}

const DocsLayout = (): React.ReactElement => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tocEntries, setTocEntries] = useState<TocEntry[]>([]);

  // Check if current page is the Introduction page (docs home)
  const isIntroductionPage =
    location.pathname === "/docs" || location.pathname === "/docs/";

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className={styles.docsLayout}>
      <Container className={styles.docsContainer}>
        <div
          className={`${styles.layoutGrid} ${
            isIntroductionPage && tocEntries.length === 0
              ? styles.layoutGridNoToc
              : ""
          }`}
        >
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <DocsSidebar onNavigate={() => setSidebarOpen(false)} />
          </aside>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className={styles.overlay}
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className={styles.mainContent}>
            <Outlet context={{ tocEntries, setTocEntries }} />
          </main>

          {/* Table of Contents - Only render if there are entries */}
          {tocEntries.length > 0 && (
            <aside className={styles.tocSidebar}>
              <TableOfContents entries={tocEntries} />
            </aside>
          )}
        </div>
      </Container>
    </div>
  );
};

export default DocsLayout;
