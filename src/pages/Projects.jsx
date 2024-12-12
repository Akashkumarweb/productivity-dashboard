import React, { useState } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Button,
    Modal,
    TextField,
    Card,
    CardContent,
    Grid,
    Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
            style={{ height: '100%', width: '100%' }}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function Projects() {
    const [tabValue, setTabValue] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');

    // Example static data with string IDs
    const [nextTasks, setNextTasks] = useState([
        { id: '1', title: 'Research Project Requirements', desc: 'Gather user stories.' },
        { id: '2', title: 'Design UI Wireframes', desc: 'Create wireframes for main pages.' },
    ]);

    const [inProgressTasks, setInProgressTasks] = useState([
        { id: '3', title: 'Setup Firebase', desc: 'Initialize Firebase project and config.' },
    ]);

    const [doneTasks, setDoneTasks] = useState([
        { id: '4', title: 'Create Project Repo', desc: 'Repository created on GitHub.' },
    ]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewTaskTitle('');
        setNewTaskDesc('');
    };

    const handleAddTask = () => {
        const newId = Date.now().toString(); // Use string ID
        const newTask = { id: newId, title: newTaskTitle, desc: newTaskDesc };
        setNextTasks((prev) => [...prev, newTask]);
        handleCloseModal();
    };

    // Helper function to reorder or move tasks
    const moveTask = (sourceArr, destArr, sourceIndex, destIndex) => {
        const [moved] = sourceArr.splice(sourceIndex, 1);
        destArr.splice(destIndex, 0, moved);
    };

    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        let sourceArr, destArr, setSource, setDest;
        if (source.droppableId === 'next') {
            sourceArr = [...nextTasks];
            setSource = setNextTasks;
        } else if (source.droppableId === 'inProgress') {
            sourceArr = [...inProgressTasks];
            setSource = setInProgressTasks;
        } else {
            sourceArr = [...doneTasks];
            setSource = setDoneTasks;
        }

        if (destination.droppableId === 'next') {
            destArr = [...nextTasks];
            setDest = setNextTasks;
        } else if (destination.droppableId === 'inProgress') {
            destArr = [...inProgressTasks];
            setDest = setInProgressTasks;
        } else {
            destArr = [...doneTasks];
            setDest = setDoneTasks;
        }

        // If same column
        if (source.droppableId === destination.droppableId) {
            const [moved] = sourceArr.splice(source.index, 1);
            sourceArr.splice(destination.index, 0, moved);
            setSource(sourceArr);
        } else {
            // Moving to different column
            moveTask(sourceArr, destArr, source.index, destination.index);
            setSource(sourceArr);
            setDest(destArr);
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        width: 400,
    };

    const renderTasks = (tasks) => {
        return tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                    <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{ mb: 2, backgroundColor: snapshot.isDragging ? '#e0f7fa' : '#fff' }}
                    >
                        <CardContent>
                            <Typography variant="body1" fontWeight="600">{task.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{task.desc}</Typography>
                        </CardContent>
                    </Card>
                )}
            </Draggable>
        ));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                Projects
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Overview" />
                    <Tab label="Tasks" />
                </Tabs>
            </Box>

            {/* Overview Tab */}
            <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>Project Overview</Typography>
                <Typography sx={{ mb: 2 }}>
                    High-level project info, timelines, milestones, and more. Customize this section with your project's details.
                </Typography>
            </TabPanel>

            {/* Tasks Tab with Drag and Drop */}
            <TabPanel value={tabValue} index={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>Project Tasks (Kanban Board)</Typography>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenModal}>
                        Add Card
                    </Button>
                </Box>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Grid container spacing={2}>
                        {/* Next Column */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Next</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Droppable droppableId="next">
                                {(provided) => (
                                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                                        {renderTasks(nextTasks)}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </Grid>

                        {/* In Progress Column */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>In Progress</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Droppable droppableId="inProgress">
                                {(provided) => (
                                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                                        {renderTasks(inProgressTasks)}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </Grid>

                        {/* Done Column */}
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Done</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Droppable droppableId="done">
                                {(provided) => (
                                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                                        {renderTasks(doneTasks)}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </Grid>
                    </Grid>
                </DragDropContext>
            </TabPanel>

            {/* Add Card Modal */}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box sx={style}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Add a New Task</Typography>
                    <TextField
                        label="Task Title"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                        value={newTaskDesc}
                        onChange={(e) => setNewTaskDesc(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button variant="text" onClick={handleCloseModal}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddTask}>Save</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
