/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  date: {
    dates: string;
    dateString: string;
  };
};

export type EditTodotype = {
  text: string;
  date: {
    dates: string;
    dateString: string;
  };
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);
  const [nextIdState, setNextIdState] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const incrementNextId = () => {
    return setNextIdState((prev) => prev + 1);
  };

  const toggleTodo = (id: number) => {
    //@TODO
    setTodoState(
      todoState.map((todo: Itodo) => {
        return todo.id !== id
          ? todo
          : {
              ...todo,
              done: !todo.done,
            };
      })
    );
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) =>
      prevState.filter((todo: Itodo) => todo.id !== id)
    );
  };

  const createTodo = (todo: Itodo) => {
    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextIdState,
      })
    );
  };

  const editTodo = (id: number, Etodo: EditTodotype) => {
    setTodoState((prevState) =>
      prevState.map((todo) => {
        return todo.id !== id
          ? todo
          : {
              ...todo,
              ...Etodo,
            };
      })
    );
  };

  const loadData = () => {
    let data: string | null = localStorage.getItem("todos");
    if (data === null)
      return localStorage.setItem("todos", JSON.stringify(initialTodos));
    if (data === undefined) data = "";
    initialTodos = JSON.parse(data!);
    if (initialTodos && initialTodos.length >= 1) {
      incrementNextId();
    }
    setTodoState(initialTodos);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todoState));
  };

  return {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
    editTodo,
  };
};
