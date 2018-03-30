import React, { Component } from 'react';
import { Button, SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import t from 'tcomb-form-native';
import {login} from '../../services'
import {setToken} from '../../redux'
import { connect } from 'react-redux';

import commonStyles from '../common/CommonScreenStyle';

const Form = t.form.Form;

const User = t.struct({
    email: t.String,
    password: t.String,
});

const options = {
    fields: {
        email: {
            autoCapitalize: 'none',
            error: 'Please add a valid email address'
        },
        password: {
            password: true,
            secureTextEntry: true,
            error: 'Please select a password'
        }
    },
};

class LoginScreen extends Component {

    state = {
        user: {
            email: '',
            password: ''
        },
        error:'',
        isLoading: false

    };

    onChange = (value) => {
        this.setState({user: value});
    };

    handleSubmit = () => {
        let self = this;
        const value = this._form.getValue(); // use that ref to get the form value
        if (value) {
            this.setState({isLoading: true});
            login(this.state.user.email, this.state.user.password)
                .then(function (token) {
                    self.props.setToken(token);
                }).catch((error) => {
                this.setState({isLoading: false});
                this.setState({error: error});
            });
        }
    };

    render() {
        return (
            <SafeAreaView style={commonStyles.container}>
                <View>
                    <Text style={commonStyles.title}>ToDo BOM</Text>
                </View>
                <View style={commonStyles.form}>
                    <Form
                        ref={c => this._form = c}
                        options={options}
                        value={this.state.user}
                        onChange={this.onChange}
                        type={User} />
                    <Button onPress={this.handleSubmit} title="Login"/>
                    <View style={commonStyles.error}>
                        <Text style={commonStyles.errorText}>{this.state.error}</Text>
                        <ActivityIndicator animating={this.state.isLoading}/>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default connect(state => state.account, { setToken })(LoginScreen);