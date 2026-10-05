import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Folder, Clock, ExternalLink, Star, Search, Trash2, ArrowLeft } from "lucide-react";
import { projectService, Project } from "@/services/projectService";
import styles from "./ProjectsManager.module.scss";
import { cn } from "@/utils/helpers";

const ProjectsManager: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tab, setTab] = useState<"all" | "starred" | "archived">("all");
  const userEmail = localStorage.getItem("c2x_user_email") || "developer@example.com";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await projectService.getProjects(userEmail);
      setProjects(data);
      setLoading(false);
    };
    load();
  }, [userEmail]);

  const filtered = projects.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesQuery) return false;
    if (tab === "starred") return p.isStarred;
    if (tab === "archived") return p.isArchived;
    return !p.isArchived; // All except archived by default
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/dashboard" className={styles.backBtn}><ArrowLeft size={16} /> Dashboard</Link>
          <h2>My Projects</h2>
        </div>
        <div className={styles.headerRight}>
          <Link to="/new-project" className={styles.newBtn}>
            <Plus size={16} /> New Project
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.topRow}>
          <div className={styles.searchWrap}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.tabs}>
            <button className={cn(styles.tab, tab === "all" && styles.active)} onClick={() => setTab("all")}>All</button>
            <button className={cn(styles.tab, tab === "starred" && styles.active)} onClick={() => setTab("starred")}>Starred</button>
            <button className={cn(styles.tab, tab === "archived" && styles.active)} onClick={() => setTab("archived")}>Archived</button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading projects...</div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <Folder size={40} />
            <p>No projects found in this view.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((proj) => (
              <div key={proj.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.titleArea}>
                    <Folder size={18} />
                    <h3>{proj.name}</h3>
                  </div>
                  <button
                    className={cn(styles.star, proj.isStarred && styles.active)}
                    onClick={async () => {
                      const updated = await projectService.updateProject(proj.id, { isStarred: !proj.isStarred });
                      if (updated) setProjects(projects.map((p) => p.id === proj.id ? updated : p));
                    }}
                  >
                    <Star size={14} fill={proj.isStarred ? "#eab308" : "none"} />
                  </button>
                </div>
                <p className={styles.desc}>{proj.description || "No description."}</p>
                <div className={styles.meta}>
                  <span className={styles.stack}>{proj.techStack}</span>
                  <span><Clock size={12} /> {new Date(proj.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => navigate(`/projects/${proj.id}`)} className={styles.btnSecondary}>View Files</button>
                  <button onClick={() => navigate(`/editor?projectId=${proj.id}`)} className={styles.btnPrimary}>
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

export default ProjectsManager;
