import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Drawer } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import { ChatPanel } from "@/components/chat/ChatPanel.jsx";
import "./Layout.css";
import { useAuthStore } from "@/stores/useAuthStore.js";

function Layout() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isLoggedIn = useAuthStore((s) => Boolean(s.token));
  const logout = useAuthStore((s) => s.logout);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }
  function openAiAssistant() {
    setAiDrawerOpen(true);
  }
  function closeAiAssistant() {
    setAiDrawerOpen(false);
  }

  return (
    <div className="Layout">
      <header className="layout_header">
        <nav className="layout_nav">
          <NavLink to="/" end className="nav-link">
            首页
          </NavLink>
          <NavLink to="/chat" className="nav-link">
            AI 聊天
          </NavLink>
          <NavLink to="/todos" className="nav-link">
            待办
          </NavLink>
          <NavLink to="/about" className="nav-link">
            关于
          </NavLink>
          <NavLink to="/posts" className="nav-link">
            文章
          </NavLink>
        </nav>
        <div className="layout_auth">
          <Button
            type="primary"
            icon={<RobotOutlined />}
            onClick={openAiAssistant}
            style={{ marginRight: 12 }}
          >
            AI 助手
          </Button>
          {isLoggedIn ? (
            <>
              <span
                style={{
                  margin: "640px",
                  fontSize: "1.5rem",
                }}
              >
                你好，{user}
              </span>
              <button type="button" style={{}} onClick={handleLogout}>
                退出
              </button>
            </>
          ) : (
            <NavLink to="/login" className="nav-link">
              登录
            </NavLink>
          )}
        </div>
      </header>
      <main className="layout_main">
        <Outlet />
      </main>
      <Drawer
      title="AI 助手"
      open={aiDrawerOpen}
      onClose={closeAiAssistant}
      size={480}
      destroyOnClose
      styles={{ body: { padding: 0 } }}
    >
      <ChatPanel mode="assistant" embedded />
    </Drawer>
    </div>
  );
}
export default Layout;