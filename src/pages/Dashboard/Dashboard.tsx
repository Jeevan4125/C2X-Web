import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Folder, Clock, ArrowRight, ExternalLink, Star, Trash2, Search, Code2, RefreshCw, AlertCircle } from "lucide-react";
import { projectService, Project } from "@/services/projectService";
import styles from "./Dashboard.module.scss";
import { cn } from "@/utils/helpers";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentWorkspaces, setRecentWorkspaces] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [recentLoading, setRecentLoading] = useState<boolean>(true);
  const [recentError, setRecentError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const userEmail = localStorage.getItem("c2x_user_email") || "developer@example.com";
  const userName = userEmail.split("@")[0];

  const fetchWorkspaces = useCallback(async () => {
    setRecentLoading(true);
    setRecentError(null);
    try {
      const recent = await projectService.getRecentWorkspaces(userEmail);
      // Sort by updatedAt DESC
      const sorted = recent.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setRecentWorkspaces(sorted);
    } catch (err: any) {
      setRecentError(err.message || "Failed to load recent CodeSync workspaces.");
    } finally {
      setRecentLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      const data = await projectService.getProjects(userEmail);
      setProjects(data);
      setLoading(false);
    };
    loadAll();
    fetchWorkspaces();
  }, [userEmail, fetchWorkspaces]);

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 2) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logoBadge}>C2X</span>
          <h1>Cloud Dashboard</h1>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.userEmail}>{userEmail}</span>
          <button
            onClick={() => {
              localStorage.removeItem("c2x_user_email");
              navigate("/login");
            }}
            className={styles.logoutBtn}
          >
            Logout
          </button>
          <Link to="/new-project" className={styles.newProjBtn}>
            <Plus size={16} /> New Project
          </Link>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.welcomeBanner}>
          <h2>Welcome back, {userName.charAt(0).toUpperCase() + userName.slice(1)}!</h2>
          <p>Your cross-device CodeSync cloud workspace is synchronized and ready for account {userEmail}.</p>
        </div>

        {/* RECENT FROM CODESYNC SECTION */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionTitle}>
            <h3>Recent from CodeSync</h3>
            <span className={styles.badgeCount}>{recentWorkspaces.length} synced</span>
          </div>

          {recentLoading ? (
            <div className={styles.loadingState}>Loading recent CodeSync workspaces...</div>
          ) : recentError ? (
            <div className={styles.errorState}>
              <AlertCircle size={20} />
              <span>{recentError}</span>
              <button onClick={fetchWorkspaces} className={styles.retryBtn}>
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          ) : recentWorkspaces.length === 0 ? (
            <div className={styles.emptyState}>
              <Folder size={36} />
              <h4>No recent CodeSync projects found</h4>
              <p>Projects opened in your CodeSync IDE session will appear here automatically.</p>
            </div>
          ) : (
            <div className={styles.codeSyncGrid}>
              {recentWorkspaces.map((ws) => (
                <div key={ws.id} className={styles.codeSyncCard}>
                  <div className={styles.csCardHeader}>
                    <div className={styles.csTitleArea}>
                      <Folder size={16} className={styles.folderIcon} />
                      <h4>{ws.name}</h4>
                    </div>
                    <span className={styles.csTime}>{getRelativeTime(ws.updatedAt)}</span>
                  </div>
                  <p className={styles.csDesc}>{ws.description || ws.techStack}</p>
                  <div className={styles.csCardActions}>
                    <button
                      onClick={() => navigate(`/projects/${ws.id}`)}
                      className={styles.csDetailBtn}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => navigate(`/editor?projectId=${ws.id}`)}
                      className={styles.csOpenIdeBtn}
                    >
                      Open in IDE <ExternalLink size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className={styles.controlsRow}>
          <div className={styles.searchWrap}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search all cloud projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.filterTabs}>
            <Link to="/projects" className={styles.viewAllLink}>View All Projects ({projects.length})</Link>
          </div>
        </div>

        <div className={styles.sectionTitle}>
          <h3>All Cloud Projects</h3>
          <Link to="/projects">Manage all</Link>
        </div>

        {loading ? (
          <div className={styles.loadingState}>Loading cloud projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className={styles.emptyState}>
            <Code2 size={48} />
            <h3>No cloud projects found</h3>
            <p>Create your first cross-device cloud project to get started.</p>
            <Link to="/new-project" className={styles.newProjBtn}>
              <Plus size={16} /> Create Project
            </Link>
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {filteredProjects.slice(0, 6).map((proj) => (
              <div key={proj.id} className={styles.projectCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.projTitleArea}>
                    <Folder size={18} className={styles.folderIcon} />
                    <h4>{proj.name}</h4>
                  </div>
                  <button
                    className={cn(styles.starBtn, proj.isStarred && styles.starred)}
                    onClick={async () => {
                      const updated = await projectService.updateProject(proj.id, { isStarred: !proj.isStarred });
                      if (updated) {
                        setProjects(projects.map(p => p.id === proj.id ? updated : p));
                      }
                    }}
                  >
                    <Star size={14} fill={proj.isStarred ? "#eab308" : "none"} />
                  </button>
                </div>
                <p className={styles.cardDesc}>{proj.description || "No description provided."}</p>
                <div className={styles.cardMeta}>
                  <span className={styles.stackBadge}>{proj.techStack}</span>
                  <span className={styles.timeMeta}>
                    <Clock size={12} /> {new Date(proj.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className={styles.cardActions}>
                  <button
                    onClick={() => navigate(`/projects/${proj.id}`)}
                    className={styles.detailBtn}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate(`/editor?projectId=${proj.id}`)}
                    className={styles.openEditorBtn}
                  >
                    Open in Editor <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
