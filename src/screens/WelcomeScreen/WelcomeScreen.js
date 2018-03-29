import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginNavigator, ListNavigator } from '../../navigators';
import {setToken} from "../../services/index";

class WelcomeScreen extends Component {

    render() {
        if (this.props.token){
            setToken(this.props.token);
            return(
                <ListNavigator />
            );
        }
        else {
            return (
                <LoginNavigator />
            );
        }
    }

}

export default connect(state => state.account, {})(WelcomeScreen);