import React, { Component } from "react";
import { inject, observer } from "mobx-react";

class Message extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.appState;
    }

    render() {
        const { user, message, createdAt } = this.props;

        return (
            <p>
                <b>{user} </b> [<i>{createdAt}</i>]: <span> {message} </span>
            </p>
        );
    }
}

export default Message;
