import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './context todo/index'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
  
  // Function to add todo
  function addTodo(todo){
    // setTodos(todo)      // these will erase the previous all todo 
    
    setTodos((prev) => [{id : Date.now() , ...todo} , ...prev])   // In these we added new todo and spread the previous todo

   
  } 

  // function to update todo. first we need to get the todo id and then update msg or name

  function updateTodo(id , todo){
    setTodos((prev)=>prev.map((prevtodo)=>{
      if(prevtodo.id === id){
        return todo
      }
      else{
        return prevtodo
      }
    }))
  }

  // TO delete the todo . 
  //here we perform which is not matching return only that

  function deleteTodo(id){

    setTodos((prev)=> prev.filter((prevtodo)=>{
      if(prevtodo.id !== id){
        return prevtodo ;
      }
    }))
  }

  // function to toogle (mean if checked then nochecked and vice versa)
  function toggleComplete (id){
      /*
      understanble
      setTodos((prev)=>prev.map((prevtodo)=>{
         if(prevtodo.id == id){
          prevtodo.completed = !(prevtodo.completed)
    
         }
      })) */
      setTodos((prev)=>prev.map((prevtodo)=> prevtodo.id == id ?{...prevtodo , completed : !(prevtodo.completed)} : prevtodo))
  }


  // we want to store the value local storage.

  // we want when the item getting from local storage when we start it

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0){
      setTodos(todos);
    }
  } ,[])          // it will run one time

  // we want when we create new todo it save to local stroge 

  useEffect(()=>{
      localStorage.setItem("todos" , JSON.stringify(todos)) ;
  } ,[todos])



  return (
   <TodoProvider value = {{todos , addTodo , updateTodo , deleteTodo , toggleComplete }}>
   <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key = {todo.id} className='w-full'>
                           
                        <TodoItem todo = {todo}/>
                          </div>
                        ))}
                        
                    </div>
                </div>
            </div>
   </TodoProvider>
  )
}

export default App
