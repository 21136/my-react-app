import TodoApp from "../components/TodoApp";
import { Modal, message } from "antd";

function TodoPage() {
  return (
    <section>
      <h1>待办清单</h1>
      <TodoApp />
    </section>
  );
}
export default TodoPage;

function handleDeleteTodo(id, setTodos) {
  Modal.confirm({
    title: "确认删除这条 Todo？",
    content: "删除后无法恢复（本地 state）",
    okText: "删除",
    okType: "danger",
    cancelText: "取消",
    onOk: () => {
      setTodos((prev) => prev.filter((t) => t.id !== id));
      message.success("已删除");
    },
  });
}