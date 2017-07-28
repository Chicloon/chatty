import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Route, Link } from "react-router-dom";

// import c from '../';

@inject(["appState"])
class Group extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.appState;
    }

    render() {
        const store = this.store;        
        return (
            <div>
                 <div> {store.test}  </div>
                Main Layout
                 <p> Вы находитесь на странице {this.props.location.pathname} </p> 
            </div>
        );
    }
}

export default Group;
