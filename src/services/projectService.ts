export interface ProjectFile {
  id?: string;
  path: string;
  name: string;
  content: string;
  language: string;
  isModified?: boolean;
}

export interface Project {
  id: string;
  userEmail: string;
  name: string;
  description: string;
  techStack: string;
  visibility: string;
  isStarred?: boolean;
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
  files?: ProjectFile[];
}

const LOCAL_STORAGE_PROJECTS_KEY = "c2x_cloud_projects_cache";

const getLocalProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalProjects = (projects: Project[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
  } catch {
    // ignore
  }
};

export const projectService = {
  async getProjects(email = "demo@c2x.dev"): Promise<Project[]> {
    try {
      const res = await fetch(`/api/projects?email=${encodeURIComponent(email)}`, {
        headers: { "x-user-email": email },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        saveLocalProjects(data.data);
        return data.data;
      }
    } catch {
      // Fallback to local cache
    }
    return getLocalProjects();
  },

  async getRecentWorkspaces(email = "demo@c2x.dev"): Promise<Project[]> {
    try {
      const res = await fetch(`/api/projects/workspaces/recent?email=${encodeURIComponent(email)}`, {
        headers: { "x-user-email": email },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return data.data;
      }
    } catch {
      // fallback
    }
    const local = getLocalProjects();
    return local
      .filter((p) => p.userEmail === email)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 10);
  },

  async createProject(payload: { name: string; description?: string; techStack?: string; visibility?: string; template?: string; email?: string }): Promise<Project> {
    const email = payload.email || "demo@c2x.dev";
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-email": email },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const local = getLocalProjects();
        saveLocalProjects([data.data, ...local]);
        return data.data;
      }
    } catch {
      // Fallback local creation
    }

    // Local fallback creation
    const projectId = "proj_" + Math.random().toString(36).substring(2, 10);
    const now = new Date().toISOString();
    const newProj: Project = {
      id: projectId,
      userEmail: email,
      name: payload.name,
      description: payload.description || "",
      techStack: payload.techStack || "React + TypeScript",
      visibility: payload.visibility || "private",
      isStarred: false,
      isArchived: false,
      createdAt: now,
      updatedAt: now,
      files: [
        { path: "README.md", name: "README.md", content: `# ${payload.name}\n\nCreated in C2X Cloud Workspace.`, language: "markdown" },
        { path: "src/App.tsx", name: "App.tsx", content: `export default function App() {\n  return <h1>${payload.name}</h1>;\n}`, language: "typescript" },
      ],
    };
    const local = getLocalProjects();
    saveLocalProjects([newProj, ...local]);
    return newProj;
  },

  async getProjectById(id: string): Promise<Project | null> {
    try {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      if (res.ok && data.success) {
        return data.data;
      }
    } catch {
      // Fallback local
    }
    const local = getLocalProjects();
    return local.find((p) => p.id === id) || null;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return data.data;
      }
    } catch {
      // Fallback local
    }
    const local = getLocalProjects();
    const idx = local.findIndex((p) => p.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...updates, updatedAt: new Date().toISOString() };
      saveLocalProjects(local);
      return local[idx];
    }
    return null;
  },

  async deleteProject(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        const local = getLocalProjects();
        saveLocalProjects(local.filter((p) => p.id !== id));
        return true;
      }
    } catch {
      // Fallback local
    }
    const local = getLocalProjects();
    saveLocalProjects(local.filter((p) => p.id !== id));
    return true;
  },

  async saveFile(projectId: string, path: string, content: string, language = "plaintext", email = "demo@c2x.dev"): Promise<boolean> {
    try {
      const res = await fetch(`/api/projects/${projectId}/files`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-email": email },
        body: JSON.stringify({ path, content, language }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return true;
      }
    } catch {
      // Fallback local file save
    }

    const local = getLocalProjects();
    const proj = local.find((p) => p.id === projectId);
    if (proj && proj.files) {
      const fIdx = proj.files.findIndex((f) => f.path === path);
      if (fIdx !== -1) {
        proj.files[fIdx].content = content;
        proj.files[fIdx].isModified = false;
      } else {
        proj.files.push({ path, name: path.split("/").pop() || path, content, language, isModified: false });
      }
      proj.updatedAt = new Date().toISOString();
      saveLocalProjects(local);
      return true;
    }
    return false;
  },

  async getVersions(projectId: string): Promise<any[]> {
    try {
      const res = await fetch(`/api/projects/${projectId}/versions`);
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {}
    return [{ id: "v1", projectId, savedBy: "User", createdAt: new Date().toISOString() }];
  },

  async getActivity(projectId: string): Promise<any[]> {
    try {
      const res = await fetch(`/api/projects/${projectId}/activity`);
      const data = await res.json();
      if (res.ok && data.success) return data.data;
    } catch {}
    return [{ id: "act_1", projectId, action: "Project initialized", actor: "User", createdAt: new Date().toISOString() }];
  },
};
