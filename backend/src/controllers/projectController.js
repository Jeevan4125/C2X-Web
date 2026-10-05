import pool from "../db/pool.js";

// In-memory fallback store for projects and files when DB is offline
const memoryProjects = new Map(); // projectId -> project object
const memoryFiles = new Map(); // projectId -> Map(filePath -> fileObj)
const memoryVersions = new Map(); // projectId -> array of versions
const memoryActivity = new Map(); // projectId -> array of activities

const getTemplateFiles = (template, projectName) => {
  if (template === "react" || template === "vite") {
    return [
      { path: "README.md", name: "README.md", content: `# ${projectName}\n\nCreated with C2X Cloud Workspace.`, language: "markdown" },
      { path: "package.json", name: "package.json", content: JSON.stringify({ name: projectName.toLowerCase().replace(/\s+/g, "-"), version: "1.0.0", dependencies: { react: "^18.2.0" } }, null, 2), language: "json" },
      { path: "src/App.tsx", name: "App.tsx", content: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>\n      <h1>Welcome to ${projectName}</h1>\n      <p>Built with C2X Cloud IDE.</p>\n    </div>\n  );\n}`, language: "typescript" },
      { path: "src/main.tsx", name: "main.tsx", content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nReactDOM.createRoot(document.getElementById('root')!).render(<App />);`, language: "typescript" }
    ];
  } else if (template === "node" || template === "express") {
    return [
      { path: "README.md", name: "README.md", content: `# ${projectName}\n\nNode.js Express Backend.`, language: "markdown" },
      { path: "package.json", name: "package.json", content: JSON.stringify({ name: projectName.toLowerCase().replace(/\s+/g, "-"), version: "1.0.0", main: "server.js", dependencies: { express: "^4.19.2" } }, null, 2), language: "json" },
      { path: "server.js", name: "server.js", content: `const express = require('express');\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.get('/', (req, res) => {\n  res.send('Hello from ${projectName} API!');\n});\n\napp.listen(PORT, () => console.log('Server running on port ' + PORT));`, language: "javascript" }
    ];
  } else {
    // Empty / default
    return [
      { path: "README.md", name: "README.md", content: `# ${projectName}\n\nProject initialized successfully.`, language: "markdown" },
      { path: "index.html", name: "index.html", content: `<!DOCTYPE html>\n<html>\n<head><title>${projectName}</title></head>\n<body>\n  <h1>${projectName}</h1>\n</body>\n</html>`, language: "html" }
    ];
  }
};

export const getProjects = async (req, res) => {
  const email = req.query.email || req.headers["x-user-email"] || "demo@c2x.dev";
  try {
    let projects = [];
    try {
      const result = await pool.query(
        "SELECT * FROM projects WHERE user_email = $1 ORDER BY updated_at DESC",
        [email]
      );
      projects = result.rows;
    } catch {
      projects = Array.from(memoryProjects.values()).filter(p => p.userEmail === email);
    }
    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch projects." });
  }
};

