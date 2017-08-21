import React, { Component } from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {      
        this.props.onSubmit(values.message);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (     
      <Form onSubmit={this.handleSubmit}>
        <FormItem style={{minHeight: '0'}}>       
        {getFieldDecorator('message', {
            rules: [{ required: true, message: 'Please input message!' }],
          })(
            <Input autoFocus placeholder="Message" 
            style={{width: '90%', marginRight: '12px'}}
            />                      
            )}   
          <Button type="primary" htmlType="submit">
            Send
          </Button>       
        </FormItem>        
      </Form>   
    );
  }
}

const SendMessageForm = Form.create()(NormalForm);

export default SendMessageForm
