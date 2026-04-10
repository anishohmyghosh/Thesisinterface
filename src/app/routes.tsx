import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { CreatePage } from "./components/CreatePage";
import { SongEditorPage } from "./components/SongEditorPage";
import { ExplorePage } from "./components/ExplorePage";
import { StudentModelsPage } from "./components/StudentModelsPage";
import { UploadPageNew } from "./components/UploadPageNew";
import { ProjectsPage } from "./components/ProjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: CreatePage },
      { path: "explore", Component: ExplorePage },
      { path: "student-models", Component: StudentModelsPage },
      { path: "upload", Component: UploadPageNew },
      { path: "projects", Component: ProjectsPage },
      { path: "song/:songId", Component: SongEditorPage },
    ],
  },
]);