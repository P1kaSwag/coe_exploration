import React, { useEffect, useState } from 'react';
import { useAuth } from '../authentication/AuthComponent';
import PetMenu from './PetMenu';
import './pet_styles.css';

const Pet = () => {
    const { accessToken } = useAuth();  // Get the access token from the AuthProvider to make authenticated requests

    // State to manage the pet's menu and skills
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [petStats, setPetStats] = useState({ pet_name: "O'malley", mood: "neutral", love: 0, recreation: 0, hunger: 0, cleanliness: 0 })

    // Used to turn on and off walking animation
    const [isWalking, setIsWalking] = useState(true);

    const points = [
        { left: 40, top: 5, scale: 0.3 },
        { left: 70, top: 50, scale: 0.75 },
        { left: 70, top: 40, scale: 0.65 },
        { left: 76, top: 10, scale: 0.33 },
        { left: 0, top: 30, scale: 0.55 },
        { left: 30, top: 40, scale: 0.65 },
    ];

    const pickRandomPoint = () => {
        const randomIndex = Math.floor(Math.random() * points.length);
        return points[randomIndex];
    };

    const [position, setPosition] = useState({...pickRandomPoint(), flip: 1});

    const [targetPosition, setTargetPosition] = useState(pickRandomPoint());

    // Set the style for the body page of the pet component then reset it when the component unmounts
    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(0, 0, 0)' // Code for grass color: 'rgb(83, 172, 15)' 
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.backgroundColor = ''
            document.body.style.overflow = ''
        }
    }, []);

    // Fetch the pet's stats from the server
    useEffect(() => {
        const fetchPetStats = async () => {
            if (!accessToken) {
                console.error('User token not found');
                return;
            }

        // Send a request to the server to get the pet's stats
        const response = await fetch('api/pet/stats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Send the access token in the header
            },
        });

        // Check if the request was successful (response code 200-299), then get the pet's stats
        if (response.ok) {
            const data = await response.json();
            console.log(data.petStats);
            setPetStats(data.petStats);
        } else {
            console.error('Error status: ${response.status}');
        }
        };
        fetchPetStats();
    }, [accessToken]);
            
    
    // Move the pet to the target position
    useEffect(() => {
        const movePet = () => {
            if (showMenu) setIsWalking(false); // If the menu is open, don't move the pet (wait for the menu to close)

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
                        //if (showMenu) return; // If the menu is open, don't move the pet (wait for the menu to close
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
    }, [targetPosition, isWalking, showMenu]);

    const handlePetClick = (event) => {
        setShowMenu(true); // Show the menu
        setMenuPosition({ x: event.pageX, y: event.pageY }); // Position the menu at the click location
        //setIsWalking(false);    // Stop the pet from walking
    };

    const handleOptionSelected = async (interactionType) => {
        console.log(`Selected option: ${interactionType}`);
        setShowMenu(false);
        setIsWalking(true);

        if (!accessToken) {
            console.error('User token not found');
            return;
        }

        // Send a request to the server to interact with the pet
        const response = await fetch('api/pet/interact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Send the access token in the header
            },
            body: JSON.stringify({ interactionType }),
        });

        // Check if the request was successful (response code 200-299), then update the pet's stats
        if (response.ok) {
            const data = await response.json();
            console.log(data.message, data.pet);
            setPetStats(data.pet);
        } else {
            console.error('Error status: ${response.status}');
        }

    };

    return (
        <div className="backyard">
            <div
                className={`pet ${isWalking ? 'walk' : ''}`}
                onClick={handlePetClick}
                style={{
                    position: 'absolute',
                    left: `${position.left}%`,
                    top: `${position.top}%`,
                    transform: `scale(${position.scale}) scaleX(${position.flip})`,
                }}
            ></div>
            <div className="statBoard">
                <h3>Pet Stats</h3>
                <p>Mood: {petStats.mood}</p>
                <p>Love: {petStats.love}</p>
                <p>Recreation: {petStats.recreation}</p>
                <p>Hunger: {petStats.hunger}</p>
                <p>Cleanliness: {petStats.cleanliness}</p>
            </div>
            {showMenu && <PetMenu x={menuPosition.x} y={menuPosition.y} onOptionSelected={handleOptionSelected} />}
        </div>
    );
};

export default Pet;
