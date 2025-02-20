import React, { useContext } from 'react'
import { TodoDispatchContext } from '../App'

const TodoItem = ({id,isDone,context,createDate}) => {
  const {onDelete,onUpdate}=useContext(TodoDispatchContext);
  const onChangeCheckBox=()=>{
    onUpdate(id)
  }
  return (
    <div className={`TodoItem ${isDone ? 'active':''}`}>
      <div className='checkbox_col'>
        <input onChange={onChangeCheckBox} checked={isDone} type='checkbox'></input>
      </div>
      <div className='title_col'>{context}</div>
      <div className='date_col'>
        {new Date(createDate).toLocaleDateString()}
      </div>
      <div className='btn_col'>
        <button onClick={()=>onDelete(id)}>삭제</button>
      </div>
    </div>
  )
}

export default TodoItem;
