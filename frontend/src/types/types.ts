export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface TodoState {
  list: Todo[];
  nextID?: number;
}
// {
//     id: 0,
//     text: "리액트 공부하기",
//     done: false, // done: false 는 할 일 목록
//   },
//   {
//     id: 1,
//     text: "척추의 요정이 말합니다! 척추 펴기!",
//     done: true, // done: true 는 완료 목록
//   },
//   {
//     id: 2,
//     text: "운동하기",
//     done: false,
//   },

export interface ReduxState {
  todo: TodoState;
}
