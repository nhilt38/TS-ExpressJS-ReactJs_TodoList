import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/tasks`)
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = () => {
    axios.post(`${API_BASE_URL}/task`, { title: newTask, completed: false })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask('');
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const handleDeleteTask = (id) => {
    axios.delete(`${API_BASE_URL}/task/${id}`)
      .then(response => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const handleChange = (id, title, completed) => {
    axios.put(`${API_BASE_URL}/task/${id}`, 
      { completed: completed, id: id, title: title})
      .then(response => {
        console.log(id, response)
        const updatedTasks = tasks.map(task => {
          if (task.id === id) {
            return {...task, ...response.data}
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error toggling task completion:', error));
  };

  return (
   <div className='wrapper'>
     <div className='todo-wrap'>
      <div className='todo-header'>
      <h1>Todo App</h1>
      <span>Get things done, one item at a time</span>
      </div>
      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className="todo-item">
            <p>{task.title}</p>
            <p className='todo-action'>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleChange(task.id, task.title, !task.completed)}
            />
              <span onClick={() => handleDeleteTask(task.id)} className='todo-trash'><i class="fa-solid fa-trash"></i></span>
            </p>
          </li>
        ))}
      </ul>
      <form className='todo-footer'>
        <p>Add to the to do list</p>
        <input type="text" onChange={(e) => setNewTask(e.target.value)}/>
        <button type="submit" onClick={handleAddTask}>Add Task</button>
      </form>
    </div>
   </div>
  );
}

export default App;
