import React from 'react';
import Wordle from './Wordle.jsx';

const IndustrialEngineeringGame = () => {
    // List of themed words for the wordle game
    const words = [
        "asset",
        "batch",
        "build",
        "chart",
        "cycle",
        "demand",
        "design",
        "effort",
        "engine",
        "factor",
        "flow",
        "goods",
        "labor",
        "layout",
        "linear",
        "manage",
        "method",
        "metric",
        "model",
        "output",
        "plant",
        "supply",
        "system",
        "tasks",
        "tools",
        "worker",
        "yield",
    ];

    return (
        <div>
            <Wordle word_list={words} rewardID={12} rewardName={"Glasses"} />
        </div>
    );
};

export default IndustrialEngineeringGame;