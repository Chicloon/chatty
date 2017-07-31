import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { graphql, compose } from 'react-apollo';

import moment from 'moment';
moment.locale('ru');

import { Row, Col } from 'antd';

import query from '../src/graphql/group.query';
import mutation from '../src/graphql/create-message.mutation';

import Message from './Message';
import InputField from './InputField';

// import c from '../';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.appState;
    }

    sendMessage(message) {
        this.props.mutate({
            variables: {
                text: message,
                userId: 1,
                groupId: this.props.match.params.chat
            },
            optimisticResponse: {
                __typename: 'Mutation',
                createMessage: {
                    __typename: 'Message',
                    createdAt: new Date().toISOString(),
                    id: -1,
                    text: message,
                    from: {
                        __typename: 'User',
                        id: 1,
                        username: 'Justyn.Kautzer',
                    },
                    to: {
                        __typename: 'Group',
                        id: this.props.match.params.chat
                    }
                }

            },
        })
            .then(this.props.data.refetch());
        
        console.log('msg:', message);
    }

    render() {
        console.log('---Chat props', this.props);

        if (this.props.data.loading) {
            return <div> ....loading </div>
        }
        const messages = this.props.data.group.messages;

        return (
            <Row type='flex' justify='spance-between' style={{ flexDirection: 'column', height: '100%' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '12px', background: '#fff' }}> {this.props.data.group.name} </h3>
                <div style={{ marginBottom: 'auto' }}>
                    {messages.map(message => <Message key={message.id} user={message.from.username} message={message.text} createdAt={moment(message.createdAt).format("HH:mm")} />
                    )}
                </div>
                <div style={{ marginTop: 'auto' }}>
                    <InputField onSubmit={(input) => this.sendMessage(input)} />
                </div>
            </Row>

        );
    }
}

// const createMessageMutation = graphql(mutation, {
//   props: ({ mutate }) => ({
//     createMessage: ({ text, userId, groupId }) =>
//       mutate({
//         variables: { text, userId, groupId },
//         optimisticResponse: {
//             __typename:'Mutation',
//             createMessage: {
//                 __typename: 'Message',
//                 createdAt: new Date().toISOString(),
//                 id: -1,
//                 text: messame,

//             }
//         }
//       }),
//   }),
// });

const createMessageMutation = graphql(mutation);

const groupQuery = graphql(query, {
    options: props => ({
        variables: {
            groupId: props.match.params.chat,
        },
    })
});


export default compose(groupQuery, createMessageMutation)(Chat);

