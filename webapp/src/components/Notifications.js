import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { getChats } from "../services/crudPod";
import { getFriends } from "../services/crudPod";

const Notifications = (originWebId) => {
    const [show, setShow] = useState(true);
    const [chats, setChats] = useState([]);
    const [htmlItems, setHtmlItems] = useState([]);

    useEffect(() => {
        async function fetchMessages() {
            let myChats = await getChats(originWebId.webId, originWebId.webId).then(function (chats) {
                return chats;
            });
            let friends = await getFriends(originWebId.webId).then(function (list) {
                return list;
            });
            var friendChats = []
            friends.forEach(async function (friend) {
                getChats(originWebId.webId, friend).then(res => friendChats.push(res))
                var allchats = [];
                await allchats.push(myChats);
                await friendChats.forEach(chat => allchats.push(chat));
                var myHtmlItems = []
                await allchats.forEach(async function (chat) {
                    
                    await chat.forEach(async function (singleChat) {
                        myHtmlItems.push(
                            <div>
                                <Card style={{ width: "18rem" }}>
                                    <Card.Body>
                                        <Card.Title>{singleChat.chatName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{singleChat.maker}</Card.Subtitle>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                </Card.Text>
                                        <Card.Link href="#">Card Link</Card.Link>
                                        <Card.Link href="#">Another Link</Card.Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    }
                    );
                })

                if (myHtmlItems.length !== 0)
                    setHtmlItems(myHtmlItems);
                setChats(allchats);
            });
        }

        fetchMessages();

    }, [setChats, originWebId.webId, setHtmlItems]);
    console.log(chats);
    return (
        <div className="bgcenter">
            <>
                <Alert show={show}>
                    <Alert.Heading>Very important, must read!!!</Alert.Heading>
                    <p>In order to create chats in Radarin, you will have to click <span style={{ color: "blue" }} onClick={() => window.open(originWebId.webId + "inbox/", "_blank")}>here</span>. This will open a new tab, the inbox of your Pod. Radarin
                        uses it to create chats there. By default you are the only user that can manage its contents, but, if you want to connect with your friends, you have to change access to this folder and
                        give everyone a 'Poster' access (if you do not know how to do this click <span>here</span> to see a tutorial). Now, you also have to create the chat in the inox folder and publish a chat (in the same <span>link</span> as before you will fins a tutorial).</p>
                    <p>Each and every step described before is very important, if they are not completed, you will not be able to create chats by yourself, you will only be able to interact in those your friends have invited you to</p>
                    <p>After completing the steps, you are now able to create your own chats. Remember, Solid Pods are a new technology, and its not the fastest, so be patient if tour messages or chats take a while to appear. Enjoy!</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setShow(false)} variant="info">
                            Understood
                        </Button>
                    </div>
                </Alert>
                {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
            </>

            <div className="bgcenter">
                {htmlItems}
            </div>

        </div>
    );
};

export default Notifications;
