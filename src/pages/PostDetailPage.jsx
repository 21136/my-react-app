import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import axios from "axios";
import "./PostDetailPage.css";

const BASE = "https://jsonplaceholder.typicode.com";

function PostDetailPage() {
  const { id } = useParams();
  const url = id?`${BASE}/posts/${id}`:null
  // const [post, setPost] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { data: post, loading, error } = useFetch(url);

  // useEffect(() => {
  //   if (!id) return;

  //   async function load() {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       const { data } = await axios.get(`${BASE}/posts/${id}`);
  //       setPost(data);
  //     } catch (err) {
  //       setError(err.message || "详情加载失败");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   load();
  // }, [id]); // id 变时重新请求（从 /posts/1 切到 /posts/2）

  if (loading) return <p className="status">加载中…</p>;
  if (error) return <p className="error">错误：{error}</p>;
  if (!post) return <p className="status">文章不存在</p>;

  return (
    <article className="post-detail">
      <Link to="/posts" className="post-detail__back">← 返回列表</Link>
      <h1>{post.title}</h1>
      <p className="post-detail__meta">文章 ID：{post.id}</p>
      <div className="post-detail__body">{post.body}</div>
    </article>
  );
}

export default PostDetailPage;