import {
  Todo, 
  ADD_TODO, 
  EDIT_TODO, 
  DEL_TODO, 
  TodoActionTypes,
  SAVE_TODO} 
from './actionTypes'


export function addTodo(todo:Todo): TodoActionTypes{
  return{
    type:ADD_TODO,
    payload:todo
  }
}

export function editTodo(id:number): TodoActionTypes{
  return{
    type:EDIT_TODO,
    payload:{
      id
    }
  }
}

export function saveTodo(id:number, newText:string): TodoActionTypes{
  return{
    type:SAVE_TODO,
    payload:{
      id,
      newText
    } 
  }
}

export function deleteTodo(id:number): TodoActionTypes{
  return{
    type:DEL_TODO,
    payload:id
  }
}
