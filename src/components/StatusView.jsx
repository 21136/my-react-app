import styles from "./StatusView.module.css"

function StatusView({loading,error,empty,emptyText="暂无数据",children}){
    if(loading){
        return <p className={styles.status}>loading...</p>
    }
    if(error){
        return <p className={styles.status}>error:{error}</p>
    }
    if(empty){
        return <p className={styles.status}>{emptyText}</p>
    }
    return children
}
export default StatusView