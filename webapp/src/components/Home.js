import Carousel from 'react-bootstrap/Carousel';
import '../Home.css';
import item from '../img/item.png';
import item2 from '../img/item2.png';
import item3 from '../img/item3.png';

const Home = () => {
    return (
        <div class="center">
        <Carousel >
            <Carousel.Item interval={7000}>
                <div class="item">
                <img src={item} className="d-block w-100"/>
                </div>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdumaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.</p>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdumaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.</p>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdumaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={7000}>
            <div class="item">
                <img src={item2} className="d-block w-100"/>
                </div>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={7000}>
            <div class="item">
            <img src={item3} className="d-block w-100"/>
            </div>
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
    );
};

export default Home;