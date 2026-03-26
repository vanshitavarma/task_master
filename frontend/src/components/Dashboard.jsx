import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            fetchTasks();
        }
    }, [navigate]);

    const getAuthHeaders = () => {
        return {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
    };

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/tasks`, getAuthHeaders());
            setTasks(data);
        } catch (err) {
            setError('Failed to load tasks');
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await axios.post(
                `${API_URL}/api/tasks`,
                { title, description },
                getAuthHeaders()
            );
            setSuccess('Task created successfully');
            setTitle('');
            setDescription('');
            fetchTasks();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create task');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await axios.delete(`${API_URL}/api/tasks/${id}`, getAuthHeaders());
            setSuccess('Task deleted!');
            fetchTasks();
        } catch (err) {
            setError('Error deleting task');
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.put(
                `${API_URL}/api/tasks/${id}`,
                { status },
                getAuthHeaders()
            );
            fetchTasks();
        } catch (err) {
            setError('Failed to update status');
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="nav-brand">TaskMaster</div>
                <div className="nav-links">
                    <span className="nav-link">Welcome, {userInfo?.name} ({userInfo?.role})</span>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => {
                            localStorage.removeItem('userInfo');
                            navigate('/login');
                        }}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container animate-fade-in">
                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="dashboard-card">
                    <h2 style={{ marginBottom: '1.5rem' }}>Create New Task</h2>
                    <form onSubmit={handleCreateTask} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1', minWidth: '250px' }}>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Task Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ flex: '2', minWidth: '300px' }}>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Task Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
                            Add Task
                        </button>
                    </form>
                </div>

                <h2 style={{ marginTop: '2.5rem' }}>Your Tasks {userInfo?.role === 'admin' && '(Admin View)'}</h2>
                <div className="task-grid">
                    {tasks.map((task) => (
                        <div className="task-card" key={task._id}>
                            <div className="task-header">
                                <h3 className="task-title">{task.title}</h3>
                                <span className={`badge badge-${task.status}`}>{task.status}</span>
                            </div>
                            <p className="task-desc">{task.description}</p>
                            
                            {userInfo?.role === 'admin' && task.user && (
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                    Created by: {task.user.email}
                                </div>
                            )}

                            <div className="task-actions">
                                <select 
                                    className="form-input" 
                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', width: 'auto' }}
                                    value={task.status}
                                    onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(task._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {tasks.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                            No tasks found. Create one above!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
