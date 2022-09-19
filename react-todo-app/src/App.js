import React, { useCallback } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";
import { useState } from "react";

export default function App(){

  const  [value,setValue] = useState("");
  const  [todoData,setTodoData] = useState([]);
  

  const handleClick = useCallback((id) =>{
    let newTodoData = todoData.filter((data) => data.id !==id);
    
    setTodoData(newTodoData);
    
    },
    [todoData]
    );

  const handleSubmit = (e) =>{

    //form 안에 input을 전송할 때 페이지 리로드를 막아줌
    e.preventDefault();
    
    //새로운 할 일 데이터

    let newTodo ={
      id : Date.now(),
      title : value,
      completed:false,
    }

    //원래 있던 할 일에 새로운 할 일 더해주기
    //입력란에 있던 글씨 지워지기

    setTodoData( prev =>[
      ...prev, newTodo
    ]);
    setValue("");

  }

  const handleRemoveClick=() =>{
    setTodoData([]);
  }

    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
        <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
          <div className="flex justify-between mb-3"> 
            <h1>할 일 목록</h1>
            <button onClick={handleRemoveClick}>Delet All</button>
          </div>

          <Form value={value} setValue={setValue} handleSubmit={handleSubmit}></Form>
          <Lists handleClick={handleClick} todoData={todoData} setTodoData={setTodoData}></Lists>
          
        </div>
      </div>
    )
  }
