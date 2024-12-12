import React, { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

function GoalTracker() {
    const { currentUser } = useAuth();
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            setLoading(false);
            setError("No user logged in.");
            return;
        }

        const userId = currentUser.uid;
        const goalsRef = collection(db, "users", userId, "goals");

        const unsubscribe = onSnapshot(
            goalsRef,
            (snapshot) => {
                const goalsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setGoals(goalsData);
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching goals:", err);
                setError("Failed to load goals.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [currentUser]);

    const addGoal = async () => {
        if (!currentUser) {
            setError("No user logged in.");
            return;
        }

        const userId = currentUser.uid;
        const goalsRef = collection(db, "users", userId, "goals");

        try {
            await addDoc(goalsRef, {
                title: newGoal,
                completed: false,
                createdAt: serverTimestamp(),
            });
            setNewGoal(""); // Clear the input field
        } catch (error) {
            console.error("Error adding goal:", error);
            setError("Failed to add goal. Please try again.");
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                <span>Loading goals...</span>
            </Box>
        );
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Goals</h2>
            {goals.length === 0 ? (
                <p>No goals found. Add one below!</p>
            ) : (
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '16px' }}>
                    {goals.map((goal) => (
                        <li key={goal.id} style={{ marginBottom: '4px' }}>
                            {goal.title} - {goal.completed ? "Completed" : "In Progress"}
                        </li>
                    ))}
                </ul>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                    label="New Goal"
                    variant="outlined"
                    size="small"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    sx={{ width: '300px' }}
                />
                <Button variant="contained" color="primary" onClick={addGoal}>
                    Add Goal
                </Button>
            </Box>
        </div>
    );
}

export default GoalTracker;
