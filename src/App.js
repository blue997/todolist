import React, { useCallback, useMemo, useReducer, useRef} from 'react'
import './main.scss'
import Header from './components/Header'
import TodoEditor from './components/TodoEditor'
import TodoList from './components/TodoList'

const mockTodo=[
  {id:0, isDone:false, context:'React 공부하기', createDate:new Date().getTime()},
  {id:1, isDone:false, context:'영화보기', createDate:new Date().getTime()},
  {id:2, isDone:false, context:'노래 연습하기', createDate:new Date().getTime()}
]

function reducer(state,action){
  switch(action.type){
    case 'ONCREATE': {
      return[action.newItem,...state];
    }
    case 'ONUPDATE':{
      return state.map(it=>
        it.id===action.targetId ? {...it,isDone:!it.isDone} : it
      )
    }
    case 'ONDELETE':{
      return state.filter(it=>it.id!==action.targetId)
    }
    default: return state;
  }
}

export const TodoStateContext=React.createContext(); //todo
export const TodoDispatchContext=React.createContext(); //나머지 함수들

function App() {
  // const [todo,setTodo]=useState(mockTodo);
  const [todo,dispatch]=useReducer(reducer,mockTodo);
  const idRef=useRef(3);
  const onCreate=(context)=>{
    /* const newItem={
      id:idRef.current, isDone:false, context, createDate:new Date().getTime()
    }
    setTodo([newItem,...todo]);
    idRef.current+=1; */
    dispatch({
      type:'ONCREATE',
      newItem:{
        id:idRef.current,
        isDone:false,
        context,
        createDate:new Date().getTime()
      }
    });
    idRef.current+=1;
  };
  const onUpdate=useCallback((targetId)=>{
    /* setTodo(
      todo.map(
        (it)=>it.id===targetId ? {...it, isDone:!it.isDone}:it
      )
    ) */
    dispatch ({
      type:'ONUPDATE',
      targetId
    })
  },[])
  const onDelete=useCallback((targetId)=>{
    /* setTodo(
      todo.filter(it=>it.id!==targetId)
    ) */
    dispatch ({
      type:'ONDELETE',
      targetId
    })
  },[]);
  const memoizedDispatch=useMemo(()=>{
    return {onCreate,onUpdate,onDelete}
  },[])

  return (
    <div className='App'>
      <Header/>
      <TodoStateContext.Provider value={{todo}}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <TodoEditor/>
          <TodoList/>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  )
}

export default App
