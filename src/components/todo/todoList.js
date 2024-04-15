import { useContext } from "react";
import { TodoContext } from "../../context/todoContext";
import TodoItem from "./TodoItem";
import { IconPlus } from "@arco-design/web-react/icon";
import { Button } from "@arco-design/web-react";

const TodoList = () => {
  const { todos, addNewTodo } = useContext(TodoContext);

  return (
    <ul className="flex flex-col gap-3">
      {todos.map((todo, index) => {
        if (todo.isDeleted) return null;
        return <TodoItem key={todo.id || index} todo={todo} index={index} />;
      })}
      <Button
        type="outline"
        onClick={addNewTodo}
        className={"mt-6 self-start "}
      >
        Add new item <IconPlus />
      </Button>
    </ul>
  );
};

export default TodoList;
