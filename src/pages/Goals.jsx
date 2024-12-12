import React from 'react';
import GoalTracker from '../components/GoalTracker';

function Goals() {
    return (
        <div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Your Goals</h2>
            <GoalTracker />
        </div>
    );
}

export default Goals;
