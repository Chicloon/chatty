import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Route, Link } from "react-router-dom";

// import c from '../';

@inject("store")
class Home extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
    }

    render() {
        const store = this.store;
        return (

            <div>
                {store.test}
                Main Layout
            </div>

        );

    }
}

export default Home;

/*
    <c.TopBar />
        <Route
            exact
            path="/"
            component={c.Home}
        />
        <Route
            exact
            path="/posts"
            component={c.SubPage}
        />
        <Route
            exact
            path="/posts/:id"
            component={c.SubItem}
        />
        <Route
            exact
            path="/login"
            component={c.Login.Login}
        />
*/