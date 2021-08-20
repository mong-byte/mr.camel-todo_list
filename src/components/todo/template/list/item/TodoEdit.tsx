import { DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import styled from "styled-components";
import { EditTodotype, Itodo } from "../../../TodoService";
import { OPTIONS } from "../../create/TodoCreate";

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const EditInput = styled.input`
  all: unset;
  flex: 1;
  height: 30px;
  padding: 0px 5px;
  font-size: 16px;
  color: #33bb77;
  border: 1px solid #dddddd;
`;

const TodoButton = styled.button`
  all: unset;
  padding: 5px;
  margin-left: 5px;
  color: #33bb77;
  cursor: pointer;
`;

const EditDate = styled(DatePicker)`
  &:hover {
    border-color: #d9d9d9;
  }
  input {
    color: #119955;
    &::placeholder {
      opacity: 0.6;
    }
  }
`;

interface TodoEditProps {
  toggleEditMode: () => void;
  editTodo: (id: number, Etodo: EditTodotype) => void;
  todo: Itodo;
}

const TodoEdit = ({ toggleEditMode, editTodo, todo }: TodoEditProps) => {
  const [editTodoState, setEidtTodoState] = useState({
    text: todo.text,
    date: {
      dates: todo.date.dates,
      dateString: todo.date.dateString,
    },
  });

  const editTodoText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setEidtTodoState({
      ...editTodoState,
      text: value,
    });
  };

  const onEditDateChange = (dates: any, datesString: string) => {
    if (!dates)
      return setEidtTodoState({
        ...editTodoState,
        date: {
          dates: todo.date.dates,
          dateString: todo.date.dateString,
        },
      });
    const date = dates._d.toLocaleString("en-US", OPTIONS);
    setEidtTodoState({
      ...editTodoState,
      date: {
        dates: date,
        dateString: datesString,
      },
    });
  };

  const updateTodo = () => {
    editTodo(todo.id, editTodoState);
    toggleEditMode();
  };

  const cencelUpdate = () => {
    toggleEditMode();
  };

  return (
    <EditContainer>
      <EditInput
        type="text"
        value={editTodoState.text}
        onChange={editTodoText}
      />
      <EditDate
        allowClear={false}
        value={moment(editTodoState.date.dateString)}
        onChange={onEditDateChange}
      />
      <TodoButton onClick={updateTodo}>edit</TodoButton>
      <TodoButton onClick={cencelUpdate}>cancel</TodoButton>
    </EditContainer>
  );
};

export default React.memo(TodoEdit);
