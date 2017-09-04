import React, { Component } from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.props.onSubmit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem style={{ minHeight: '0' }}>
          {getFieldDecorator('chatName', {
            initialValue:'' ,
            rules: [{ required: true, message: 'Please input chat name!' }],
          })(
            <Input autoComplete='off' autoFocus prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Chat Name" />
            )}
        </FormItem>

        {(this.props.errors !== []) ?
          <FormItem> {this.props.errors.map(error => <div key={error}> {error} </div>)} </FormItem> : ''
        }
        <FormItem >
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Create chat
          </Button>
        </FormItem >
      </Form>
    );
  }
}

const WrappedForm = Form.create()(NormalForm);

export default WrappedForm
