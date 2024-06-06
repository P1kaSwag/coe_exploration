import React from 'react';
import Wordle from './Wordle.jsx';

const CivilEngineeringGame = () => {
    // List of themed words for the wordle game
    const words = [
        "beam",
        "brick",
        "build",
        "canal",
        "cement",
        "design",
        "dome",
        "drain",
        "earth",
        "girdle",
        "girth",
        "grade",
        "frame",
        "grout",
        "level",
        "mason",
        "pave",
        "plane",
        "plumb",
        "pour",
        "rebar",
        "rivet",
        "sewer",
        "slab",
        "span",
        "steel",
        "stone",
        "study",
        "truss",
        "vault",
        "weld",
        "works",
        "joint",
        "angle",
        "slope",
        "walls",
        "bridge",
        "column"
    ];

    return (
        <div>
            <Wordle word_list={words} rewardID={4} rewardName={"Hard Hat"} />
        </div>
    );
};

export default CivilEngineeringGame;