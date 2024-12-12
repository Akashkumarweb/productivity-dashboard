import React, { useEffect, useState } from "react";
import {
    collection,
    onSnapshot,
    query,
    addDoc,
    serverTimestamp,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import {
    CircularProgress,
    Box,
    Modal,
    TextField,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function TaskList({ openAddModal, onCloseAddModal }) {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fields for adding or editing tasks
    const [editingTask, setEditingTask] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newDueDate, setNewDueDate] = useState(null);
    const [newPriority, setNewPriority] = useState('Medium');
    const [newCategory, setNewCategory] = useState('Work');

    useEffect(() => {
        if (!currentUser) {
            setLoading(false);
            setError("No user logged in.");
            return;
        }

        const userId = currentUser.uid;
        const tasksRef = collection(db, "users", userId, "tasks");
        const q = query(tasksRef);

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const tasksData = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data(),
                }));
                setTasks(tasksData);
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching tasks:", err);
                setError("Failed to load tasks.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [currentUser]);

    const handleAddOrEditTask = async () => {
        if (!currentUser) {
            setError("No user logged in.");
            return;
        }

        const userId = currentUser.uid;
        const tasksRef = collection(db, "users", userId, "tasks");

        try {
            if (editingTask) {
                // Update existing task
                const taskRef = doc(db, "users", userId, "tasks", editingTask.id);
                await updateDoc(taskRef, {
                    title: newTitle,
                    desc: newDesc,
                    dueDate: newDueDate ? newDueDate.valueOf() : null,
                    priority: newPriority,
                    category: newCategory,
                });
            } else {
                // Add new task
                await addDoc(tasksRef, {
                    title: newTitle,
                    desc: newDesc,
                    dueDate: newDueDate ? newDueDate.valueOf() : null,
                    priority: newPriority,
                    category: newCategory,
                    completed: false,
                    createdAt: serverTimestamp(),
                });
            }

            // Clear and close modal
            resetModalFields();
            onCloseAddModal();
        } catch (error) {
            console.error("Error adding/editing task:", error);
            setError("Failed to add/edit task. Please try again.");
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!currentUser) return;

        const userId = currentUser.uid;
        const taskRef = doc(db, "users", userId, "tasks", taskId);

        try {
            await deleteDoc(taskRef);
        } catch (error) {
            console.error("Error deleting task:", error);
            setError("Failed to delete task.");
        }
    };

    const handleToggleComplete = async (taskId, currentStatus) => {
        if (!currentUser) return;

        const userId = currentUser.uid;
        const taskRef = doc(db, "users", userId, "tasks", taskId);

        try {
            await updateDoc(taskRef, { completed: !currentStatus });
        } catch (error) {
            console.error("Error updating task:", error);
            setError("Failed to update task.");
        }
    };

    const resetModalFields = () => {
        setEditingTask(null);
        setNewTitle('');
        setNewDesc('');
        setNewDueDate(null);
        setNewPriority('Medium');
        setNewCategory('Work');
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setNewTitle(task.title);
        setNewDesc(task.desc);
        setNewDueDate(task.dueDate ? new Date(task.dueDate) : null);
        setNewPriority(task.priority);
        setNewCategory(task.category);
        onCloseAddModal(false); // To ensure add modal remains consistent
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                <span>Loading tasks...</span>
            </Box>
        );
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Complete</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={task.completed || false}
                                        onChange={() => handleToggleComplete(task.id, task.completed)}
                                    />
                                </TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.desc}</TableCell>
                                <TableCell>
                                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                                </TableCell>
                                <TableCell>{task.priority}</TableCell>
                                <TableCell>{task.category}</TableCell>
                                <TableCell>
                                    <Button onClick={() => openEditModal(task)}>Edit</Button>
                                    <Button color="error" onClick={() => handleDeleteTask(task.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={openAddModal || editingTask} onClose={resetModalFields}>
                <Box sx={{ padding: 4, width: 400, margin: 'auto' }}>
                    <h2>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
                    <TextField
                        label="Title"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Due Date"
                            value={newDueDate}
                            onChange={(date) => setNewDueDate(date)}
                            renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
                        />
                    </LocalizationProvider>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Category"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button onClick={resetModalFields}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddOrEditTask}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default TaskList;
