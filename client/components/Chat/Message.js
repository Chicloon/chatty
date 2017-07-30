import React, { Component } from "react";
import { inject, observer } from "mobx-react";


// import c from '../';


class Message extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.appState;
    }

    render() {
        const store = this.store;
        return (
            <p>              
                {this.props.user}: <span> {this.props.message} </span>              
            </p>
        );
    }
}

export default Message;
