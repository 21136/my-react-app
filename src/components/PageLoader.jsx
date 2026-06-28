import {Spin} from "antd";
 export default function PageLoader(){
    return (
        <div
        style={{
            display:"felx",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            padding: 48,
            minHeight:200,
        }}
        >
            <Spin size="large"/>
            <p style ={{marginTop:12,color:"#64748b"}}>页面加载中...</p>
        </div>
    );
 }