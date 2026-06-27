import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockLogin } from "../api/mockLogin.js";
import { useLocalstorage } from "../hooks/useLocalStorage.js";
import { useAuthStore} from "../stores/useAuthStore.js"
import { Form, Input, Button, Alert, Card } from "antd";
import "./LoginPage.css";


function LoginPage(){
    const navigate = useNavigate()
    const login = useAuthStore((s)=>s.login)
    const [token, setToken] = useLocalstorage("auth_token", null);
    const [user, setUser] = useLocalstorage("auth_user", "");
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(null)
    const [submitting,setSubmitting] = useState(false)

    function validate(){
        if(!username.trim())return "请输入用户名"
        if(password.length<6)return "密码至少6位"
        return null;
    }

    async function handleSubmit(e){
        e.preventDefault();
        const msg = validate()
        if(msg){
            setError(msg)
            return;
        }

        setError(null)
        setSubmitting(true)
        try{
            const data = await mockLogin(username.trim(),password)
            setToken(data.token);
            setUser(data.username);
            login(data.token, data.username);   // ← 替代 setItem / useLocalStorage
            navigate("/", { replace: true });
        } catch (error) {
            setError(error.message || "登陆失败")
        } finally {
            setSubmitting(false)
        }
    }
    async function handleFinish(values){
        setError(null)
        setSubmitting(true)
        try{
            const data = await mockLogin(values.username.trim(),values.password)
            login(data.token,data.username)
            navigate("/",{replace:true})
        } catch(err){
            setError(err.message || "登录失败")
        } finally{
            setSubmitting(false)
        }
    }
        return (
            // <div className = "login-page">
            //     <form className = "login-card" onSubmit = {handleSubmit}>
            //         <h1>登录</h1>
            //         <p className = "login-card_hint">测试账号:admin / 123456</p>

            //         {error && (
            //             <p className = "login-card_error" role = "alert">{error}</p>
            //         )}

            //         <label htmlFor = "username">用户名</label>
            //         <input
            //             id="username"
            //             type="text"
            //             value={username}
            //             onChange={(e) => setUsername(e.target.value)}
            //             autoComplete="username"
            //             disabled={submitting}
            //             />
            //             <label htmlFor="password">密码</label>
            //         <input
            //         id="password"
            //         type="password"
            //         value={password}
            //         onChange={(e) => setPassword(e.target.value)}
            //         autoComplete="current-password"
            //         disabled={submitting}
            //         />
            //         <button type="submit" disabled={submitting}>
            //         {submitting ? "登录中…" : "登录"}
            //         </button>
            //     </form>
            // </div>

            <div style={{maxWidth:400,margin:'40px auto',padding:16}}>
                <Card title="登录">
                    <p style = {{color:"#999",fontSize:12,marginBottom:16}}>
                        测试账号： admin /  123456
                    </p>
                    {error&& (
                        <Alert type = "error" message={error} showIcon style={{marginBottom:16}}/>
                    )}

                    <Form layout = "vertical" onFinish = {handleFinish} autoComplete="off">
                        <Form.Item
                        label = "用户名"
                        name = "username"
                        rules = {[{required:true,message:"请输入用户名"}]}
                        >
                        <Input placeholder = "用户名" disabled = {submitting}/>
                        </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                        { required: true, message: "请输入密码" },
                        { min: 6, message: "密码至少 6 位" },
                        ]}
                            >
                        <Input.Password placeholder="密码" disabled={submitting} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={submitting}>
                        登录
                        </Button>
                    </Form.Item>
                    </Form>
                </Card>
            </div>
        )
}
export default LoginPage