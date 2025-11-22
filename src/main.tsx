import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { TasksProvider } from "./context/TasksContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Layout } from "./components/layout/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { NewTaskPage } from "./pages/NewTaskPage";
import { TaskDetailPage } from "./pages/TaskDetailPage";
import { CompletedTasksPage } from "./pages/CompletedTasksPage";
import { ToastProvider } from "./context/ToastContext";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TasksProvider>
          <ToastProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/tasks/new" element={<NewTaskPage />} />
                <Route path="/tasks/:id" element={<TaskDetailPage />} />
                <Route path="/completed" element={<CompletedTasksPage />} />
              </Routes>
            </Layout>
          </ToastProvider>
        </TasksProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
