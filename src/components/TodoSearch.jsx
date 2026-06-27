function TodoSearch({value,onChange}){
    return (
        <input
        className = "todo-search"
        type = "search"
        value={value}
        onChange = {(e)=>onChange(e.target.value)}
        placeholder="搜索待办"
        />
    )
}
export default TodoSearch;