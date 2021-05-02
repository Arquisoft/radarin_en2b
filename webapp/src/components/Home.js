import Carousel from "react-bootstrap/Carousel";
import "../Home.css";
import solid from "../img/solid.png";
import map from "../img/map.png";
import friends from "../img/friends.png";
import noti from "../img/bellhome.png";
import inrupt from "../img/inrupt.png";
import location from "../img/location.png";

const Home = () => {
    return (
        <div className="center">
        <Carousel >
        <Carousel.Item interval={7000}>
            <div style={{padding:"1.25em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
                
            <div className="gradient-border"><Carousel.Caption>
                <div><img src={solid} className="item" alt="solid"></img><img src={inrupt} className="item" alt="inrupt"></img></div>
                    <h3>Welcome to Radarin!</h3>
                    <span>But... what is Radarin? It is an app developed by third year Software Engineering from the University of Oviedo, coursing the Software Architecture subject. The main objetive of the Radarin is keeping you in touch with your friends, wherever and whenever you want. This React app supports the Solid project, created by Sir Tim Berners-Lee, and works through Inrupt.</span>
                    <br></br>
                    <p>Let's get started!</p>
                </Carousel.Caption></div>
            </div>
            
                
            </Carousel.Item>
            <Carousel.Item interval={7000}>
            <div style={{padding:"1.25em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
            <div className="gradient-border">
                <Carousel.Caption>
                <img src={map} className="item" alt="map"></img>
                <br></br>
                    <h3>See where are your friends in real time</h3>
                    <span>In the navigation bar you will find all the available options in the app (icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>). One of them, is the map where you will see yourself as blue pushpin and your friends as red pushpins. If you click on one of them, you will be able to see the names of your friends, next to their pushpin.</span>
                    <br></br>
                    <br></br>
                    <br></br>
                </Carousel.Caption></div>
            </div>
            </Carousel.Item>
            <Carousel.Item interval={7000}>
            <div style={{padding:"1.25em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
            <div className="gradient-border">
                <Carousel.Caption>
                <img src={friends} className="item" alt="friends"></img>
                    <h3>Contact with your friends</h3>
                    <span>Go see how far your friends are in your friend list. You may be tempted to check this after Radarin sends you a notification telling you that a friend is less than one kilometer away. In the list, you will see the exact distance between both of you. In this section you also have the option to add and delete friends.</span>
                    <br></br>
                    <br></br>
                    <br></br>
                </Carousel.Caption></div>
            </div>
            </Carousel.Item>
            <Carousel.Item interval={7000}>
            <div style={{padding:"1.25em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
            <div className="gradient-border">
                <Carousel.Caption>
                <img src={noti} className="item" alt="notifications"></img>
                    <h3>Interact with your friends</h3>
                    <span>Are any of your friends near? Then go interact with them! In the notification section, you will have a list of your friends' last interactions: if they were near or maybe, they sent you a message! In Radarin you can get in touch with your friends, sending them a message that they will recieve as notification in real time.</span>
                    <br></br>
                    <br></br>
                    <br></br>
                </Carousel.Caption></div>
            </div>
            </Carousel.Item>
            <Carousel.Item interval={7000}>
            <div style={{padding:"1.25em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
            <div className="gradient-border">
                <Carousel.Caption>
                <img src={location} className="item" alt="location"></img>
                    <h3>Save your special spots</h3>
                    <span>If you have found an special spot for you and you want to save it forever, Radarin makes easy for you. In the section My tags, you will find the possibility of creating a custom tag that will later appear in your own tags map, so that if you want to come back in another moment, the app will be there for you.</span>
                    <br></br>
                    <br></br>
                    <br></br>
                </Carousel.Caption></div>
            </div>
            </Carousel.Item>
        </Carousel>
        </div>
    );
};

export default Home;
