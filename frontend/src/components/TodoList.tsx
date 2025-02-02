import {
  faCheck,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create, del, done, update } from "../store/modules/todo";
import axios from "axios";
import { ReduxState, Todo } from "../types/types";

export default function TodoList() {
  // useSelector()를 통해서 store의 state가져오기
  let todoList = useSelector((state: ReduxState) => state.todo.list);
  // console.log(todoList); // Object - 객체가 받아짐 // 원하는정보는 Object 안의 list 배열.

  todoList = todoList.filter((todo: Todo) => todo.done === false);

  const nextID = useSelector((state: ReduxState) => state.todo.nextID);
  // useDispatch()를 통해서  dispatch 함수 생성
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  // console.log("nextID", nextID); // 3 반환

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };
  // 할일 추가 POST /todo
  const createTodo = async () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      // state를 변경해서 화면을 바꾸는 것
      dispatch(create({ id: nextID, text: inputRef.current.value }));
    }

    // DB정보를 바꾸기 위해서 axios 요청
    await axios.post(`${process.env.REACT_APP_APISERVER}/todo`, {
      text: inputRef.current?.value,
    });
    clearInput();
  };

  // todo 상태 변경 PATCH /todo/:todoId
  const toDone = async (id: number) => {
    // state 를 변경해서 화면을 바꾸는 것
    dispatch(done(id));

    // DB 정보를 바꾸기 위해 axios 요청
    await axios.patch(`${process.env.REACT_APP_APISERVER}/todo/${id}`);
  };

  const enterTodo = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") createTodo();
  };
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // todo 삭제 DELETE /todo/:todoId
  const deletetodo = async (todoId: number) => {
    await axios.delete(`${process.env.REACT_APP_APISERVER}/todo/${todoId}`);
    dispatch(del(todoId));
  };

  // todo 수정
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const getTodo = (todoId: number) => {
    // 1. 수정 모드로 변경하여 버튼 모양 변경
    // 2. 수정하고 싶은 text 값 input value로 넣어주기
    // todoList;
    setIsUpdateMode(true); // 수정 모드로 변경
    const [todo] = todoList.filter((to) => to.id === todoId); // {id, text, done}
    console.log("tooodoo", todo);
    if (inputRef.current) inputRef.current.value = todo.text;
    setUpdateId(todoId);
  };

  const cancelUpdate = () => {
    setIsUpdateMode(false);
    clearInput();
  };

  const updateTodo = async () => {
    const inputValue = inputRef.current?.value as string;
    // DB 데이터 변경
    const res = await axios.patch(
      `${process.env.REACT_APP_APISERVER}/content`,
      {
        id: updateId,
        text: inputValue,
      }
    );
    console.log("===============", res);
    console.log(res.data); //{isSuccess}

    if (res.data.isSuccess) {
      cancelUpdate();
    }

    // 프론트 반영
    dispatch(update(updateId, inputValue));
  };
  return (
    <section className="Todo">
      <h3>할일 목록</h3>
      <div>
        <input type="text" ref={inputRef} onKeyDown={enterTodo} />
        {isUpdateMode ? (
          <>
            <button onClick={updateTodo}>수정</button>
            <button onClick={cancelUpdate}>수정 취소</button>
          </>
        ) : (
          <button onClick={createTodo}>추가</button>
        )}
      </div>
      <ul className="ul todo">
        {todoList.map((todo) => {
          return (
            <li key={todo.id} className="li todo">
              <button
                onClick={
                  () => toDone(todo.id)
                  // dispatch();
                }
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <span>{todo.text}</span>

              <button onClick={() => getTodo(todo.id)}>
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button onClick={() => deletetodo(todo.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
