import "./FilterBar.css"

const FILTERS = [
    {value: "all",label:"all"},
    {value: "active",label:"activing"},
    {value: "done",label:"finished"}
]

function FilterBar({filter,onFilterChange,activeCount,doneCount}){
    return(
        <div className = "filter-bar">
            <div className="filter-bar_tabs" role = "tablist">
                {FILTERS.map(({value,label})=>(
                    <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={filter===value}
                    className={`filter-bar_tab${filter === value ? "filter-bar_tab--active":""}`}
                    onClick={()=>onFilterChange(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <p className="filter-bar_stats">
                未完成{activeCount}·已完成{doneCount}
            </p>
        </div>
    )
}
export default FilterBar