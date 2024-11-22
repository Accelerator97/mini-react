// import React from "react";
// import ReactDOM from "react-dom";
// import { ReactDOM, Component, useReducer, useState } from "../which-react";
import { ReactDOM, Component } from "../which-react";

import "./index.css";

function FunctionComponent(props) {
  // const [count, setCount] = useReducer((x) => x + 1, 0);
  // const [count2, setCount2] = useState(0);

  return (
    <div className="border">
      functionnal
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        我是文本
      </div>
    );
  }
}

// function FragmentComponent() {
//   return (
//     <ul>
//       <>
//         <li>part1</li>
//         <li>part2</li>
//       </>
//     </ul>
//   );
// }

const jsx = (
  <div className="border">
    <h1>react</h1>
    <a href="https://github.com/bubucuo/mini-react">mini react</a>
    <FunctionComponent></FunctionComponent>
    <ClassComponent></ClassComponent>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(jsx);

// 实现了常见组件初次渲染

// 原生标签
// 函数组件
// 类组件
// 文本
// Fragment
