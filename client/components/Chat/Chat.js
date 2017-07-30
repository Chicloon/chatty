import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Message from './Message';

// import c from '../';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.appState;
    }

    render() {
        const store = this.store;
        console.log('---Chat props', this.props);
        return (
            <div>
              {this.props.match.params.chat}              
              <Message user='User' message='message' />
            </div>
        );
    }
}

export default Chat;
