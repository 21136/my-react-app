import type { Todo } from "../types/todo";
import "./TodoItem.css";

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.done ? "todo-item--done" : ""}`}>
      <label className="todo-item_label">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.text}</span>
      </label>
      <button
        type="button"
        className="todo-item_delete"
        onClick={() => onDelete(todo.id)}
        aria-label="删除"
      >
        删除
      </button>
    </li>
  );
}

export default TodoItem;
