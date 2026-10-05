import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Folder, FileCode, Clock, Star, Trash2, Shield, Settings, History, Activity } from "lucide-react";
import { projectService, Project, ProjectFile } from "@/services/projectService";
import styles from "./ProjectDetail.module.scss";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [activeTab, setActiveTab] = useState<"files" | "history" | "activity" | "settings">("files");
  const [versions, setVersions] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!projectId) return;
      setLoading(true);
      const proj = await projectService.getProjectById(projectId);
      setProject(proj);
      if (proj && proj.files && proj.files.length > 0) {
        setSelectedFile(proj.files[0]);
      }
      const vList = await projectService.getVersions(projectId);
      setVersions(vList);
      const aList = await projectService.getActivity(projectId);
      setActivity(aList);
      setLoading(false);
    };
    load();
  }, [projectId]);

  if (loading) {
    return <div className={styles.loading}>Loading project workspace...</div>;
  }

  if (!project) {
    return (
      <div className={styles.errorState}>
        <h2>Project not found</h2>
        <Link to="/projects" className={styles.backBtn}>Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/projects" className={styles.backLink}><ArrowLeft size={16} /></Link>
          <div>
            <h2>{project.name}</h2>
            <span className={styles.stackLabel}>{project.techStack}</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button
            onClick={() => navigate(`/editor?projectId=${project.id}${selectedFile ? `&file=${selectedFile.path}` : ""}`)}
            className={styles.openEditorBtn}
          >
            Open in C2X Editor <ExternalLink size={14} />
          </button>
        </div>
      </header>

      <div className={styles.subnav}>
        <button className={activeTab === "files" ? styles.activeTab : styles.tab} onClick={() => setActiveTab("files")}>Files</button>
        <button className={activeTab === "history" ? styles.activeTab : styles.tab} onClick={() => setActiveTab("history")}>History ({versions.length})</button>
        <button className={activeTab === "activity" ? styles.activeTab : styles.tab} onClick={() => setActiveTab("activity")}>Activity</button>
        <button className={activeTab === "settings" ? styles.activeTab : styles.tab} onClick={() => setActiveTab("settings")}>Settings</button>
      </div>

      <main className={styles.main}>
        {activeTab === "files" && (
          <div className={styles.fileExplorerLayout}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarTitle}>Project Files</div>
              <div className={styles.fileList}>
                {project.files && project.files.map((file) => (
                  <div
                    key={file.path}
                    className={`${styles.fileItem} ${selectedFile?.path === file.path ? styles.activeFile : ""}`}
                    onClick={() => setSelectedFile(file)}
                  >
                    <FileCode size={14} />
                    <span>{file.path}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.previewPane}>
              {selectedFile ? (
                <div className={styles.previewCard}>
                  <div className={styles.previewHeader}>
                    <span>{selectedFile.path}</span>
                    <button
                      onClick={() => navigate(`/editor?projectId=${project.id}&file=${selectedFile.path}`)}
                      className={styles.previewOpenBtn}
                    >
                      Edit in Editor <ExternalLink size={12} />
                    </button>
                  </div>
                  <pre className={styles.codePreview}>
                    <code>{selectedFile.content}</code>
                  </pre>
                </div>
              ) : (
                <div className={styles.noFile}>Select a file to preview</div>
              )}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className={styles.tabContentCard}>
            <h3>Version History</h3>
            <div className={styles.list}>
              {versions.map((v) => (
                <div key={v.id} className={styles.listItem}>
                  <div>
                    <strong>Version {v.id}</strong> — Saved by {v.savedBy || "User"}
                  </div>
                  <span className={styles.timestamp}>{new Date(v.createdAt).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className={styles.tabContentCard}>
            <h3>Project Activity</h3>
            <div className={styles.list}>
              {activity.map((a) => (
                <div key={a.id} className={styles.listItem}>
                  <div>
                    <strong>{a.actor}</strong>: {a.action}
                  </div>
                  <span className={styles.timestamp}>{new Date(a.createdAt).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className={styles.tabContentCard}>
            <h3>Project Settings</h3>
            <div className={styles.settingGroup}>
              <label>Project Name</label>
              <input type="text" defaultValue={project.name} readOnly />
            </div>
            <div className={styles.settingGroup}>
              <label>Visibility</label>
              <input type="text" defaultValue={project.visibility} readOnly />
            </div>
            <div className={styles.dangerZone}>
              <h4>Danger Zone</h4>
              <button
                onClick={async () => {
                  if (confirm("Are you sure you want to delete this project?")) {
                    await projectService.deleteProject(project.id);
                    navigate("/projects");
                  }
                }}
                className={styles.deleteBtn}
              >
                Delete Project
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectDetail;
