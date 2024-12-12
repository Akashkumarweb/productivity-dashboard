import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FlagIcon from '@mui/icons-material/Flag';
import InsightsIcon from '@mui/icons-material/Insights';
import FolderIcon from '@mui/icons-material/Folder';

const drawerWidth = 240;

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#1f2937',
                    color: '#fff',
                },
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Productivity App
                </Typography>
            </Toolbar>
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItemButton component={Link} to="/">
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/tasks">
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tasks" />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/goals">
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            <FlagIcon />
                        </ListItemIcon>
                        <ListItemText primary="Goals" />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/analytics">
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            <InsightsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Analytics" />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/projects">
                        <ListItemIcon sx={{ color: 'inherit' }}>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Projects" />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
