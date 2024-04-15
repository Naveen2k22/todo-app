"use client";

import { createContext, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { AppContext } from "./AppContext";
import getTodoList from "../handlers/todoHandlers/getTodoList";
import { default as deleteTodoHandler } from "../handlers/todoHandlers/deleteTodo";
import updateTodo from "../handlers/todoHandlers/updateTodo";
import createTodo from "../handlers/todoHandlers/createTodo";

export const TodoContext = createContext();

const todoActions = {
  SET_VALUE: "SET_VALUE",
  SET_MULTIPLE_VALUES: "SET_MULTIPLE_VALUES",
  ADD_TODO: "ADD_TODO",
  SET_TODO: "SET_TODO",
  DELETE_TODO: "DELETE_TODO",
  UNDO: "UNDO",
  REDO: "REDO",
};

const todoReducer = (draft, action) => {
  const addToPast = () => {
    draft.past.push({
      todos: JSON.parse(JSON.stringify(draft.todos)),
      enableSave: draft.enableSave,
    });
  };

  switch (action.type) {
    case todoActions.SET_VALUE:
      let { name, value } = action;
      draft[name] = value;
      break;
    case todoActions.SET_MULTIPLE_VALUES:
      let { values } = action;
      return {
        ...draft,
        ...values,
      };
    case todoActions.ADD_TODO:
      addToPast();
      draft.todos.push({
        title: "New Item",
        done: false,
      });
      draft.enableSave = true;
      break;
    case todoActions.SET_TODO:
      addToPast();
      draft.todos[action.index][action.name] = action.value;
      draft.enableSave = true;
      break;
    case todoActions.DELETE_TODO:
      addToPast();
      draft.todos[action.index].isDeleted = true;
      draft.enableSave = true;
      break;
    case todoActions.UNDO:
      if (draft.past.length > 0) {
        const newPresent = draft.past.pop();
        draft.future.unshift({
          todos: JSON.parse(JSON.stringify(draft.todos)),
          enableSave: draft.enableSave,
        });
        draft.todos = JSON.parse(JSON.stringify(newPresent.todos));
        draft.enableSave = newPresent.enableSave;
      }
      break;
    case todoActions.REDO:
      if (draft.future.length > 0) {
        const newPresent = draft.future.shift();
        draft.past.push({
          todos: JSON.parse(JSON.stringify(draft.todos)),
          enableSave: draft.enableSave,
        });
        draft.todos = JSON.parse(JSON.stringify(newPresent.todos));
        draft.enableSave = newPresent.enableSave;
      }
      break;
    default:
      break;
  }
};

const intitalData = {
  isFetching: false,
  fetched: false,
  todos: [],
  enableSave: false,
  past: [],
  future: [],
  saving: false,
};

export const TodoContextProvider = ({ children }) => {
  const { getLoginDetails } = useContext(AppContext);

  const [todo, dispatchTodo] = useImmerReducer(todoReducer, intitalData);

  useEffect(() => {
    if (!todo.isFetching && !todo.fetched) {
      dispatchTodo({
        name: "isFetching",
        value: true,
        type: todoActions.SET_VALUE,
      });

      const token = getLoginDetails("token");

      const onSuccess = (response) => {
        const todos = response.data.items;
        dispatchTodo({
          values: {
            isFetching: false,
            fetched: true,
            todos,
          },
          type: todoActions.SET_MULTIPLE_VALUES,
        });
      };

      const onError = (error) => {
        dispatchTodo({
          values: {
            isFetching: false,
            fetched: true,
          },
          type: todoActions.SET_MULTIPLE_VALUES,
        });
      };
      getTodoList(token, onSuccess, onError);
    }
  }, [todo.isFetching, getLoginDetails, dispatchTodo, todo.fetched]);

  const addNewTodo = () => {
    dispatchTodo({
      type: todoActions.ADD_TODO,
    });
  };

  const handleChangeTodoItem = (index, name, value) => {
    dispatchTodo({
      type: todoActions.SET_TODO,
      index,
      name,
      value,
    });
  };

  const deleteTodo = (index) => {
    dispatchTodo({
      type: todoActions.DELETE_TODO,
      index,
    });
  };

  const undoTodo = () => {
    dispatchTodo({
      type: todoActions.UNDO,
    });
  };

  const redoTodo = () => {
    dispatchTodo({
      type: todoActions.REDO,
    });
  };

  const onSaveTodos = () => {
    dispatchTodo({
      name: "saving",
      value: true,
      type: todoActions.SET_VALUE,
    });
    const todoPromises = [];

    const token = getLoginDetails("token");
    todo.todos.forEach((todo) => {
      // will handle the deleted one first
      if (todo.isDeleted) {
        if (todo.id) {
          // delete todo handler
          const onSuccess = (res) => {
            return res;
          };

          const onError = () => {
            throw new Error();
          };

          todoPromises.push(deleteTodoHandler(todo, token, onSuccess, onError));
        }
        return;
      }

      if (todo.id) {
        // update todo
        const onSuccess = (res) => {
          return res;
        };

        const onError = () => {
          throw new Error();
        };
        todoPromises.push(updateTodo(todo, token, onSuccess, onError));
        return;
      }

      // else create todo
      const onSuccess = (res) => {
        return res;
      };

      const onError = () => {
        throw new Error();
      };
      todoPromises.push(createTodo(todo, token, onSuccess, onError));
      return;
    });

    Promise.all(todoPromises)
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((_) => {
        const token = getLoginDetails("token");

        const onSuccess = (response) => {
          const todos = response.data.items;
          dispatchTodo({
            values: {
              saving: false,
              past: [],
              future: [],
              todos,
              enableSave: false,
            },
            type: todoActions.SET_MULTIPLE_VALUES,
          });
        };

        const onError = (error) => {
          dispatchTodo({
            values: {
              saving: false,
              past: [],
              future: [],
              enableSave: false,
            },
            type: todoActions.SET_MULTIPLE_VALUES,
          });
        };
        getTodoList(token, onSuccess, onError);
      });
  };

  return (
    <TodoContext.Provider
      value={{
        ...todo,
        addNewTodo,
        handleChangeTodoItem,
        deleteTodo,
        undoTodo,
        redoTodo,
        onSaveTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
