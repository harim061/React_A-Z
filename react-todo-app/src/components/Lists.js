import React,{index} from 'react'
import {DragDropContext,Droppable,Draggable} from "react-beautiful-dnd";
import List from './List';

const Lists=React.memo( ({todoData,setTodoData,handleClick,})=> {
    
    // props.todoData

    const handleEnd =(result)=>{
        console.log(result);

        if(!result.destination) return;

        const newTodoData  = todoData;

        const [reorderedItem] = newTodoData.splice(result.source.index,1);

        newTodoData.splice(result.destination.index,0,reorderedItem);
        setTodoData(newTodoData);
    }



    return (
    <div>
        <DragDropContext onDragEnd={handleEnd}>

            <Droppable droppableId='to-dos'>
                {(provided)=>(
                <div {...provided.droppableProps} ref={provided.innerRef}>
                
                {todoData.map((data,index)=>(
                    <Draggable
                    key={data.id}
                    draggableId={data.id.toString()}
                    index={index}>
                        {(provided,snapshot)=>(
                            <List
                            key={data.id}
                            id={data.id}
                            title={data.title}
                            completed={data.completed}
                            todoData={todoData}
                            setTodoData={setTodoData}
                            provided={provided}
                            snapshot={snapshot}
                            handleClick={handleClick}/>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}</div>
                )}
            </Droppable>
        </DragDropContext>
    </div>
    );
})

export default Lists;