import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

export default function DoneList() {
  let doneList = useSelector((state) => state.todo.list);

  doneList = doneList.filter((done) => done.done === true);
  return (
    <section className="Done">
      <h3>완료 목록</h3>
      <div>
        <ul className="ul done">
          {doneList.map((done) => {
            return (
              <li key={done.id} className="li done">
                <FontAwesomeIcon icon={faFire} className="fire" />
                {done.text}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
