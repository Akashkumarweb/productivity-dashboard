import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const tasksRef = collection(db, "users", "userId", "tasks"); // Replace "userId" with the actual user ID
        const q = query(tasksRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tasksData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTasks(tasksData);
        });

        return () => unsubscribe(); // Cleanup listener
    }, []);

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
