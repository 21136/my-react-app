import {useState,useEffect} from "react"

function readstorage(key, initialValue){
    try{
        const raw = localStorage.getItem(key)
        if(raw === null) return initialValue
        return JSON.parse(raw)
    } catch {
        return initialValue
    }
}

export function useLocalstorage(key,initialValue){
    const [value,setValue] = useState(()=> readstorage(key,initialValue))

    useEffect(()=>{
        try{
            if(value === null || value === undefined){
                localStorage.removeItem(key)
            } else {
                localStorage.setItem(key,JSON.stringify(value))
            }
        } catch (err) {
            console.warn("useLocalStorage write failed:",err)
        }
    },[key,value])

    return [value,setValue]
}