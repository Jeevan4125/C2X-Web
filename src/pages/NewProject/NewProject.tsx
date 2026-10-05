import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Plus, Code, Server, Layout } from "lucide-react";
import { projectService } from "@/services/projectService";
import styles from "./NewProject.module.scss";
import { cn } from "@/utils/helpers";

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [template, setTemplate] = useState("react");
  const [visibility, setVisibility] = useState("private");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userEmail = localStorage.getItem("c2x_user_email") || "developer@example.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a project name.");
      return;
    }

    setLoading(true);
    setError(null);

    const techStack = template === "node" ? "Node.js + Express" : template === "vite" ? "Vite + React" : "React + TypeScript";

    try {
      const proj = await projectService.createProject({
        name: name.trim(),
        description: description.trim(),
        techStack,
        visibility,
        template,
        email: userEmail,
      });

      if (proj && proj.id) {
        navigate(`/projects/${proj.id}`);
      } else {
        setError("Failed to create project.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/dashboard" className={styles.backBtn}><ArrowLeft size={16} /> Dashboard</Link>
        <h2>Create New Cloud Project</h2>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.formCard}>
          {error && <div className={styles.errorBanner}>{error}</div>}

          <div className={styles.field}>
            <label>Project Name</label>
            <input
              type="text"
              placeholder="e.g. Nexora CRM, AI Assistant"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label>Description (Optional)</label>
            <textarea
              placeholder="Brief description of your project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className={styles.field}>
            <label>Choose Template</label>
            <div className={styles.templatesGrid}>
              <div
                className={cn(styles.templateCard, template === "react" && styles.selected)}
                onClick={() => setTemplate("react")}
              >
                <Code size={20} />
                <strong>React + TypeScript</strong>
                <span>Modern React app with TypeScript & Vite</span>
              </div>
              <div
                className={cn(styles.templateCard, template === "node" && styles.selected)}
                onClick={() => setTemplate("node")}
              >
                <Server size={20} />
                <strong>Node.js Express</strong>
                <span>Backend REST API server in Node.js</span>
              </div>
              <div
                className={cn(styles.templateCard, template === "empty" && styles.selected)}
                onClick={() => setTemplate("empty")}
              >
                <Layout size={20} />
                <strong>Empty Project</strong>
                <span>Blank workspace with README.md</span>
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label>Visibility</label>
            <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
              <option value="private">Private (Only you)</option>
              <option value="public">Public (Anyone with link)</option>
            </select>
          </div>

          <div className={styles.actions}>
            <Link to="/dashboard" className={styles.cancelBtn}>Cancel</Link>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewProject;
