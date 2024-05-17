import React, { useEffect, useState } from 'react';
import { useAuth } from '../authentication/AuthComponent';

const RewardManager = ({ onClose }) => {
    const { accessToken } = useAuth();
    const [rewards, setRewards] = useState([]);
    const [activeOutfit, setActiveOutfit] = useState(null);
    const [activeCosmetics, setActiveCosmetics] = useState([]);

    useEffect(() => {
        const fetchRewards = async () => {
            const response = await fetch('/api/pet/rewards', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setRewards(data.rewards);
                setActiveOutfit(data.activeOutfit);
                setActiveCosmetics(data.rewards.filter(reward => reward.isActive && reward.rewardType === 'cosmetic').map(reward => reward.rewardID));
            } else {
                console.error(`Error status: ${response.status}`);
            }
        };
        fetchRewards();
    }, [accessToken]);

    const handleOutfitChange = async (rewardId) => {
        const response = await fetch('/api/pet/equip-outfit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ rewardId }),
        });
        if (response.ok) {
            setActiveOutfit(rewardId);
        } else {
            console.error(`Error status: ${response.status}`);
        }
    };

    const handleCosmeticToggle = async (rewardId, isActive) => {
        const response = await fetch('/api/pet/toggle-cosmetic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ rewardId, isActive }),
        });
        if (response.ok) {
            setActiveCosmetics((prev) =>
                isActive
                    ? [...prev, rewardId]
                    : prev.filter((id) => id !== rewardId)
            );
        } else {
            console.error(`Error status: ${response.status}`);
        }
    };

    return (
        <div className="reward-manager">
            <h2>Style Your Pet</h2>
            <button onClick={onClose}>Close</button>
            <h3>Outfits</h3>
            <div className="outfits">
                {rewards
                    .filter((reward) => reward.rewardType === 'outfit')
                    .map((reward) => (
                        <div key={reward.rewardID}>
                            <img
                                src={`/assets/${reward.rewardName}.png`}
                                alt={reward.rewardName}
                                onClick={() => handleOutfitChange(reward.rewardID)}
                                className={
                                    activeOutfit === reward.rewardID ? 'active' : ''
                                }
                            />
                        </div>
                    ))}
            </div>
            <h3>Cosmetic Items</h3>
            <div className="cosmetics">
                {rewards
                    .filter((reward) => reward.rewardType === 'cosmetic')
                    .map((reward) => (
                        <div key={reward.rewardID}>
                            <img
                                src={`/assets/${reward.rewardName}.png`}
                                alt={reward.rewardName}
                                onClick={() =>
                                    handleCosmeticToggle(
                                        reward.rewardID,
                                        !activeCosmetics.includes(reward.rewardID)
                                    )
                                }
                                className={
                                    activeCosmetics.includes(reward.rewardID)
                                        ? 'active'
                                        : ''
                                }
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RewardManager;
