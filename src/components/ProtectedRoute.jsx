import {Navigate,useLocation} from "react-router-dom"
import {useAuthStore} from "../stores/useAuthStore.js"

export default function ProtectdRoute({children}){
    const token = useAuthStore((s)=>s.token)
    const location = useLocation()

    if(!token){
        return <Navigate to ="/login" state={{from : location}} replace/>
    }
    return children
}