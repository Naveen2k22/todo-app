import { useContext } from "react";
import { TodoContext } from "../../context/todoContext";
import { Button, Spin, Tooltip } from "@arco-design/web-react";
import TodoList from "./todoList";
import { IconRedo, IconSave, IconUndo } from "@arco-design/web-react/icon";

const Todo = () => {
  const {
    isFetching,
    enableSave,
    past,
    future,
    undoTodo,
    redoTodo,
    onSaveTodos,
    saving,
  } = useContext(TodoContext);

  return isFetching ? (
    <div className="mt-4 flex items-center justify-center w-full">
      <Spin loading tip="Loading" />
    </div>
  ) : (
    <div className="mt-4 flex flex-col h-full justify-between">
      <div className="flex w-full justify-end items-center gap-4 mb-4">
        <Tooltip triggerProps={"hover"} content="Undo">
          <Button
            disabled={!past.length}
            onClick={undoTodo}
            icon={<IconUndo />}
          ></Button>
        </Tooltip>
        <Tooltip triggerProps={"hover"} content="Redo">
          <Button
            disabled={!future.length}
            onClick={redoTodo}
            icon={<IconRedo />}
          ></Button>
        </Tooltip>
      </div>
      <TodoList />
      {enableSave && (
        <div className="absolute bottom-8 left-1/2 -translate-y-1/2">
          <Button
            type="primary"
            className={"w-fit "}
            onClick={onSaveTodos}
            loading={saving}
          >
            Save Changes <IconSave />{" "}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Todo;
