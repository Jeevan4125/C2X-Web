# C2X Cloud Projects & Workspace System Implementation Plan

Implement a production-ready Cloud Projects & Workspace system for C2X, enabling authenticated users to create, manage, collaborate, edit, and persist projects across devices through backend cloud storage and database architecture, while seamlessly integrating with the existing `/editor` Web IDE.

## User Review Required

> [!IMPORTANT]
> - Projects will be tied to authenticated user accounts in the PostgreSQL/in-memory backend and persist across devices.
> - The existing `/editor` will be enhanced to load project files via `?projectId=...&file=...` and save changes (`Ctrl+S` / Auto-save) directly to the backend cloud storage.
> - New pages will be created: `/dashboard`, `/projects`, `/projects/:projectId`, and `/new-project`.

## Open Questions

- None. Proceeding with full backend storage abstraction, dashboard UI, and editor cloud synchronization.

## Proposed Changes

### Backend (`backend/`)
#### [MODIFY] [pool.js](file:///C:/Users/Jeevan%20kumar%20S/OneDrive/Pictures/EXED/backend/src/db/pool.js)
- Add database tables for `projects`, `project_folders`, `project_files`, `project_versions`, `project_members`, `project_activity`, `project_shares`.

#### [NEW] [projectController.js](file:///C:/Users/Jeevan%20kumar%20S/OneDrive/Pictures/EXED/backend/src/controllers/projectController.js)
- Implement REST APIs for project CRUD, file/folder tree management, version history, sharing, and member permissions.

#### [NEW] [projectRoutes.js](file:///C:/Users/Jeevan%20kumar%20S/OneDrive/Pictures/EXED/backend/src/routes/projectRoutes.js)
- Register project endpoints under `/api/projects`.

#### [MODIFY] [server.js](file:///C:/Users/Jeevan%20kumar%20S/OneDrive/Pictures/EXED/backend/src/server.js)
- Mount project routes.

### Frontend (`src/`)
#### [NEW] [projectService.ts](file:///C:/Users/Jeevan%20kumar%20S/OneDrive/Pictures/EXED/src/services/projectService.ts)
- API client for communicating with backend project endpoints.

#### [NEW] [Dashboard.tsx](file:///C:/Users/Jeevan%20kumar%20S/OneDrive/Pictures/EXED/src/pages/Dashboard/Dashboard.tsx)
- Authenticated user dashboard (`/dashboard`) displaying recent projects, quick actions, and continue working.

#### [NEW] [ProjectsManager.tsx](file:///C:/Users/Jeevan%20kumar%20S/OneDrive/Pictures/EXED/src/pages/Projects/ProjectsManager.tsx)
- Main project manager (`/projects`) with search, filter, star/archive, and import.

#### [NEW] [ProjectDetail.tsx](file:///C:/Users/Jeevan%20kumar%20S/OneDrive/Pictures/EXED/src/pages/ProjectDetail/ProjectDetail.tsx)
- Project file explorer and settings (`/projects/:projectId`) with "Open in C2X Editor" integration.

#### [NEW] [NewProject.tsx](file:///C:/Users/Jeevan%20kumar%20S/OneDrive/Pictures/EXED/src/pages/NewProject/NewProject.tsx)
- Project creation wizard (`/new-project`) with templates (React, Node, Empty, etc.).

#### [MODIFY] [router.tsx](file:///C:/Users/Jeevan%20kumar%20S/OneDrive/Pictures/EXED/src/app/router.tsx)
- Register routes for `/dashboard`, `/projects`, `/projects/:projectId`, and `/new-project`.

#### [MODIFY] [WebIDE.tsx](file:///C:/Users/Jeevan%20kumar%20S/OneDrive/Pictures/EXED/src/pages/WebIDE/WebIDE.tsx)
- Support `projectId` and `file` query parameters, load cloud files from backend, and save edits (`Ctrl+S`) to backend cloud storage.

## Verification Plan

### Automated Tests
- Run `npm run build` (`tsc -b && vite build`) to verify zero TypeScript errors and clean production build.

### Manual Verification
- Log in, create a project, open `/editor?projectId=...`, edit a file, press `Ctrl+S`, log out, log in on another device, and verify project and file changes persist.
