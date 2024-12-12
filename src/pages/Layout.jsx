import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from '../components/Sidebar';

function Layout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
                <Toolbar />
                {/* Outlet for nested routes (Dashboard, Tasks, Goals, etc.) */}
                <Outlet />
            </Box>
        </Box>
    );
}

import { Outlet } from 'react-router-dom'; // Make sure to import after adding Outlet

export default Layout;
