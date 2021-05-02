import { Jumbotron, Button } from "react-bootstrap";
import "../AboutUs.css";

const AboutUs = () => {
    return (
            <div className="center" >
            <Jumbotron className="jumbo" style={{background:"linear-gradient( #2ebf91, #25b7c4)", borderStyle: "solid",
        borderRadius: "3em",
        borderColor: "black",
        padding: "2em"}}>
                <h1>Hello, world!</h1>
                <h2>What is Radarin?</h2>
                <p>Radarin is a system to facilitate meetings between friends using new technologies.</p>
                <p>To carry out the project’s aim, the application needs the mobile phone localization of the users who voluntarily activate it and allow the application to use it.</p>
                <p>The users also need to allow their friends to know when they are near them. A notification will be sent in this situation so they can get in contact.</p>

                <h3>Team members</h3>
                <ul>
                    <li>Andrea García Cernuda - uo270115</li>
                    <li>Marcos Fernández González - uo270803</li>
                    <li>Sara Rubín Estrada-Nora - uo270185</li>
                    <li>Luis Fernández Suárez - uo271405</li>
                    <li>Héctor Díaz Beltrán - uo269787</li>
                </ul>

                <h4>Company</h4>
                <p>RadarinEn2b: students enrolling Sotware Architecture course in Computer Software Engineering, University of Oviedo</p>

                <p>
                    <Button variant="primary" onClick={() => window.open("http://radarinen2bwebapp.herokuapp.com/docs/")}>Learn more</Button>
                </p>
            </Jumbotron>
            </div>
            
    );
};

export default AboutUs;
