import avatarImg from './assets/avatar.png'
import {useState} from 'react'
import TodoApp from "./components/TodoApp.jsx"
import PostList from "./components/PostList.jsx";
import './App.css'
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import TodoPage from "./pages/TodoPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import PostListPage from "./pages/PostListPage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from "./components/ProtectedRoute.jsx"
// let name1  = "李有杰"
// let role1 = "Admin"
// let avatar1 = avatarImg
// const users = [
//   {
//     id: 1,
//     name: "张三",
//     role: "前端学习者",
//     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan",

//   },
//   {
//     id: 2,
//     name: "李四",
//     role: "UI 设计",
//     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisi",
//   },
//   {
//     id: 3,
//     name: "王五",
//     role: "全栈实习",
//     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu",

//   },
//   {
//     id: 4,
//     name: "赵六",
//     role: "产品经理",
//     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoliu",
//   },
// ];



// function UserCard({name = name1,role = role1 ,avatar = avatar1}){
//   return (
//     <article className = "user-card">
//       <img src={avatar} alt = {name}/>
//       <h3>{name}</h3>
//       <p>{role}</p>
//     </article>
//   )
// }

function App() {
  // const name = "张三"
  // const title = "前端学习者·100天打卡"
  // const skills = ["JavaScript","HTML/CSS","react is studing"]
  // const profileUrl = "http://github.com/21136"
  // const [username,setUsername] = useState("")
  // const [password,setPassword] = useState("")

  // function handleSubmit(e) {
  //   e.preventDefault()
  //   console.log(username)
  // }

  return (
  //   <div className = "app">
  //     <header>
  //       <h1>hello,{name}</h1>
  //       <p className = "subtitle">{title}</p>
  //     </header>

  //     <main>
  //       <section>
  //         <h2>用户卡片</h2>
  //         <UserCard />
  //         <ul className='user-list'>
  //           {users.map((user) => (
  //             <li key={user.id}>
  //               <UserCard
  //                 avatar={user.avatar}
  //                 name={user.name}
  //                 role={user.role}
  //               />
  //             </li>
  //           ))} 
  //         </ul>
  //       </section>

  //       <section>
  //         <h2>skills</h2>
  //         <ul>
  //           {skills.map((skill) =>(
  //             <li key = {skill}>{skill}</li>
  //           ))}
  //         </ul>
  //       </section>

  //       <section>
  //         <h2>link</h2>
  //         <a href={profileUrl} target="_blank" rel = "noopener  noreferrer">
  //           my Github
  //         </a>
  //       </section>

  //       <section>
  //       <form className="login-form" onSubmit={handleSubmit}>
  //         <h2>登录</h2>

  //         <div className="form-row">
  //           <label htmlFor="username">用户名</label>
  //           <input
  //             id="username"
  //             type="text"
  //             value={username}
  //             onChange={(e) => setUsername(e.target.value)}
  //             placeholder="请输入用户名"
  //             autoComplete="username"
  //           />
  //         </div>

  //         <div className="form-row">
  //           <label htmlFor="password">密码</label>
  //           <input
  //             id="password"
  //             type="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             placeholder="请输入密码"
  //             autoComplete="current-password"
  //           />
  //         </div>

  //         <button type="submit">登录</button>
  //       </form>
  //       </section>

  //     <h1>React Todo</h1>
  //     <TodoApp />

  //     <h1>Day 43 · 数据请求</h1>
  //     <PostList />
  //     </main>

  //     <footer>
  //       <p>Day 39 · vite + react + jsx</p>
  //     </footer>
  //   </div>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage />} />
        <Route path="todos" element={<ProtectedRoute><TodoPage /></ProtectedRoute>} />
        <Route path="about" element={<AboutPage />} />
        <Route path="posts" element={<PostListPage />} />
        <Route path="posts/:id" element={<PostDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
