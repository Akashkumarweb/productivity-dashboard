import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Tasks() {
    const [openAddModal, setOpenAddModal] = useState(false);

    const handleOpenModal = () => setOpenAddModal(true);
    const handleCloseModal = () => setOpenAddModal(false);

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>Your Tasks</h2>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenModal}>
                    Add Task
                </Button>
            </Box>
            <TaskList openAddModal={openAddModal} onCloseAddModal={handleCloseModal} />
        </div>
    );
}

export default Tasks;
