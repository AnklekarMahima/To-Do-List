import React,{Fragment,useEffect, useState} from "react";
import EditTodo from "./EditTodo";

const ListTodo=()=>{
    const [todos, settodos]=useState([]);

    const gettodos=async()=>{
        try {
            const response=await fetch("http://localhost:5000/todos");
            const jsonData= await response.json();
            settodos(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const deletetodo=async(id)=>{
        try {
            const deletetodo=await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE",
            });
            settodos(todos.filter(todo=> todo.todo_id!==id));
        } catch (err) {
            console.log(err.message);
        }
    };


    useEffect(()=>{
        gettodos();
    },[]);

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {todos.map(todo=>{
                        return (
                        <tr key={todo.todo_id}>
                            <th>{todo.description}</th>
                            <th><EditTodo todo={todo} setTodos={settodos}/></th>
                            <th><button className="btn btn-danger" onClick={()=>deletetodo(todo.todo_id)}>Delete</button></th>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodo;