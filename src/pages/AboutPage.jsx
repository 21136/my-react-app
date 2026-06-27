function AboutPage() {
    return (
      <>
      <section 
      style={{
        marginLeft:'620px'
      }}>
        <h1>关于</h1>
        <p>前端秋招 100 天 · React 学习项目</p>
        <p>Day 49：React Router 三页面路由</p>
      </section>
      <footer
       style={{
        marginTop: '70px',
        marginLeft: '620px',
        paddingTop: '24px',
        borderTop: '1px solid var(--border)',
       
      }}>
          <a href = "https://github.com/21136/my-react-app.git"
          target="_blank"
          rel="noopener noreferrer">
          https://github.com/21136/my-react-app.git
          </a>
      </footer>
      </>
    );
  }
  export default AboutPage;