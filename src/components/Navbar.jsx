import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow">
            <h1 className="text-xl font-bold">
                <Link to="/">Productivity Dashboard</Link>
            </h1>
            <div>
                {currentUser ? (
                    <>
                        <span className="mr-4">Hello, {currentUser.email}</span>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="mr-4 text-blue-500 hover:underline">
                            Login
                        </Link>
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
