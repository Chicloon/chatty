import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { graphql, compose } from 'react-apollo';

import moment from 'moment';
moment.locale('ru');

import query from '../src/graphql/query/group';


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
        const messages = this.props.data.group.messages;

        return (
            <div>
                <h3 style={{textAlign: 'center', marginBottom: '12px', background:'#fff'}}> {this.props.data.group.name} </h3>
                {messages.map(message => <Message key={message.id} user={message.from.username} message={message.text} createdAt ={moment(message.createdAt).format("HH:mm")} />
                )}
                {this.props.match.params.chat}
            </div>
        );
    }
}

const groupQuery = graphql(query, {
    options: props => ({
        variables: {
            groupId: props.match.params.chat,
        },
    })
});


export default compose(groupQuery)(Chat);

