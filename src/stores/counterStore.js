import {create} from "zustand"

export const useCounterStore = create((set)=>({
    count : 0,
    inc: ()=>set((state) =>({count:state.count + 1})),
}))

function Demo(){
    const count = useCountStore((s)=> s.count)
    const inc = useCounterStore((s)=> s.inc)
    return <button onClick={inc}>{count}</button>
}