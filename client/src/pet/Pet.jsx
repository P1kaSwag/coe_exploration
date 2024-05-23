import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../authentication/AuthComponent';
import PetMenu from './PetMenu';
import outfitMappings from './outfitConfig';
import RewardManager from './RewardManagerComponent';
import './pet_styles.css';

import RewardNotification from '../explore/minigames/RewardNotificationComponent';

const Pet = () => {
    const { accessToken } = useAuth();  // Get the access token from the AuthProvider to make authenticated requests
    const [showMenu, setShowMenu] = useState(false);
    const [showRewards, setShowRewards] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [petStats, setPetStats] = useState({ pet_name: "O'malley", mood: "neutral", love: 0, recreation: 0, hunger: 0, cleanliness: 0 })
    const [animationState, setAnimationState] = useState('walking'); // ['walking', 'eating', 'idle', 'washing', 'petting']
    const [outfit, setOutfit] = useState('default');
    const [dirtOverlay, setDirtOverlay] = useState('none'); // ['none', 'light', 'heavy']
    const [loadedImages, setLoadedImages] = useState([]);
    const [waiting, setWaiting] = useState(false);
    const [playModeFetch, setPlayModeFetch] = useState(false);
    const [playMode, setPlayMode] = useState(false);

    const points = [
        { left: 70, top: 50, scale: 1 },
        { left: 35, top: 50, scale: 1 },
        { left: 5, top: 50, scale: 1 },
        { left: 70, top: 40, scale: 0.9 },
        { left: 30, top: 40, scale: 0.9 },
        { left: 76, top: 30, scale: 0.8 },
        { left: 0, top: 30, scale: 0.8 },
        { left: 40, top: 20, scale: 0.7 },
        { left: 65, top: 20, scale: 0.7 },
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
            setOutfit(data.petStats.outfit.replace(/\s/g, '')); // Remove spaces from outfit name
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
            img.src = `src/assets/default/${state}.png`;
            images.push(img);
        });

        // Preload outfit overlays based on the mappings in outfitConfig.jsx
        if (outfit && outfit !== 'default'){
            states.forEach(state => {
                if (outfitMappings[outfit][state]) {
                    const img = new Image();
                    img.src = `src/assets/${outfit}/${outfitMappings[outfit][state]}.png`;
                    images.push(img);
                }
            });
        }

        // Preload the dirt overlay images if applicable
        if (dirtOverlay !== 'none') {
            const dirtStates = ['walking', 'eating', 'idle', 'petting'];
            dirtStates.forEach(state => {
                const img = new Image();
                img.src = `src/assets/dirt/${dirtOverlay}_${outfitMappings[dirtOverlay][state]}.png`; // outfitMappings[dirtOverlay][state]
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
                    setWaiting(true);
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
                        targetPosition.left > prevPosition.left ? leftStepSize
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
    }, [targetPosition, animationState, showMenu, waiting]);

    // Set the pet to wait for a few seconds before walking again
    useEffect(() => {
        if (showMenu) return
        if (waiting) {
            const waitTimer = setTimeout(() => {
                setWaiting(false);
                setAnimationState('walking');
                setTargetPosition(pickRandomPoint());  // Pick new target after waiting
            }, 4000);  // Wait for 4 seconds

            return () => clearTimeout(waitTimer);
        }
    }, [waiting, showMenu]);  // Effect runs only when waiting state changes




    // TESTING FETCH COMMAND (NOT COMPLETELY IMPLEMENTED) ############################################################################################
    useEffect(() => {
        const handleFetch = (event) => {
            if (playModeFetch) {
                console.log('Fetch command received');
                const rect = event.target.getBoundingClientRect();
                const left = Math.max(0, Math.min(70, ((event.clientX - rect.left) / rect.width) * 100));
                const top = Math.max(20, Math.min(50, ((event.clientY - rect.top) / rect.height) * 100));
                console.log(`Click position: ${left}, ${top}`);
                setTargetPosition({ left, top, scale: 1 }); // Set target position to clicked location
                setAnimationState('walking');
                setPlayModeFetch(false); // Exit play mode after one click
            }
        };

        if (playModeFetch) {
            document.addEventListener('click', handleFetch);
        }

        return () => {
            document.removeEventListener('click', handleFetch);
        };
    }, [playModeFetch]);


    // TESTING PLAY MODE (NOT COMPLETELY IMPLEMENTED) ############################################################################################




    const handlePetClick = (event) => {
        if (!showMenu) {
            setAnimationState('idle'); // Stop the pet from walking
            setShowMenu(true); // Show the menu
            setMenuPosition({ x: event.pageX, y: event.pageY }); // Position the menu at the click location
        }
        else {
            setAnimationState('walking'); // Stop the pet from walking
            setShowMenu(false);
        }
    };

    const handleOptionSelected = async (interactionType) => {
        console.log(`Selected option: ${interactionType}`);
        setShowMenu(false);

        if (interactionType === 'feed') {
            setAnimationState('eating');
        } else if (interactionType === 'wash') {
            setAnimationState('washing');
        } else if (interactionType === 'pet') {
            setAnimationState('petting');
        } else if (interactionType === 'play') {
            //setPlayModeFetch(true);
            setPlayMode(true);
        } else if (interactionType === 'style') {
            setShowRewards(true);
            return;
        } else {
            setAnimationState('walking');
            return;
        }

        setTimeout(() => {
            setAnimationState('walking');
        }, 2200);

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

    // Some outfits share overlay images for certain states, so we need to check the mappings to get the correct images
    const getOutfitImage = (state) => {
        if (outfit && outfit !== 'default' && outfitMappings[outfit][state]) {
          return `src/assets/${outfit}/${outfitMappings[outfit][state]}.png`;
        } else {
          return '';
        }
    };

    const getDirtOverlayImage = (state) => {
        if (dirtOverlay !== 'none') {
            return `src/assets/dirt/${dirtOverlay}_${outfitMappings[dirtOverlay][state]}.png`;
        } else {
            return '';
        }
    }

    const handleCloseRewards = () => {
        setShowRewards(false);
        setAnimationState('walking');
        window.location.reload(); // Reload the page
    };

    const debugAnimation = () => {
        if (outfit === 'default') {
            setOutfit('RadiationHealthPhysics');
        } else {
            setOutfit('default');
        }
    }

    const debugAnimation2 = () => {
        if (animationState === 'walking') {
            setAnimationState('idle');
        } else {
            setAnimationState('walking');
        }
    }

    const debugRewards = async () => {
        const response = await fetch('/api/debug/unlock-rewards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }});
        
        if (response.ok) {
            const data = await response.json();
            console.log(data.rewards);
        } else {
            console.error(`Error status: ${response.status}`);
        }
    };
        

    return (
        <div className="backyard">
            <img src="src/assets/yard_fence.png" alt="fence" className="overlay" />
            <img src="src/assets/doghouse.png" alt="Doghouse" className="overlay" />
            <img src="src/assets/flowerbush.png" alt="Flowers" className="overlay" />
            <img src="src/assets/frisbee.png" alt="frisbee" className="frisbee" style={{height: '15%', width: '15%', left: '1%', top: '70%'}} />

            {/* DEBUG */}
            <button className="backyardButton" onClick={debugAnimation} style={{
                position: 'absolute',
                left: '11.1%',
                top: '30%',
                }}>{outfit}</button>
            <button onClick={debugAnimation2} style={{
                position: 'absolute',
                left: '11.1%',
                top: '32%',
                }}>Idle</button>
            <button onClick={() => setDirtOverlay('light')} style={{
                position: 'absolute',
                left: '11.1%',
                top: '34%',
                }}>Light Dirt</button>
            <button onClick={() => setDirtOverlay('heavy')} style={{
                position: 'absolute',
                left: '11.1%',
                top: '36%',
                }}>Heavy Dirt</button>
            <button onClick={() => setDirtOverlay('none')} style={{
                position: 'absolute',
                left: '11.1%',
                top: '38%',
                }}>No Dirt</button>
            <button onClick={debugRewards} style={{
                position: 'absolute',
                left: '0%',
                top: '85%'}}>Unlock Rewards</button>
            {/* DEBUG */}
            
                <div    // Pet base image
                    key={`pet-${animationState}-${outfit}-${dirtOverlay}`}
                    className={`pet ${animationState}`}
                    style={{
                        backgroundImage: `url('src/assets/default/${animationState}.png')`,
                        position: 'absolute',
                        left: `${position.left}%`,
                        top: `${position.top}%`,
                        transform: `scale(${position.scale}) scaleX(${position.flip})`,
                        pointerEvents: 'none',
                    }}>
                    <div // Dirt overlay image
                        key={`${dirtOverlay}-${animationState}`}
                        className={`dirt-${dirtOverlay}-${animationState}`} 
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            //backgroundImage: `url('src/assets/dirt/${dirtOverlay}_${animationState}.png')`,
                            backgroundImage: `url(${getDirtOverlayImage(animationState)})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            pointerEvents: 'none',
                    }} />
                    <div // Outfit overlay image
                        key={`${outfit}-${animationState}`}
                        className={`${outfit}-${animationState}`}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${getOutfitImage(animationState)})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            pointerEvents: 'none',
                        }}
                    />
                    <div className='clickableArea'
                    onClick={animationState === 'walking' || animationState === 'idle' ? handlePetClick : null}
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '35%',
                        width: '50%',
                        height: '50%',
                        cursor: 'pointer',
                        pointerEvents: 'visible',
                    }}
                    />

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
            {showRewards && <RewardManager onClose={handleCloseRewards} />}
        </div>
    );
};

export default Pet;