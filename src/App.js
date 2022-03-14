import React from 'react';
import './App.css';

import Todo from './components/todo/todo';

function App() {
  
  const [todos, setTodos] = React.useState(JSON.parse(window.localStorage.getItem('todos')) || []);
 
  const [type,setType] = React.useState(window.localStorage.getItem('type') || 'all');
  
  const handleDelete = (evt) =>{
    const todoId = evt.target.dataset.todoId - 0;
    
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
    
    window.localStorage.setItem('todos', JSON.stringify(filteredTodos));
    
    setTodos(filteredTodos);
    
  };
  
  const handleCheck = (evt) =>{
    const todoId = evt.target.dataset.todoId - 0;
    
    const foundTodo = todos.find((todo) => todo.id === todoId);

    foundTodo.isCompleted = !foundTodo.isCompleted;
    
    window.localStorage.setItem('todos', JSON.stringify([...todos]));
    
    setTodos([...todos]);
    
  };
  
 const getTodosByType = (_type, _todos) => {
  
  if (_type === 'all') {
   return _todos;
  }

  if(_type === 'completed'){
    return _todos.filter((t) => t.isCompleted);
  }

  if(_type === 'uncompleted'){
    return _todos.filter((t) => !t.isCompleted);
  }

  else {
    return[];
  }

 };

 const setTypeLocale = (_type) =>{
   
  window.localStorage.setItem('type', _type);
  setType(_type);
};

  return (
    <main className='main'>
    <input className='input'  type='text'
     onKeyUp={(evt)=> {
      if(!evt.target.value) return
      if(evt.code === 'Enter'){
        
        const newTodo ={
          id: todos[todos.length - 1]?.id + 1 || 0,
          title: evt.target.value.trim(),
          isCompleted: false,
        };
        
        window.localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
        
        setTodos([...todos, newTodo]);
        
        evt.target.value = null;
        
      }
    }}  
    />
    
    <ul className='todos'>
    {
      todos.length > 0 &&
      getTodosByType(type, todos).map((todo) =>( 
        
        <Todo  key={todo.id} todo={todo} handleDelete={handleDelete} handleCheck ={handleCheck}>
        {todo.title}
        
        </Todo>))}
        </ul>
        
        <button className='btn' onClick={() => setTypeLocale('all')}>all</button>

        <button className='btn' onClick={() => setTypeLocale('completed')}>completed</button>
        
        <button className='btn'  onClick={() => setTypeLocale('uncompleted')}>uncompleted</button>

        </main>
        
        );
        
      }
      
      export default App;
      