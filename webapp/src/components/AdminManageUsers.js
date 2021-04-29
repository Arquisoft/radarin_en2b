import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { getNormalUsers, removeUserById } from "../api/api.js";

class AdminManageUsers extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          usersList: []
        }
    }

    componentDidMount(){
        var usersList = [];
        getNormalUsers().then((value) => {
            for(var i = 0; i < value.length; i++){
                usersList[i] = value[i];
            }
        });

        setTimeout(() => {
            this.setState({usersList: usersList});
        }, 100);
    }

    deleteUserByWebId = (user) => {
        removeUserById(user.webId);
        this.state.usersList.splice(this.state.usersList.indexOf(user), 1);
        this.setState({usersList: this.state.usersList});
    }

    render() {
        return (
            <div>
                <h2>UsersList</h2>
                    {this.state.usersList.map((user) => 
                        {return <ListGroup horizontal style={{ margin: "20px" }}>
                                    <ListGroup.Item style={{ minWidth: "500px", textAlign: "center" }}>
                                        {user.webId}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button data-testid={user.webId} onClick={() => this.deleteUserByWebId(user)}>Delete</Button>
                                    </ListGroup.Item>
                                </ListGroup>      
                        }
                    )}
            </div>
        );
    }
}
export default AdminManageUsers;
