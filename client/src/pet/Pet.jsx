import React, { useEffect, useState } from 'react';
import { useAuth } from '../authentication/AuthComponent';
import PetMenu from './PetMenu';
import './pet_styles.css';
//import walkingAnimation from '../assets/default/walking.png';
//import idleAnimation from '../assets/default/idle.png';

const Pet = () => {
    const { accessToken } = useAuth();  // Get the access token from the AuthProvider to make authenticated requests

    // State to manage the pet's menu and skills
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [petStats, setPetStats] = useState({ pet_name: "O'malley", mood: "neutral", love: 0, recreation: 0, hunger: 0, cleanliness: 0 })
    const [animationState, setAnimationState] = useState('walking'); // ['walking', 'eating', 'idle', 'washing', 'petting']
    const [outfit, setOutfit] = useState('default');
    const [dirtOverlay, setDirtOverlay] = useState('heavy'); // ['none', 'light', 'heavy']
    const [loadedImages, setLoadedImages] = useState([]);

    const points = [
        { left: 40, top: 20, scale: 1 },
        { left: 70, top: 50, scale: 1 },
        { left: 70, top: 40, scale: 1 },
        { left: 76, top: 30, scale: 1 },
        { left: 0, top: 30, scale: 1 },
        { left: 30, top: 40, scale: 1 },
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
        document.body.style.overflow = 'hidden' // Prevent scrolling on the page
        
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
        const response = await fetch('/api/pet/stats', {
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
            console.error(`Error status: ${response.status}`);
        }
        };
        fetchPetStats();
    }, [accessToken]);

    // Preload the pet's images to prevent flickering when transitioning between animations
    const preloadImages = () => {
        const images = [];
        const states = ['walking', 'eating', 'idle', 'washing', 'petting'];
        states.forEach(state => {
            const img = new Image();
            img.src = `src/assets/${outfit}/${state}.png`;
            images.push(img);
        });

        // Preload the dirt overlay images if applicable
        if (dirtOverlay !== 'none') {
            const dirtStates = ['walking', 'eating', 'idle'];
            dirtStates.forEach(state => {
                const img = new Image();
                img.src = `src/assets/dirt/${dirtOverlay}_${state}.png`;
                images.push(img);
            });
        }
        setLoadedImages(images); // This stores the loaded images in state to ensure they are not garbage-collected
    };

    useEffect(() => {
        preloadImages();
    }, [outfit, dirtOverlay]); // Only need to run this when outfit changes
    
    // Move the pet to the target position
    useEffect(() => {
        const movePet = () => {
            if (showMenu || animationState !== 'walking') return; // If the menu is open or the pet is not walking, don't do anything

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
                    setAnimationState('idle'); // Set the pet to idle
                    setTimeout(() => {
                        const newTarget = pickRandomPoint();
                        setTargetPosition(newTarget); // Set a new destination
                        setAnimationState('walking'); // Set the pet to walking
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
        if (animationState === 'walking') {
            intervalId = setInterval(movePet, 10); // Move the pet every 10ms
        }

        // Clear the interval on component unmount to prevent memory leaks
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [targetPosition, animationState, showMenu]);

    // TESTING INTERACTIONS 1 ############################################################################################
    useEffect(() => {
        if (animationState === 'eating' || animationState === 'washing' || animationState === 'petting') {
            setTimeout(() => {
                setAnimationState('walking');
            }, 3000);
            return () => clearTimeout();
        }
    }, [animationState]);



    const handlePetClick = (event) => {
        setAnimationState('idle'); // Stop the pet from walking
        setShowMenu(true); // Show the menu
        setMenuPosition({ x: event.pageX, y: event.pageY }); // Position the menu at the click location
    };

    const handleOptionSelected = async (interactionType) => {
        console.log(`Selected option: ${interactionType}`);
        setShowMenu(false);
        setAnimationState('walking');


        // TESTING INTERACTIONS 2 ########################################################################################
        if (interactionType === 'feed') {
            setAnimationState('eating');
        } else if (interactionType === 'wash') {
            setAnimationState('washing');
        } else if (interactionType === 'pet') {
            setAnimationState('petting');
        }



        if (!accessToken) {
            console.error('User token not found');
            return;
        }

        // Send a request to the server to interact with the pet
        const response = await fetch('/api/pet/interact', {
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
            console.error(`Error status: ${response.status}`);
        }

    };

    const debugAnimation = () => {
        if (animationState === 'walking') {
            setAnimationState('idle');
        } else if (animationState === 'idle') {
            setAnimationState('eating');
        } else if (animationState === 'eating') {
            setAnimationState('washing');
        } else if (animationState === 'washing') {
            setAnimationState('petting');
        }
        else {
            setAnimationState('walking');
        }
    }

    return (
        <div className="backyard">
            <img src="src/assets/doghouse.png" alt="Doghouse" className="overlay" />
            <img src="src/assets/flowerbush.png" alt="Flowers" className="overlay" />

            {/* DEBUG */}
            <button className="backyardButton" onClick={debugAnimation} style={{
                position: 'absolute',
                left: '11.1%',
                top: '30%',
                }}>Walk</button>
            {/* DEBUG */}
            
                <div
                    key={`${outfit}-${animationState}`}
                    className={`pet ${animationState}`}
                    onClick={handlePetClick}
                    style={{
                        backgroundImage: `url('src/assets/${outfit}/${animationState}.png')`,
                        //backgroundImage: `url(${animationState === 'walking' ? walkingAnimation : idleAnimation})`,
                        position: 'absolute',
                        left: `${position.left}%`,
                        top: `${position.top}%`,
                        transform: `scale(${position.scale}) scaleX(${position.flip})`,
                    }}
                >
                    <div className={`dirty ${animationState}`} style={{
                        backgroundImage: `url('src/assets/dirt/${dirtOverlay}_${animationState}.png')`,
                        position: 'absolute',
                        left: '0%',
                        top: '0%',
                        width: '100%',
                        height: '100%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>
                        
                    </div>
                </div>
            <div className="statBoard">
                <h3>{petStats.pet_name} is feeling...</h3>
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
