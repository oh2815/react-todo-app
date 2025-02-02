import { Todo, TodoState } from "../../types/types";

const initialState: TodoState = {
  list: [],
};

const count = initialState.list.length; //3
initialState["nextID"] = count;

// action type에 대한 상수 설정
const CREATE = "todo/CREATE" as const;
const DONE = "todo/DONE" as const;
const INIT = "todo/INIT" as const;
const DELETE = "todo/DELETE" as const;
const UPDATE = "todo/UPDATE" as const;

// components 에서 사용될 액션 반환 함수
export function create(payload: { id?: number; text: string }) {
  return {
    type: CREATE,
    payload: payload, // {id:number, text:String}
  };
}

export function done(id: number) {
  return {
    type: DONE,
    id: id, // id:number
  };
}

// data:{id, text, done}[]
export function init(data: Todo[]) {
  return {
    type: INIT,
    data: data,
  };
}

export function del(id: number) {
  return { type: DELETE, id: id };
}

export function update(id: number, text: string) {
  return {
    type: UPDATE,
    id,
    text,
  };
}

interface Init {
  type: typeof INIT;
  data: Todo[];
}

interface Done {
  type: typeof DONE;
  id: number;
}

interface Create {
  type: typeof CREATE;
  payload: { id: number; text: string };
}

interface Delete {
  type: typeof DELETE;
  id: number;
}

interface Update {
  type: typeof UPDATE;
  id: number;
  text: string;
}

type Action = Create | Done | Init | Delete | Update;

export function todoReducer(state: TodoState = initialState, action: Action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        list: action.data,
        nextID:
          action.data.length === 0
            ? 1
            : action.data[action.data.length - 1].id + 1,
      };
    case CREATE:
      if (action.payload.text.trim() === "") return state;
      console.log("CREATE 호출됨", action);
      return {
        ...state,
        list: state.list.concat({
          id: action.payload.id,
          text: action.payload.text,
          done: false,
        }),
        nextID: action.payload.id + 1,
      };
    case DONE:
      console.log("DONE 호출됨", action);
      return {
        ...state,
        list: state.list.map((todo) => {
          console.log("in map", todo);
          // 바꾸고자 하는 조건건
          if (todo.id === action.id) {
            return {
              ...todo, // done을 제외한 text, id 값을 유지시키기 위한 전개연산
              done: true, // done 값 덮어쓰기
            };
          } else return todo;
        }),
      };
    // [{id:1},{id:2},{id:3}] >> [{id:1},{id:3}]
    case DELETE:
      return {
        ...state,
        list: state.list.filter((todo: Todo) => todo.id !== action.id),
      };

    case UPDATE:
      return {
        ...state,
        list: state.list.map((li: Todo) => {
          if (li.id === action.id) {
            return { ...li, text: action.text };
          }
          return li;
        }),
      };
    default:
      return state;
  }
}
