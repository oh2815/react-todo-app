const arr = [
  { id: 1, text: "todo1", done: true },
  { id: 2, text: "todo22", done: true },
];

for (let el of arr) {
  console.log(el);
}

// console.log("el?/", el); //  el 은  for 문 밖에서 사용할 수 없음.
arr.forEach((a, i) => {
  console.log(a.text);
  console.log(i);
});

const arr2 = ["a", "b", "c", "d"];

// for (let el of arr2) {
//   console.log(el);
// }

const arr2Change = arr2.map((el) => {
  console.log("el?", el);
  return el + "오태원";
}); // map의 반환값은 배열

console.log(arr2Change);
const newArr = arr.map((el) => {
  return <div>{el.id}</div>;
});

console.log(newArr);
// newArr =[<div>1</div>]
