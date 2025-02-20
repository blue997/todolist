import React, { useContext, useRef, useState } from 'react'
import {TodoDispatchContext} from '../App'

const TodoEditor = () => {
  const {onCreate}=useContext(TodoDispatchContext);
  const [context,setContext]=useState('');

  const inputRef=useRef();
  const onChangeContext=(event)=>{
    setContext(event.target.value);
  };
  const onSubmit=()=>{
    if(!context){
      inputRef.current.focus();
      return; //값을 반환하고 즉시 종료
    }
    onCreate(context)
    setContext('')
  };
  const onKeyDown=(event)=>{
    if(event.key==='Enter'){
      onSubmit();
    }
  }
  return (
    <div className='TodoEditor'>
      <h4>새로운 Todo 작성하기 📝</h4>
      <div className='editor_wrapper'>
        <input ref={inputRef /* 선택자 역할 */} value={context} onChange={onChangeContext} onKeyDown={onKeyDown} placeholder='새로운 Todo...'/>
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  )
}

export default TodoEditor
