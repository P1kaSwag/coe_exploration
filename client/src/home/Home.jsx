import '../assets/home.css'
import { NavLink } from "react-router-dom"
import { useEffect } from 'react'
import Quiz from '../assets/hiring.png'
import Explore from '../assets/mortarboard.png'
import Reward from '../assets/safety.png'
import { useAuth } from '../authentication/AuthComponent';


const Home = () => {
    const { user } = useAuth();
    const test = false;

    useEffect(() => {
        document.body.style.overflow = 'hidden' // Prevent scrolling on the page

        return () => {
            document.body.style.overflow = ''
        }
    }, []);

    return (
        <>
            <div className="home-background">
                <div className="home-container">
                    <div className="howto-container">
                        <h1> Explore the College of Engineering Majors</h1>
                        <p> We've gathered insights from engineering students at Oregon State University to create an interactive 
                            experience that helps you explore and discover your ideal engineering major. Take our quiz to find your top three majors, explore 
                            detailed information about each one, and get a firsthand look at what students have to say. Along the way, you'll interact with a virtual pet, 
                            play mini-games, and unlock rewards that make learning about each major fun and engaging.
                        </p>
                        <div>
                            {!user && <NavLink to="/login"> <button className="link-button"> Login </button> </NavLink>}
                            <NavLink to="/howto"> <button className="link-button"> How To </button>  </NavLink>
                        </div>
                    </div>

                    <div className="container">
                        <div className="small-card">
                            <div className="icon-container">
                                <img src={Quiz} className="icon-small"></img>
                            </div>
                            <div className="text-container">
                                Take the quiz. Our quiz is made to find you your top three engineering majors at Oregon State University.
                            </div>
                        </div>
                        <div className="small-card">
                            <div className="icon-container">
                                <img src={Explore} className="icon-small"></img>
                            </div>
                            <div className="text-container">
                                Explore all 16 majors within the College of Engineering. You can learn about every major from a students perspective.
                            </div>
                        </div>
                        <div className="small-card">
                            <div className="icon-container">
                                <img src={Reward} className="icon-small"></img>
                            </div>
                            <div className="text-container">
                                Apply your items to your pet. Play all of the 16 mini games to get every item you can equipt to your pet.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Home
