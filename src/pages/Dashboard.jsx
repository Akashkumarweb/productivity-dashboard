import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import GoalTracker from '../components/GoalTracker';

function Dashboard() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="flex items-center justify-between p-4 bg-white shadow">
                <h1 className="text-xl font-bold">Productivity Dashboard</h1>
                <div>
                    <span className="mr-4">Hello, {currentUser.email}</span>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <Navbar />
            <main className="p-8">
                <TaskList />
                <GoalTracker />
                <h2 className="text-2xl font-semibold">Welcome to Your Dashboard!</h2>
                {/* Future components like TaskList, GoalTracker, Analytics will go here */}
            </main>
        </div>
    );
}

export default Dashboard;
