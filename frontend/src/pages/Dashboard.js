import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import TaskForm from '../components/TaskForm';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/tasks');
        setTasks(data);
      } catch (error) {
        toast.error('Error loading tasks!');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success('Task deleted!');
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  return (
    <div>
      <ToastContainer />
      <TaskForm setTasks={setTasks} />
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <div>
          {tasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            <ul>
              {tasks.map(task => (
                <li key={task._id} className="task-card mb-3">
                  <h5>{task.title}</h5>
                  <p>{task.description}</p>
                  <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                  <button onClick={() => handleDeleteTask(task._id)} className="btn btn-danger">Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
