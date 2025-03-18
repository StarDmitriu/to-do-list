import { useRef, useEffect, useState } from 'react';
import Task from './components/Task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTasks] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    let savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
      setTasks(JSON.parse(savedTasks))
      console.log(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    if(tasks.length > 0){
      localStorage.setItem('tasks', JSON.stringify(tasks))
      console.log('str' + JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = () => {
    if(newTask.trim() === "") return;
    const newTaskObj = {id: Date.now(), text: newTask}
    setTasks((prevTasks) => [...prevTasks, newTaskObj])
    setNewTasks('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

  }

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const handleInput = () => {
    if (textareaRef.current) {
			textareaRef.current.style.height = 'auto' 
		  textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}

  return (
		<div className='App'>
			<div className='container'>
				<textarea
					type='text'
					value={newTask}
					onChange={e => setNewTasks(e.target.value)}
					className='input'
					onInput={handleInput}
					ref={textareaRef}
				/>
				<button className='addButton' onClick={addTask}>
					Добавить задачу
				</button>
			</div>
			<ul className='task-cont'>
				{tasks.map(task => (
					<Task key={task.id} task={task} deleteTask={deleteTask}/>
				))}
			</ul>
		</div>
	)
}

export default App;