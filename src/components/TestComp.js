import React, { useReducer } from 'react'
const reducer=(state,action)=>{
  switch(action.type){
    case 'INCREASE':return state + action.data;
    case 'DECREASE':return state - action.data;
    default:return state;
  }
}

function TestComp() {
  // const [count,setCount]=useState(0);
  const [count,dispatch]=useReducer(reducer,0); // 상태변화를 일으키는 함수, 생성자함수
  // const onIncrease=()=>{
  //   setCount(count+1)
  // }
  // const onDecrease=()=>{
  //   setCount(count-1)
  // }

  return (
    <div className='TestComp'>
      <h2>테스트 컴포넌트</h2>
      <div>
        <h4>{count}</h4>
      </div>
      <div>
        <button onClick={()=>dispatch({type:'INCREASE',data:1})}>+1</button>
        <button onClick={()=>dispatch({type:'DECREASE',data:1})}>-1</button>
      </div>
    </div>
  )
}

export default TestComp
