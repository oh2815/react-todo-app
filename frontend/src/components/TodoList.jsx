import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create, done } from "../store/modules/todo";
import axios from "axios";

export default function TodoList() {
  // useSelector()를 통해서 store의 state가져오기
  let todoList = useSelector((state) => state.todo.list);
  // console.log(todoList); // Object - 객체가 받아짐 // 원하는정보는 Object 안의 list 배열.

  todoList = todoList.filter((todo) => todo.done === false);

  const nextID = useSelector((state) => state.todo.nextID);
  // useDispatch()를 통해서  dispatch 함수 생성
  const dispatch = useDispatch();

  const inputRef = useRef();

  console.log("nextID", nextID); // 3 반환
  // 할일 추가 POST /todo
  const createTodo = async () => {
    if (inputRef.current.value.trim() === "") return;
    // state를 변경해서 화면을 바꾸는 것
    dispatch(create({ id: nextID, text: inputRef.current.value }));

    // DB정보를 바꾸기 위해서 axios 요청
    await axios.post(`${process.env.REACT_APP_APISERVER}/todo`, {
      text: inputRef.current.value,
    });

    inputRef.current.value = "";
    inputRef.current.focus();
  };

  // todo 상태 변경 PATCH /todo/:todoId
  const toDone = async (id) => {
    // state 를 변경해서 화면을 바꾸는 것
    dispatch(done(id));

    // DB 정보를 바꾸기 위해 axios 요청
    await axios.patch(`${process.env.REACT_APP_APISERVER}/todo/${id}`);
  };

  // const enterTodo = (e) => {
  //   if (e.nativeEvent.isComposing) return;
  //   if (e.key === "Enter") return;
  // };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <section className="Todo">
      <h3>할일 목록</h3>
      <div>
        <input
          type="text"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") createTodo();
          }}
        />
        <button onClick={createTodo}>추가</button>
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
            </li>
          );
        })}
      </ul>
    </section>
  );
}
