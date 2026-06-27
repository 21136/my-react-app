import {useState,useEffect} from "react"
import axios from "axios"

export function useFetch(url){
    const [data,setData] = useState(null)
    const [loading ,setLoading] = useState(Boolean(url))
    const [error,setError] = useState(null)

    useEffect(()=>{
        if(!url){
            setLoading(false)
            return;
        }
        let cancelled = false
        async function load(){
            setLoading(true)
            setError(null)
            try{
                const res = await axios.get(url)
                if(!cancelled)setData(res.data)
            } catch (err){
        if(!cancelled){
            setError(err.message || "请求失败")
            setData(null)
        }
    } finally{
        if(!cancelled)setLoading(false)
    }
        }

        load();
        return ()=>{
            cancelled = true
        }
    },[url])
    return {data,loading,error}
}
