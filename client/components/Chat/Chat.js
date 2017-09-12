import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import { Button, Row } from 'antd';

import moment from 'moment';
moment.locale('ru');

import {ChatMessages} from '../../queries/chatQueries';

import {SendMessage} from '../../mutations/messageMutations';

import messageAdded from '../../subscriptions/messageAdded';

import Message from './Message';
// import SendMessageForm from './SendMessageForm';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.appState;
        this.chatId = this.props.match.params.chat;        
    }

    componentWillMount() {
        
        this.props.chatData.subscribeToMore({
            document: messageAdded,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }
                const newMessage = subscriptionData.data.messageAdded;
                const messages = prev.chat.messages ? _.sortBy([newMessage, ...prev.chat.messages],'createdAt') : newMessage;
                const res = {
                    ...prev,
                    chat: {
                        ...prev.chat,                
                        messages,
                    },
                };                
                return res
            }
        })
    }

    componentDidUpdate() {
        if (!this.props.chatData.loading) {
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
                }              
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
        // console.log('---Chat props', this.props);

        if (this.props.chatData.loading) {
            return <div> ....loading </div>
        }
        const messages = this.props.chatData.chat.messages;
        const chatName = this.props.chatData.chat.name;
        // this.user = this.props.userData.user;
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
                            height: '94%',
                            overflowX: 'hidden',
                            overflowY: 'scroll'
                        }} >
                        {messages.map(message => <Message key={message.id} user={message.user.username} message={message.content} createdAt={moment(message.createdAt).format("HH:mm")} />
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

const messageMutation = graphql(SendMessage);
// const messageSubscription = graphql(MessageAdded);

const groupQuery = graphql(ChatMessages, {
    options: props => ({
        variables: {
            id: props.match.params.chat,
        },
    }),
    name: 'chatData'
});

// const userQuery = graphql(CurrentUser, { name: 'userData' });

export default compose(groupQuery,
    // userQuery,
    messageMutation)(Chat);

