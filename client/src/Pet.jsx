import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthComponent';
import './pet_styles.css';

const Pet = () => {
    const { accessToken } = useAuth();  // Get the access token from the AuthProvider to make authenticated requests
    const [position, setPosition] = useState({
        left: 80,
        top: 50,
        scale: 0.75,
        flip: 1,
    }); // Start position of the pet

    // Used to turn on and off walking animation
    const [isWalking, setIsWalking] = useState(true);

    const points = [
        { left: 40, top: 0, scale: 0.4 },
        { left: 80, top: 40, scale: 0.6 },
        { left: 0, top: 30, scale: 0.5 },
    ];

    const pickRandomPoint = () => {
        const randomIndex = Math.floor(Math.random() * points.length);
        return points[randomIndex];
    };

    const [targetPosition, setTargetPosition] = useState(pickRandomPoint());

    useEffect(() => {
        const movePet = () => {
            if (!isWalking) return; // If not walking, don't do anything

            // Step sizes for pet movements (higher is faster)
            const leftStepSize = 0.075;
            const topStepSize = 0.1;

            // Variables to sync scaling and moving up or down to simulate depth
            const totalTopDistance = targetPosition.top - position.top;
            const totalScaleChange = targetPosition.scale - position.scale;
            const totalSteps = Math.abs(totalTopDistance / topStepSize);
            const scaleStepSize = totalScaleChange / totalSteps;

            setPosition((prevPosition) => {
                // Check if pet has made it to target location
                const reachedTarget =
                    prevPosition.left === targetPosition.left &&
                    prevPosition.top === targetPosition.top &&
                    prevPosition.scale === targetPosition.scale;

                // Stop walking animation when at target destination
                if (reachedTarget) {
                    setIsWalking(false); // Stop the pet
                    setTimeout(() => {
                        // Wait before moving again
                        const newTarget = pickRandomPoint();
                        setTargetPosition(newTarget); // Set a new destination
                        setIsWalking(true); // Resume walking
                    }, 3000); // Wait time in milliseconds
                    return prevPosition; // Return current position to prevent state update
                }

                // Flip pet if it's moving to the right of its current position
                const newFlip = targetPosition.left > prevPosition.left ? -1 : 1;

                let newLeft = prevPosition.left;
                if (
                    Math.abs(targetPosition.left - prevPosition.left) >
                    Math.abs(leftStepSize)
                ) {
                    // If the pet hasn't reached the newLeft position, move towards it
                    newLeft +=
                        targetPosition.left > prevPosition.left
                            ? leftStepSize
                            : -leftStepSize;
                } else {
                    // Adjust newLeft to exactly match the target to prevent overshooting
                    newLeft = targetPosition.left;
                }

                let newTop = prevPosition.top;
                if (
                    Math.abs(targetPosition.top - prevPosition.top) >
                    Math.abs(topStepSize)
                ) {
                    // If the pet hasn't reached the newTop position, move towards it
                    newTop +=
                        targetPosition.top > prevPosition.top ? topStepSize : -topStepSize;
                } else {
                    // Adjust newTop to exactly match the target to prevent overshooting
                    newTop = targetPosition.top;
                }

                let newScale = prevPosition.scale;
                if (
                    Math.abs(targetPosition.scale - prevPosition.scale) >
                    Math.abs(scaleStepSize)
                ) {
                    // If the pet hasn't finished scaling, adjust the scale
                    newScale += scaleStepSize;
                } else {
                    // Adjust newScale to exactly match the target to prevent overshooting
                    newScale = targetPosition.scale;
                }

                return {
                    left: newLeft,
                    top: newTop,
                    scale: newScale,
                    flip: newFlip,
                };
            });
        };

        let intervalId;
        if (isWalking) {
            intervalId = setInterval(movePet, 10); // Move the pet every 10ms
        }

        // Clear the interval on component unmount to prevent memory leaks
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [targetPosition, isWalking]);

    const handlePetClick = async () => {
        if (!accessToken) {
            console.error('User token not found');
            return;
        }

        const interactionType = 'pet';

        // Send a request to the server to interact with the pet
        const response = await fetch('http://localhost:8000/api/pet/interact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`, // Send the access token in the header
            },
            body: JSON.stringify({ interactionType }),
        });

        // Check if the request was successful (response code 200-299)
        if (response.ok) {
            const data = await response.json();
            console.log(data.message, data.pet);
        } else {
            console.error('Error status: ${response.status}');
        }

    };

    return (
        <div className="backyard">
            <div
                className={`pet ${isWalking ? 'walk' : ''}`} // TODO: make idle animation for when its not walking
                onClick={handlePetClick}
                style={{
                    position: 'absolute',
                    left: `${position.left}vw`,
                    top: `${position.top}vh`,
                    transform: `scale(${position.scale}) scaleX(${position.flip})`,
                }}
            ></div>
        </div>
    );
};

export default Pet;