export const createProject = async (req, res) => {
  const { name, description, techStack, visibility, template, email: bodyEmail } = req.body || {};
  const email = bodyEmail || req.headers["x-user-email"] || "demo@c2x.dev";

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: "Project name is required." });
  }

  const projectId = "proj_" + Math.random().toString(36).substring(2, 10);
  const now = new Date().toISOString();
  const projectName = name.trim();
  const desc = description || "";
  const stack = techStack || "React + TypeScript";
  const vis = visibility || "private";

  const newProject = {
    id: projectId,
    userEmail: email,
    name: projectName,
    description: desc,
    techStack: stack,
    visibility: vis,
    isStarred: false,
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  };

  const initialFiles = getTemplateFiles(template || "react", projectName);
  const fileMap = new Map();
  initialFiles.forEach(f => {
    fileMap.set(f.path, { ...f, projectId, isModified: false, updatedAt: now });
  });

  try {
    try {
      await pool.query(
        `INSERT INTO projects (id, user_email, name, description, tech_stack, visibility, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [projectId, email, projectName, desc, stack, vis, now, now]
      );
      for (const f of initialFiles) {
        await pool.query(
          `INSERT INTO project_files (id, project_id, path, name, content, language, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          ["file_" + Math.random().toString(36).substring(2, 10), projectId, f.path, f.name, f.content, f.language, now]
        );
      }
    } catch {
      memoryProjects.set(projectId, newProject);
      memoryFiles.set(projectId, fileMap);
      memoryVersions.set(projectId, [{ id: "v1", projectId, savedBy: email, createdAt: now }]);
      memoryActivity.set(projectId, [{ id: "act_1", projectId, action: `Project created`, actor: email, createdAt: now }]);
    }

    return res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({ success: false, message: "Failed to create project." });
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    let project = null;
    let filesList = [];

    try {
      const pRes = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
      if (pRes.rows.length > 0) {
        project = pRes.rows[0];
        const fRes = await pool.query("SELECT * FROM project_files WHERE project_id = $1", [id]);
        filesList = fRes.rows;
      }
    } catch {
      project = memoryProjects.get(id);
      const fMap = memoryFiles.get(id);
      if (fMap) filesList = Array.from(fMap.values());
    }

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    return res.status(200).json({ success: true, data: { ...project, files: filesList } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch project details." });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, techStack, visibility, isStarred, isArchived } = req.body || {};
  const now = new Date().toISOString();

  try {
    let updated = null;
    try {
      const resQuery = await pool.query(
        `UPDATE projects SET name = COALESCE($1, name), description = COALESCE($2, description),
         tech_stack = COALESCE($3, tech_stack), visibility = COALESCE($4, visibility),
         is_starred = COALESCE($5, is_starred), is_archived = COALESCE($6, is_archived), updated_at = $7
         WHERE id = $8 RETURNING *`,
        [name, description, techStack, visibility, isStarred, isArchived, now, id]
      );
      updated = resQuery.rows[0];
    } catch {
      const p = memoryProjects.get(id);
      if (p) {
        if (name !== undefined) p.name = name;
        if (description !== undefined) p.description = description;
        if (techStack !== undefined) p.techStack = techStack;
        if (visibility !== undefined) p.visibility = visibility;
        if (isStarred !== undefined) p.isStarred = isStarred;
        if (isArchived !== undefined) p.isArchived = isArchived;
        p.updatedAt = now;
        updated = p;
      }
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update project." });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    try {
      await pool.query("DELETE FROM project_files WHERE project_id = $1", [id]);
      await pool.query("DELETE FROM projects WHERE id = $1", [id]);
    } catch {
      memoryProjects.delete(id);
      memoryFiles.delete(id);
      memoryVersions.delete(id);
      memoryActivity.delete(id);
    }
    return res.status(200).json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete project." });
  }
};

export const saveProjectFile = async (req, res) => {
  const { id } = req.params;
  const { path, content, language } = req.body || {};
  const email = req.headers["x-user-email"] || "demo@c2x.dev";
  const now = new Date().toISOString();

  if (!path) {
    return res.status(400).json({ success: false, message: "File path is required." });
  }

  try {
    let savedFile = null;
    try {
      const existing = await pool.query("SELECT id FROM project_files WHERE project_id = $1 AND path = $2", [id, path]);
      if (existing.rows.length > 0) {
        const uRes = await pool.query(
          "UPDATE project_files SET content = $1, language = COALESCE($2, language), updated_at = $3 WHERE project_id = $4 AND path = $5 RETURNING *",
          [content || "", language, now, id, path]
        );
        savedFile = uRes.rows[0];
      } else {
        const name = path.split("/").pop();
        const iRes = await pool.query(
          "INSERT INTO project_files (id, project_id, path, name, content, language, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
          ["file_" + Math.random().toString(36).substring(2, 10), id, path, name, content || "", language || "plaintext", now]
        );
        savedFile = iRes.rows[0];
      }
      await pool.query("UPDATE projects SET updated_at = $1 WHERE id = $2", [now, id]);
    } catch {
      let fMap = memoryFiles.get(id);
      if (!fMap) {
        fMap = new Map();
        memoryFiles.set(id, fMap);
      }
      savedFile = {
        id: "file_" + Math.random().toString(36).substring(2, 10),
        projectId: id,
        path,
        name: path.split("/").pop(),
        content: content || "",
        language: language || "plaintext",
        updatedAt: now,
      };
      fMap.set(path, savedFile);

      let acts = memoryActivity.get(id) || [];
      acts.unshift({ id: "act_" + Math.random(), projectId: id, action: `Updated ${path}`, actor: email, createdAt: now });
      memoryActivity.set(id, acts);
    }

    return res.status(200).json({ success: true, message: "File saved successfully.", data: savedFile });
  } catch (error) {
    console.error("Save file error:", error);
    return res.status(500).json({ success: false, message: "Failed to save file." });
  }
};

export const getProjectVersions = async (req, res) => {
  const { id } = req.params;
  try {
    let versions = [];
    try {
      const resQuery = await pool.query("SELECT * FROM project_versions WHERE project_id = $1 ORDER BY created_at DESC", [id]);
      versions = resQuery.rows;
    } catch {
      versions = memoryVersions.get(id) || [
        { id: "v1", projectId: id, savedBy: "Developer", createdAt: new Date(Date.now() - 3600000).toISOString() }
      ];
    }
    return res.status(200).json({ success: true, data: versions });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch versions." });
  }
};

export const getProjectActivity = async (req, res) => {
  const { id } = req.params;
  try {
    let activities = [];
    try {
      const resQuery = await pool.query("SELECT * FROM project_activity WHERE project_id = $1 ORDER BY created_at DESC LIMIT 50", [id]);
      activities = resQuery.rows;
    } catch {
      activities = memoryActivity.get(id) || [
        { id: "act_1", projectId: id, action: "Project initialized", actor: "Developer", createdAt: new Date().toISOString() }
      ];
    }
    return res.status(200).json({ success: true, data: activities });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch activity." });
  }
};

export const getRecentWorkspaces = async (req, res) => {
  const email = req.query.email || req.headers["x-user-email"] || req.headers["authorization"]?.replace("Bearer ", "") || "demo@c2x.dev";
  try {
    let projects = [];
    try {
      const result = await pool.query(
        "SELECT * FROM projects WHERE user_email = $1 ORDER BY updated_at DESC LIMIT 10",
        [email]
      );
      projects = result.rows;
    } catch {
      projects = Array.from(memoryProjects.values())
        .filter(p => p.userEmail === email)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 10);
    }
    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch recent workspaces." });
  }
};
