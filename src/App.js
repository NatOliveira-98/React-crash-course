import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// with class
// import React from 'react';
//

import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  // get data from server
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const endpoint = `http://localhost:5000/tasks`;

  const fetchTasks = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();

    return data;
  };

  const fetchSingleTask = async id => {
    const response = await fetch(`${endpoint}/${id}`);
    const data = await response.json();

    return data;
  };

  const addTask = async task => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    // data is a new task
    const data = await response.json();

    setTasks([...tasks, data]);

    // json-server creates an id
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };

    // setTasks([...tasks, newTask]);
  };

  const deleteTask = async id => {
    await fetch(`${endpoint}/${id}`, {
      method: 'DELETE',
    });

    // returns a new array of all tasks that dont match the on clicked
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleReminder = async id => {
    const taskToToggle = await fetchSingleTask(id);
    const updateTaskReminder = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder,
    };

    const response = await fetch(`${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateTaskReminder),
    });
    const data = await response.json();

    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: data.reminder } : task,
      ),
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path="/"
          exact
          render={props => (
            <>
              {/* && is a shorter ternary operator, only with true*/}
              {showAddTask && <AddTask onAdd={addTask} />}

              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No tasks to show'
              )}
            </>
          )}
        />

        <Route path="/about" component={About} />

        <Footer />
      </div>
    </Router>
  );
}

// class App extends React.Component {
//   render() {
//     return <h1>Hello there, I'm from a class</h1>;
//   }
// }

export default App;
