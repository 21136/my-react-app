import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import LazyPage from "@/components/LazyPage.jsx";

const ChatPage = lazy(() => import("@/pages/ChatPage.jsx"));
const LoginPage = lazy(() => import("@/pages/LoginPage.jsx"));
const HomePage = lazy(() => import("@/pages/HomePage.jsx"));
const TodoPage = lazy(() => import("@/pages/TodoPage.jsx"));
const AboutPage = lazy(() => import("@/pages/AboutPage.jsx"));
const PostListPage = lazy(() => import("@/pages/PostListPage.jsx"));
const PostDetailPage = lazy(() => import("@/pages/PostDetailPage.jsx"));



function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LazyPage>
            <LoginPage />
          </LazyPage>
        }
      />
      <Route path="/" element={<Layout />}>

        <Route
          index
          element={
            <LazyPage>
              <HomePage />
            </LazyPage>
          }
        />
        <Route
        path="chat"
        element={
          <LazyPage>
            <ChatPage />
          </LazyPage>
        }
      />

        <Route
          path="todos"
          element={
            <ProtectedRoute>
              <LazyPage>
                <TodoPage />
              </LazyPage>
            </ProtectedRoute>
          }
        />
        <Route
          path="about"
          element={
            <LazyPage>
              <AboutPage />
            </LazyPage>
          }
        />
        <Route
          path="posts"
          element={
            <LazyPage>
              <PostListPage />
            </LazyPage>
          }
        />
        <Route
          path="posts/:id"
          element={
            <LazyPage>
              <PostDetailPage />
            </LazyPage>
          }
        />
      </Route>
    </Routes>
  );
}


export default App
