import React, { Component } from "react";
import _ from 'lodash';
import { inject, observer } from "mobx-react";
import { graphql, compose, withApollo } from 'react-apollo';

import { Button, Row } from 'antd';

import moment from 'moment';
moment.locale('ru');

import ChatMessages from '../../queries/ChatMessages';
import chatName from '../../queries/ChatName';
import mutation from '../../mutations/SendMessage';

import messageAdded from '../../subscriptions/messageAdded';

import Message from './Message';
import SendMessageForm from './SendMessageForm';



class Chat extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.appState;
        this.chatId = this.props.match.params.chat;
    }

    componentWillMount() {
        // console.log(this.props);
        this.props.messages.subscribeToMore({
            document: messageAdded,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                const newMessage = subscriptionData.data.messageAdded;

                return {
                    ...prev,
                    messages: _.sortBy([{ ...newMessage }, ...prev.messages], 'createdAt')
                }
            }

        })
    }

    componentDidUpdate() {
        if (!this.props.messages.loading) {
            this.scrollToBottom();
        }
    }

    submitMessage = (event) => {
        if (event.charCode == 13) {
            const content = event.target.value;

            this.props.mutate({
                variables: {
                    chatId: this.chatId,
                    content,
                },
                // optimisticResponse: {
                //     __typename: 'Mutation',
                //     addMessage: {
                //         __typename: 'MessageType',
                //         content,
                //         id: -1,
                //         user: {
                //             __typename: 'UserType',
                //             id: this.user.id,
                //             username: this.user.username
                //         }
                //     }

                // },
                // refetchQueries: [{
                //     query: ChatMessages,
                //     variables: {
                //         id: this.chatId,
                //     },
                // }],
            })
                .then(event.target.value = '')
        }

    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }


    render() {
        console.log('---Chat props', this.props);

        if (this.props.chatData.loading || this.props.messages.loading) {
            return <div> ....loading </div>
        }
        const messages = this.props.messages.messages;
        const chatName = this.props.chatData.chat.name;
        console.log(moment("2017-08-28T04:51:59.242Z").format("HH:mm:ss"));
        return (
            <div
                style={{
                    display: 'flex',
                    height: '88vh',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                <div >
                    <h3 style={{ textAlign: 'center', marginBottom: '12px', background: '#fff' }}> {chatName} </h3>
                    <div ref={(div) => {
                        this.messageList = div;
                    }}

                        style={{
                            height: '95%',
                            overflowX: 'hidden',
                            overflowY: 'scroll'
                        }} >
                        {messages.map(message => <Message key={message.id} user={message.user.username} message={message.content} createdAt={moment(message.createdAt).format("HH:mm:ss")} />
                        )}
                        <p> chat's ID {this.chatId} </p>
                    </div>
                </div>
                <div
                    style={{
                        alignSelf: 'flex-start',
                        width: '100%'
                    }}>
                    {/* <SendMessageForm onSubmit={this.submitMessage}/>                     */}
                    <input autoFocus onKeyPress={this.submitMessage} style={{ width: '100%' }} />
                </div>
            </div>
        );
    }
}
const messageMutation = graphql(mutation);
// const messageSubscription = graphql(MessageAdded);
const groupQuery = graphql(ChatMessages, {
    options: props => ({
        variables: {
            id: props.match.params.chat,
        },
    }),
    name: 'messages'
});
const chatQuery = graphql(chatName, {
    options: props => ({
        variables: {
            id: props.match.params.chat,
        },
    }),
    name: 'chatData'
});
export default compose(groupQuery,
    chatQuery,
    messageMutation)(Chat);