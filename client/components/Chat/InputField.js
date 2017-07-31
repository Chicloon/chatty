import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { graphql, compose } from 'react-apollo';

import { Row, Col, Button, Input } from 'antd';

class InputField extends Component {

  handleInput() {
    const message = this.message.refs.input.value    
    this.message.refs.input.value = '';
    this.props.onSubmit(message);
  }

  render() {
    return (      
        <Row gutter={16}>
          <Col span={20} >
            <Input autoFocus ref={(input)=> this.message = input} onPressEnter={()=>this.handleInput()}/>
          </Col>
          <Col span={4}>
            <Button style={{ width: '100%' }} onClick={()=>this.handleInput()}> Send  </Button>
          </Col>
        </Row>
    );
  }
}

export default InputField;
