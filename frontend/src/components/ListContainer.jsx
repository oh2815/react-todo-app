import DoneList from "./DoneList";
import TodoList from "./TodoList";
import "../style/todo.scss";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { init } from "../store/modules/todo";

export default function ListContainer() {
  const dispatch = useDispatch();
  console.log(process.env.REACT_APP_APISERVER);
  async function getTodos() {
    try {
      const todos = await axios.get(`${process.env.REACT_APP_APISERVER}/todos`);
      console.log(todos.data);
      if (todos.data) dispatch(init(todos.data));
    } catch (err) {
      console.log(err, "errrrrr");
    }
  }

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <main className="ListContainer">
      <TodoList />
      <div className="blank"></div>
      <DoneList />
    </main>
  );
}
