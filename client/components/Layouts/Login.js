import React, { Component } from 'react';

import { Row, Col } from 'antd';

import LoginForm from './LoginForm';
import SignupFrom from './SignupForm';

class Login extends Component {

  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={10}>
            <h3 style={{ textAlign: 'center' }}>Необходима Авторизация.  </h3>
            <div style={{ height: '1px', marginTop: '12px' }}>
              <LoginForm />
            </div>

          </Col>

        </Row>        
      </div>

    )
  }

}

export default Login
