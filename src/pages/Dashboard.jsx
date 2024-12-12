// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { Box, Toolbar } from '@mui/material';
// import Sidebar from '../components/Sidebar';
// import TaskList from '../components/TaskList';
// import GoalTracker from '../components/GoalTracker';

// function Dashboard() {
//     const { currentUser, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         try {
//             await logout();
//             navigate('/login');
//         } catch (error) {
//             console.error("Error logging out:", error);
//         }
//     };

//     return (
//         <Box sx={{ display: 'flex' }}>
//             {/* Sidebar */}
//             <Sidebar />

//             {/* Main Content Area */}
//             <Box
//                 component="main"
//                 sx={{
//                     flexGrow: 1,
//                     p: 3,
//                     backgroundColor: '#f3f4f6', // Light background color
//                     minHeight: '100vh',
//                 }}
//             >
//                 <Toolbar />
//                 {/* Top Navbar */}
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         backgroundColor: '#fff',
//                         p: 2,
//                         mb: 2,
//                         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                     }}
//                 >
//                     <h1 style={{ margin: 0, fontWeight: 600 }}>Productivity Dashboard</h1>
//                     <div>
//                         <span style={{ marginRight: '16px' }}>Hello, {currentUser.email}</span>
//                         <button
//                             onClick={handleLogout}
//                             style={{
//                                 backgroundColor: '#f44336',
//                                 color: '#fff',
//                                 padding: '8px 16px',
//                                 border: 'none',
//                                 borderRadius: '4px',
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </Box>

//                 {/* Welcome Section */}
//                 <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
//                     Welcome to Your Dashboard!
//                 </h2>

//                 {/* Task List Section */}
//                 <TaskList />

//                 {/* Goal Tracker Section */}
//                 <GoalTracker />

//                 {/* Future sections like Analytics can be added here */}
//             </Box>
//         </Box>
//     );
// }

// export default Dashboard;

import React from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { currentUser } = useAuth();

    return (
        <div>
            <h1 style={{ fontWeight: 600, marginBottom: '16px' }}>
                Hello, {currentUser?.email}
            </h1>
            <p>
                Welcome to your Dashboard! Use the sidebar to navigate to your Tasks, Goals, Projects, and
                Analytics. Manage your workflow, stay organized, and track your productivity trends.
            </p>
            <p style={{ marginTop: '16px', fontStyle: 'italic', color: '#555' }}>
                Tip: Regularly review your tasks, set achievable goals, and explore analytics to continually improve your productivity.
            </p>
        </div>
    );
}

export default Dashboard;
