import { Button, Form, Input, Row, Col } from "antd";
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { addTodo, deleteTodo, editTodo, saveTodo} from "store/todos/actions";
import { Todo } from "store/todos/actionTypes";
import {ChangeEvent, useRef, useState } from "react";

interface Props {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    deleteTodo: (id: number) => void;
    editTodo: (id: number) => void;
    saveTodo:(id:number, newText:string) => void
}

const mapStateToProps = (state:{todos: Todo[]}) => ({
    todos: state.todos,
});
  
const mapDispatchToProps = {
    addTodo,
    editTodo,
    saveTodo,
    deleteTodo,
};

const MyTodo: React.FC<Props> = ({todos, addTodo, editTodo, saveTodo, deleteTodo}) => {

    const [input, setInput] = useState('');
    const [editedText, setEditedText] = useState("");

    let idRef = useRef(3);

    const handleSubmit = ()=>{
        //if input is empty do not proceed
        if(input===""){
            return;
        }

        addTodo({id:idRef.current++, text:input, status:"view"});
        setInput('')//should clear input onSubmit.
    }
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditedText(event.target.value);
    };

    const startEdit = (id:number)=>{
        editTodo(id);
    }

    const onSaveEdit=(id:number)=>{
        saveTodo(id,editedText)
        setEditedText("");
    }

    const handleDel = (id: number) =>{
        deleteTodo(id)
    }
    
    return<div>
        <h1 className="text-6xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white py-20">To-Do App</h1>
        
        <div className = "flex justify-center">
            <Form 
                className = "transform translate-y-3" 
                
                name= "basic" 
                data-testid = "input-form"
                >
                <Form.Item name = "add-form">
                    <Input value={input} placeholder="enter a Todo" onChange={(e)=>setInput(e.target.value)} />
                </Form.Item>
            </Form>

            <Button className="m-4" type="primary" onClick={() => handleSubmit()} data-testid="add-btn">Add</Button>
        </div>

        <div className="text-1xl flex justify-center">  
            <ul>
                {todos.map((todo)=> (
                    <li key = {todo.id}>
                        <Row>
                            {todo.status === "edit" ? (
                                <Col span={6}>
                                    <Input defaultValue={todo.text} data-testid="todo-edit-input" onChange={handleInputChange}/>
                                </Col>
                                ): (
                                <Col span={8}>
                                    <p className="text-sm" data-testid="todo-text">{todo.text}</p> 
                                </Col>
                                )
                            } 

                            {todo.status==="edit"?(
                                <Col span={6}>
                                    <Button type="primary" data-testid="edit-btn"onClick={()=>startEdit(todo.id)}>Edit</Button>
                                </Col>
                            ):(
                                <Col span={8}>
                                    <Button type="primary" onClick={()=>startEdit(todo.id)} data-testid="edit-btn">Edit</Button>
                                </Col> 
                            )}

                            {todo.status==="edit"?(
                                <Col span={6}>
                                    <Button type="primary" onClick={()=>onSaveEdit(todo.id)} data-testid="save-btn">Save</Button>
                                </Col>
                                
                            ): (null)}
                            
                            {todo.status==="edit"?(
                                <Col span = {6}>
                                    <Button type="primary" onClick={()=>handleDel(todo.id)}>Del</Button>
                                </Col>
                            ):(
                                <Col span = {8}>
                                    <Button type="primary" onClick={()=>handleDel(todo.id)} data-testid="del-btn">Del</Button>
                                </Col>
                            )}
                        </Row>
                        
                    </li>
                ))}
            </ul>
        </div>
    </div> 
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTodo);

