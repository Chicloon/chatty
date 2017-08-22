import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { graphql, compose } from 'react-apollo';

import { Button, Row } from 'antd';

import moment from 'moment';
moment.locale('ru');

import query from '../../queries/ChatMessages';
import mutation from '../../mutations/SendMessage';

import Message from './Message';
import SendMessageForm from './SendMessageForm';



class Chat extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.appState;
    }


    submitMessage =(event) => {
        if(event.charCode==13){
            console.log(event.value);    
            console.log(event.target.value);
            event.target.value = '';
    }
     
    }

    render() {
        console.log('---Chat props', this.props);

        if (this.props.data.loading) {
            return <div> ....loading </div>
        }
        const messages = this.props.data.chat.messages;

        return (
            <div
                style={{
                    display: 'flex',
                    height: '88vh',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                <div>
                    <h3 style={{ textAlign: 'center', marginBottom: '12px', background: '#fff' }}> {this.props.data.chat.name} </h3>
                    <div>
                        {messages.map(message => <Message key={message.id} user={message.user.username} message={message.content} createdAt={moment(message.createdAt).format("HH:mm")} />
                        )}
                        <p> chat's ID {this.props.match.params.chat} </p>
                    </div>
                </div>
                <div
                    style={{
                        alignSelf: 'flex-start',
                        width: '100%'
                    }}>
                    {/* <SendMessageForm onSubmit={this.submitMessage}/>                     */}
                    <input onKeyPress={this.submitMessage} style={{width: '100%'}}/>
                </div>

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

