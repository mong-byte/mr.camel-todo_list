import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { Itodo } from "../../../todo/TodoService";
import moment from "moment";

export const OPTIONS = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const CircleButton = styled.button<{ close: boolean }>`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
  }
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  align-items: center;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  width: 75%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  position: relative;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

const ChooseDate = styled(DatePicker)`
  height: 59px;
  border-color: #d9d9d9;
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

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
}

const TodoCreate = ({
  nextId,
  createTodo,
  incrementNextId,
}: TodoCreateProps) => {
  const [close, setClose] = useState(true);
  const [value, setValue] = useState("");
  const [selectedDate, setSelectedDate] = useState({
    dates: "",
    dateString: "",
  });

  useEffect(() => {
    selectedDate.dates && value ? setClose(false) : setClose(true);
  }, [selectedDate, value]);

  // const handleToggle = () => setClose(!open);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const onChange = (dates: any, datesString: string) => {
    if (!dates)
      return setSelectedDate({
        dates: "",
        dateString: "",
      });
    const date = dates._d.toLocaleString("en-US", OPTIONS);
    setSelectedDate({
      dates: date,
      dateString: datesString,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    createTodo({
      id: nextId,
      text: value,
      done: false,
      date: selectedDate,
    });
    incrementNextId(); // nextId 하나 증가

    setValue(""); // input 초기화
    setSelectedDate({
      dates: "",
      dateString: "",
    });
    setClose(false); // open 닫기
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <Input
            autoFocus
            placeholder="What's need to be done?"
            onChange={handleChange}
            value={value}
          />
          <ChooseDate
            placeholder="Goal date"
            value={
              selectedDate.dateString ? moment(selectedDate.dateString) : null
            }
            onChange={onChange}
          />
          <CircleButton disabled={close} close={close}>
            <PlusCircleOutlined />
          </CircleButton>
        </InsertForm>
      </InsertFormPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
