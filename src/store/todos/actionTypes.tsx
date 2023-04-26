export interface Todo{
    id: number,
    text: string,
    status: "view" | "edit"
}

export const ADD_TODO = "ADD_TODO"
export const EDIT_TODO = "EDIT_TODO"
export const DEL_TODO = "DEL_TODO"
export const SAVE_TODO = "SAVE_TODO"

interface AddTodoAction{
    type: typeof ADD_TODO,
    payload: Todo
}

interface EditTodoAction{
    type: typeof EDIT_TODO,
    payload:{
        id:number
    };
}

interface SaveTodoAction{
    type: typeof SAVE_TODO,
    payload:{
        id:number,
        newText: string
    }
}

interface DelTodoAction{
    type: typeof DEL_TODO,
    payload: number;
}

export type TodoActionTypes = AddTodoAction | EditTodoAction | DelTodoAction | SaveTodoAction;