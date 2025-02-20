import React, { useContext, useMemo, useState } from 'react'
import {TodoStateContext} from '../App'
import TodoItem from './TodoItem'

const TodoList = () => {
  const {todo}=useContext(TodoStateContext);
  const [search,setSearch]=useState('');
  const onChangeSearch=(event)=>{
    setSearch(event.target.value);
  };
  const getSearchResult=()=>{
    return search==='' ? todo : todo.filter(it=>it.context.toLowerCase().includes(search.toLowerCase()))
  };
  // 함수 최적화
  const analyzeTodo=useMemo(()=>{ // useEffect와 비슷함
    console.log('analyzeTodo 함수 호출')
    const totalCount=todo.length;
    const doneCount=todo.filter(it=>it.isDone).length;
    const notDoneCount=totalCount-doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount
    }
  },[todo]);
  const {totalCount, doneCount, notDoneCount}=analyzeTodo;

  return (
    <div className='TodoList'>
      <h4>Todo List 🪐</h4>
      <div className='analyzeTodo'>
        <h4>총개수: {totalCount}</h4>
        <h4>완료된 할 일: {doneCount}</h4>
        <h4>완료하지 않은 할 일: {notDoneCount}</h4>
      </div>
      <input value={search} onChange={onChangeSearch} className='searchbar' placeholder='검색어를 입력하세요.'/>
      <div className='list_wrapper'>
        {
          getSearchResult().map(it=>{
            return <TodoItem {...it} key={it.id}/>
          })
        }
      </div>
    </div>
  )
}


export default TodoList
