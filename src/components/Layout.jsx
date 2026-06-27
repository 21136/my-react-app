import {NavLink,Outlet,useNavigate} from "react-router-dom"
import { useLocalstorage } from "../hooks/useLocalStorage.js";
import "./Layout.css"
import { useAuthStore } from "../stores/useAuthStore.js";

function Layout(){
    const navigate = useNavigate();
    const user = useAuthStore((s) => s.user);
    const isLoggedIn = useAuthStore((s) => Boolean(s.token));
    const logout = useAuthStore((s) => s.logout);
    const [token] = useLocalstorage("auth_token", null);
    function handleLogout() {
        logout();
        navigate("/login", { replace: true });
      }

    return(
        <div className = "Layout">
            <header className = "layout_header">
                <nav className = "layout_nav">
                    {/* <NavLink to="/login" className="nav-link">
                    登录
                    </NavLink> */}
                    <NavLink to = "/" end className = "nav-link">
                    首页
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
                <div className = "layout_auth">
                    {
                        isLoggedIn?(
                            <>
                            <span>你好，{user}</span>
                            <button type = "button" onClick={handleLogout}>退出</button>
                            </>
                        ):(
                            <NavLink to = "/login" className="nav-link">登录</NavLink>
                        )
                    }
                </div>
            </header>
            <main className = "layout_main">
                <Outlet/>
            </main>
        </div>
    )
}
export default Layout