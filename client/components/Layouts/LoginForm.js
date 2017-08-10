import React, { Component } from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (     
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem style={{minHeight: '0'}}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input autoFocus prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
        </FormItem>
        <FormItem >          
          <Button type="primary" htmlType="submit" style={{width: '100%' }}>
            Log in
          </Button>       
         </FormItem >
      </Form>   
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm
