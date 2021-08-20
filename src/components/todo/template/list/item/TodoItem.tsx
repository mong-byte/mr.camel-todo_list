import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { EditTodotype, Itodo } from "../../../TodoService";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Modal } from "antd";
import TodoEdit from "./TodoEdit";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;
  cursor: pointer;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;

  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 16px;
  color: #119955;

  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const GoalDate = styled.span<{ done: boolean }>`
  margin-right: 30px;
  font-size: 16px;
  color: #119955;

  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const EditButton = styled.button`
  all: unset;
  padding: 3px;
  margin-right: 5px;
  border-radius: 5px;
  color: #119955;
  cursor: pointer;

  &:disabled {
    color: #ced4da;
    text-decoration: line-through;
  }
`;

const ConfirmModal = styled(Modal)`
  .ant-modal-close-icon > svg:hover {
    color: #119955;
  }

  .ant-modal-footer {
    .ant-btn:first-child {
      color: #119955;

      &:hover {
        border-color: #119955;
      }
    }
  }
  .ant-btn-primary {
    background-color: #119955;
    border-color: #119955;
  }
`;

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, Etodo: EditTodotype) => void;
  todo: Itodo;
}

const TodoItem = ({
  toggleTodo,
  removeTodo,
  editTodo,
  todo,
}: TodoItemProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // const done = false;
  const { done } = todo;
  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleRemove = () => {
    if (!done) return setModalOpen(true);
    removeTodo(todo.id);
  };

  const deleteUncomplete = () => {
    removeTodo(todo.id);
    setModalOpen(false);
  };

  const toggleEdditMode = () => {
    setEditMode(!editMode);
  };

  return editMode ? (
    <TodoEdit
      toggleEditMode={toggleEdditMode}
      editTodo={editTodo}
      todo={todo}
    />
  ) : (
    <>
      <TodoItemBlock>
        <CheckCircle done={done} onClick={handleToggle}>
          {done && <CheckOutlined />}
        </CheckCircle>
        <Text done={done}>{todo.text}</Text>
        <GoalDate done={done}>{todo.date.dates}</GoalDate>
        <EditButton disabled={done} onClick={() => setEditMode(true)}>
          edit
        </EditButton>
        <Remove onClick={handleRemove}>
          <DeleteOutlined />
        </Remove>
      </TodoItemBlock>
      {modalOpen && (
        <ConfirmModal
          visible={modalOpen}
          onOk={deleteUncomplete}
          onCancel={() => setModalOpen(false)}
        >
          <p>완료 되지 않은 항목입니다.</p>
          <p>삭제하시겠습니까?</p>
        </ConfirmModal>
      )}
    </>
  );
};

export default React.memo(TodoItem);
