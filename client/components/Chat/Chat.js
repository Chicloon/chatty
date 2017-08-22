import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { graphql, compose } from 'react-apollo';

import { Button, Row } from 'antd';

import moment from 'moment';
moment.locale('ru');

import ChatMessages from '../../queries/ChatMessages';
import CurrentUser from '../../queries/CurrentUser';
import mutation from '../../mutations/SendMessage';

import Message from './Message';
import SendMessageForm from './SendMessageForm';



class Chat extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.appState;
        this.chatId = this.props.match.params.chat;
        this.user = '';
    }

    componentDidUpdate() {
        if (!this.props.chatData.loading) {
            this.scrollToBottom();

        }
    }

    submitMessage = (event) => {
        if (event.charCode == 13) {
            const content = event.target.value;

            console.log(content);
            console.log(this.user);
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
                refetchQueries: [{
                    query: ChatMessages,
                    variables: {
                        id: this.chatId,
                    },
                }],
            })
                .then(event.target.value = '')

            // sendMessage(message) {
            //     this.props.mutate({
            //         variables: {
            //             text: message,
            //             userId: 1,
            //             groupId: this.props.match.params.chat
            //         },
            //         optimisticResponse: {
            //             __typename: 'Mutation',
            //             createMessage: {
            //                 __typename: 'Message',
            //                 createdAt: new Date().toISOString(),
            //                 id: -1,
            //                 text: message,
            //                 from: {
            //                     __typename: 'User',
            //                     id: 1,
            //                     username: 'Justyn.Kautzer',
            //                 },
            //                 to: {
            //                     __typename: 'Group',
            //                     id: this.props.match.params.chat
            //                 }
            //             }

            //         },
            //     })
            //         // .then(this.props.data.refetch())
            //         .catch((error)=> console.log('Smth happened', error));

            //     console.log('msg:', message);


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

        if (this.props.chatData.loading) {
            return <div> ....loading </div>
        }
        const messages = this.props.chatData.chat.messages;
        const chatName = this.props.chatData.chat.name;
        this.user = this.props.userData.user;
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

const messageMutation = graphql(mutation);

const groupQuery = graphql(ChatMessages, {
    options: props => ({
        variables: {
            id: props.match.params.chat,
        },
    }),
    name: 'chatData'
});

const userQuery = graphql(CurrentUser, { name: 'userData' });

export default compose(groupQuery, userQuery, messageMutation)(Chat);

