import React, { useEffect, useState } from 'react';
import { useAuth } from '../../authentication/AuthComponent'
import { NavLink } from 'react-router-dom';
import './reward_notification_styles.css';

const RewardNotification = ({ rewardId, rewardName, onClose }) => {
    const { accessToken } = useAuth();
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const checkReward = async () => {
            const response = await fetch(`/api/pet/check-reward/${rewardId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setShowNotification(!data.hasReward);
            } else {
                console.error(`Error status: ${response.status}`);
            }
        };
        checkReward();
    }, [accessToken, rewardId]);

    if (!showNotification) {
        return null;
    }

    return (
        <div className="reward-popup">
            <h2>Congratulations!</h2>
            <p>You have won a new reward: {rewardName}</p>
            <button className="close-button" onClick={onClose}>×</button>
            <NavLink to="/pet">
                <button className="back-to-pet-button">Back to Pet</button>
            </NavLink>
        </div>
    );
};

export default RewardNotification;