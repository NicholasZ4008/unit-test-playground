import {
  Todo, 
  ADD_TODO, 
  EDIT_TODO, 
  DEL_TODO, 
  SAVE_TODO,
  TodoActionTypes} 
from './actionTypes'

const initialState: Todo[] = [
  {id:1, text:"hi", status:"view"},
  {id:2, text:"Mark", status:"view"},
]

export default function todosReducer(state = initialState, action:TodoActionTypes){
  
  switch(action.type){
    case ADD_TODO:
      return [ ...state, action.payload]
    
    case EDIT_TODO:
      return state.map((todo) => {
        return (todo.id === action.payload.id) ? {...todo, status:"edit"} : todo
    })

    case SAVE_TODO:
      return state.map((todo) => {
        return (todo.id === action.payload.id) ? {...todo, text:action.payload.newText, status:"view"} : todo
      })

    case DEL_TODO:
      return state.filter((todo)=>{
        return todo.id !== action.payload
      })
    default:
      return state
  }
}