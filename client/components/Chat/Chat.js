import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { graphql, compose } from 'react-apollo';

import moment from 'moment';
moment.locale('ru');

import query from '../../queries/ChatMessages';


import Message from './Message';

// import c from '../';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.appState;
    }

    render() {
        console.log('---Chat props', this.props);

        if (this.props.data.loading) {
            return <div> ....loading </div>
        }
        const messages = this.props.data.chat.messages;

        return (
            <div>
                <h3 style={{textAlign: 'center', marginBottom: '12px', background:'#fff'}}> {this.props.data.chat.name} </h3>
                {messages.map(message => <Message key={message.id} user={message.user.username} message={message.content} createdAt ={moment(message.createdAt).format("HH:mm")} />
                )}
                <div> chat's ID {this.props.match.params.chat} </div>
            </div>
        );
    }
}

const groupQuery = graphql(query, {
    options: props => ({
        variables: {
            id: props.match.params.chat,
        },
    })
});


export default compose(groupQuery)(Chat);

