import React, { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function GoalTracker() {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState("");

    useEffect(() => {
        // Reference the 'goals' collection under the user's document
        const goalsRef = collection(db, "users", "userId", "goals"); // Replace "userId" with the actual user ID

        const unsubscribe = onSnapshot(goalsRef, (snapshot) => {
            const goalsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setGoals(goalsData);
        });

        return () => unsubscribe(); // Cleanup listener
    }, []);

    const addGoal = async () => {
        const goalsRef = collection(db, "users", "userId", "goals"); // Replace "userId" with the actual user ID
        try {
            await addDoc(goalsRef, {
                title: newGoal,
                completed: false,
                createdAt: new Date(),
            });
            setNewGoal(""); // Clear the input field
        } catch (error) {
            console.error("Error adding goal:", error);
        }
    };

    return (
        <div>
            <h2>Goals</h2>
            <ul>
                {goals.map((goal) => (
                    <li key={goal.id}>
                        {goal.title} - {goal.completed ? "Completed" : "In Progress"}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add a new goal"
            />
            <button onClick={addGoal}>Add Goal</button>
        </div>
    );
}

export default GoalTracker;
