import '../assets/home.css'

import HowToBackground from '../assets/howtobg.png'

const HowTo = () => {
    return (
        <body style={{ backgroundImage: `url(${HowToBackground})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', margin: 0, padding: 0}}>
            <div className="howto-container"> 
                <h3> CoE Major Exploration Game How To: </h3>

                <p> Start out by taking the Major Exploration Quiz. Through this, you will answer the different questions which will help
                    you find a major that fits you in the College of Engineering at Oregon State University. If you are not ready to take the 
                    quiz yet, you can also choose to explore the majors first and then take the quiz after.
                </p>
                <p> After taking the quiz, you will have the option to explore the majors the quiz gave you or you can choose to explore 
                    all the majors. Listed in the exploration page, you will find all of the engineering majors offered at Oregon State. This includes 
                    both the Corvallis and Cascades campus. When you click on a major in the exploration page it will take you to information on the 
                    major such as top professors, student quotes, possible minors, and more.
                </p>
                <p>
                    At the end of each major's page, you will see a button to take you to a mini game related to the major. Once you've successfully
                    complete the mini game, you will be rewarded an item that can be applied to your pet. Play all 17 mini games to get every item for your pet!
                </p>
                <p> 
                    In the Pet section, you can interact with your pet to improve its stats and mood. Here's how it works:
                </p>
                <ul style={{textAlign: 'justify'}}>
                    <li><b>Interacting with Your Pet:</b> Click on your pet to open the interaction menu. You can choose to feed, wash, pet, or play with your pet.</li>
                    <li><b>Improving Stats:</b> Each interaction affects your pet's stats differently. Feeding reduces hunger, washing improves cleanliness, petting increases love, and playing boosts recreation.</li>
                    <li><b>Equipping Items:</b> You can equip items that you have earned by completing mini-games. These items can be outfits, cosmetic decorations, or new game mechanics for your pet.</li>
                    <li><b>Checking Up:</b> Make sure to check up on your pet every so often to keep it happy and healthy. If neglected, your pet can become unhappy and dirty.</li>
                    <li><b>Renaming Your Pet:</b> You can rename your pet by going to the Reward Manager and entering a new name for your pet.</li>
                </ul>

                <h3> Pet Moods: </h3>
                <p> Your pet has different moods that can change based on your interactions and activities. Here's a quick summary of what each mood means: </p>
                <ul style={{textAlign: 'justify'}}>
                    <li><b>Excited:</b> Your pet is thrilled because it recently earned a new reward. Keep exploring to keep your pet excited!</li>
                    <li><b>Curious:</b> Your pet is wondering what new adventures await. Explore new majors to discover more rewards!</li>
                    <li><b>Happy:</b> Your pet is very happy! It's well-loved, entertained, well-fed, and clean. Great job!</li>
                    <li><b>Sad:</b> Your pet is feeling sad. It needs more love, playtime, food, and a good cleaning. Spend some time with your pet to cheer it up!</li>
                    <li><b>Angry:</b> Your pet is angry due to neglect. It needs your attention and care. Make sure to interact with your pet regularly.</li>
                    <li><b>Neutral:</b> Your pet is feeling neutral. It doesn't have any strong feelings at the moment. Interact with your pet to improve its mood.</li>
                </ul>
                {/* fine print */}
                <p style={{fontSize: 'small'}}> 
                    If you are or were an engineering student at Oregon State University and would like to contribute to the major data, please take this survey:
                    <a href="https://forms.gle/6FdrhoGw4jWQtkaJA" target="_blank" rel="noreferrer"> Engineering Major Survey </a>
                    <br />
                    This website wasn't optimized for all devices. You may encounter visual bugs on some devices. If you encounter any bugs, please report them here: 
                    <a href="https://github.com/nguyen-bryan/coe_exploration/issues" target="_blank" rel="noreferrer"> CoE Exploration Issues </a>
                </p>
            </div>
        </body>
    )
}

export default HowTo