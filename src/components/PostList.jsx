import { useState, useEffect } from "react";
import styles from "./PostList.module.css";
import StatusView from "./StatusView.jsx";
import axios from "axios";

function PostList(){
    const [posts,setPosts]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)

    useEffect(()=>{
        async function loadPosts(){
            try{
                setLoading(true)
                setError(null)

                const data = await axios.get(
                    "http://jsonplaceholder.typicode.com/posts?_limit=10"
                )
                setPosts(data.data)
            } catch(err){
                setError(err.message)
            } finally{
                setLoading(false)
        }
    }
    loadPosts()
    },[])
    return (
        <StatusView
        loading={loading}
        error={error}
        empty={posts.length === 0}
        emptyText="暂无文章"
      >
        <section className={styles['post-list']}>
          <h2>文章列表</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id} className={styles['post-list_item']}>
                <span className={styles['post-list_id']}>·{post.id}</span>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </StatusView>
    )
}
 export default PostList