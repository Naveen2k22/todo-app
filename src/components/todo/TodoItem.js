import { Button, Input, Tooltip } from "@arco-design/web-react";
import { useContext, useState } from "react";
import { TodoContext } from "../../context/todoContext";
import { IconDelete, IconEdit, IconSave } from "@arco-design/web-react/icon";
import { twMerge } from "tailwind-merge";

const TodoItem = ({ todo, index }) => {
  const { title, done } = todo;

  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(title);

  const { handleChangeTodoItem, deleteTodo } = useContext(TodoContext);

  const onSaveTodo = () => {
    handleChangeTodoItem(index, "title", text);
  };

  return (
    <li className="flex gap-4 items-center">
      <div className="w-56">
        {isEdit ? (
          <Input value={text} onChange={setText} />
        ) : (
          <p
            className={twMerge(
              "px-3 font-medium select-none cursor-pointer",
              done && "line-through",
            )}
            onClick={() => handleChangeTodoItem(index, "done", !done)}
          >
            {title}
          </p>
        )}
      </div>
      <Tooltip trigger={"hover"} content={isEdit ? "Save" : "Edit"}>
        <Button
          status={isEdit ? "success" : "default"}
          shape="circle"
          size="large"
          onClick={() => {
            setIsEdit((prevalue) => {
              if (prevalue && text !== title) {
                onSaveTodo();
              }
              return !prevalue;
            });
          }}
          icon={isEdit ? <IconSave /> : <IconEdit />}
        ></Button>
      </Tooltip>
      <Tooltip trigger={"hover"} content={"Delete"}>
        <Button
          shape="circle"
          size="large"
          status="danger"
          icon={<IconDelete />}
          onClick={deleteTodo.bind(null, index)}
        ></Button>
      </Tooltip>
    </li>
  );
};

export default TodoItem;
