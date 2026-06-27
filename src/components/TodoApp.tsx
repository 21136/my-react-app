import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  type SubmitEvent,
  type ChangeEvent,
} from "react";
import TodoItem from "./TodoItem";
import "./TodoApp.css";
import FilterBar from "./FilterBar.jsx";
import TodoSearch from "./TodoSearch.jsx";
import type { Todo, TodoFilter } from "../types/todo";

function TodoApp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  function handleAdd(e: SubmitEvent) {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, done: false },
    ]);
    setInputText("");
    inputRef.current?.focus();
  }

  const handleToggle = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }, []);

  const handleDelete = useCallback((id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const visibleTodos = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    return todos
      .filter((todo) => {
        if (filter === "active") return !todo.done;
        if (filter === "done") return todo.done;
        return true;
      })
      .filter((todo) =>
        keyword ? todo.text.toLowerCase().includes(keyword) : true
      );
  }, [todos, filter, searchQuery]);

  const activeCount = useMemo(
    () => todos.filter((t) => !t.done).length,
    [todos]
  );
  const doneCount = todos.filter((t) => t.done).length;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section className="todo-app">
      <h2>待办清单</h2>
      <form className="todo-app_form" onSubmit={handleAdd}>
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputText(e.target.value)
          }
          placeholder="添加一条待办..."
        />
        <button type="submit">添加</button>
      </form>
      <p className="todo-app_stats">
        共{todos.length}项，已完成{doneCount}项
      </p>
      <TodoSearch value={searchQuery} onChange={setSearchQuery} />
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
        doneCount={doneCount}
      />
      {searchQuery.trim() && (
        <p className="todo-app_hint">
          搜索【{searchQuery}】共{visibleTodos.length}条
        </p>
      )}
      {visibleTodos.length === 0 ? (
        <p className="todo-app_empty">
          {todos.length === 0
            ? "暂无待办"
            : searchQuery.trim()
              ? "没有匹配的待办"
              : "当前筛选下没有任务"}
        </p>
      ) : (
        <ul className="todo-app_list">
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TodoApp;
