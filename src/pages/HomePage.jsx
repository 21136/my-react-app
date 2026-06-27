import {useNavigate} from "react-router-dom"

function HomePage() {
    const navigate = useNavigate()
    return (
      <button type = "button"
      style={{
        padding: '7px 20px',
        margin:'60px 700px',
        background: "#0891b2",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
      }}
      onClick={()=>navigate("/todos")}>
        去看待办
      </button>
    );
  }
  export default HomePage;