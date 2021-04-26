import Carousel from 'react-bootstrap/Carousel';
import '../Home.css';
import item1 from '../img/item1.png';
import item from '../img/item.png';
import item2 from '../img/item2.png';
import item3 from '../img/item3.png';
import item4 from '../img/item4.png';

const Home = () => {
    return (
        <div class="center">
        <Carousel fade>
        <Carousel.Item interval={7000}>
            <div style={{padding:"20px", display:"block", marginLeft:"auto", marginRight:"auto"}}>
            <div class="gradient-border"><Carousel.Caption>
                    <h3>Welcome to Radarin!</h3>
                    <span>But... what is Radarin? It is an app developed by third year Software Engineering from the University of Oviedo, coursing the Software Architecture subject. The main objetive of the Radarin is keeping you in touch with your friends, wherever and whenever you want. This React app supports the Solid project, created by Sir Tim Berners-Lee, and works through Inrupt.</span>
                    <br></br>
                    <p>Let's get started!</p>
                </Carousel.Caption></div>
            </div>
            
                
            </Carousel.Item>
            <Carousel.Item interval={7000}>
                <div class="item">
                <img src={item} className="d-block w-100"/>
                </div>
                <Carousel.Caption>
                    <h3>See where are your friends in real time</h3>
                    <span>In the navigation bar you will find all the available options in the app. One of them, is the map where you will see yourself as blue pushpin and your friends as red pushpins. If you click on one of them, you will be able to see the names of your friends, next to their pushpin.</span>
                    <br></br>
                    <br></br>
                    <br></br>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={7000}>
            <div class="item">
                <img src={item2} className="d-block w-100"/>
                </div>
                <Carousel.Caption>
                    <h3>Contact with your friends</h3>
                    <span>Go see how far your friends are in your friend list. You may be tempted to check this after Radarin sends you a notification telling you that a friend is less than one kilometer away. In the list, you will see the exact distance between both of you. In this section you also have the option to add and delete friends.</span>
                    <br></br>
                    <br></br>
                    <br></br>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={7000}>
            <div class="item">
            <img src={item3} className="d-block w-100"/>
            </div>
                <Carousel.Caption>
                    <h3>Interact with your friends</h3>
                    <span>Are any of your friends near? Then go interact with them! In the notification section, you will have a list of your friends' last interactions: if they were near or maybe, they sent you a message! In Radarin you can get in touch with your friends, sending them a message that they will recieve as notification in real time.</span>
                    <br></br>
                    <br></br>
                    <br></br>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={7000}>
            <div class="item">
            <img src={item4} className="d-block w-100"/>
            </div>
                <Carousel.Caption>
                    <h3>Save your special spots</h3>
                    <span>If you have found an special spot for you and you want to save it forever, Radarin makes easy for you. In the section My tags, you will find the possibility of creating a custom tag that will later appear in your own tags map, so that if you want to come back in another moment, the app will be there for you.</span>
                    <br></br>
                    <br></br>
                    <br></br>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
    );
};

export default Home;