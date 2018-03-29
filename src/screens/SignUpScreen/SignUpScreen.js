import React, { Component } from 'react';
import { Button, SafeAreaView, Text, TextInput, View, ActivityIndicator } from 'react-native';
import t from 'tcomb-form-native';
import commonStyles from '../common/CommonScreenStyle';

const Form = t.form.Form;

const User = t.struct({
    first_name: t.String,
    last_name: t.String,
    email: t.String,
    password: t.String,
    username: t.maybe(t.String)
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
        },
        username: {
            hidden: true
        }
    },
};

export default class SignUpScreen extends Component {
    state = {
        user: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            username: ''
        },
        error:'',
        isLoading: false
    };

    async componentDidMount() {
    }

    onChange = (value) => {
        this.setState({user: value});
    };

    handleSubmit = () => {
        const value = this._form.getValue();
        if (value) { // if validation fails, value will be null

            // Future support for username
            let withUsername = {...this.state.user};
            withUsername.username = value.email;

            this.setState({isLoading: true});
            fetch('http://127.0.0.1:8000/userprofiles/create/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(withUsername),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({isLoading: false});
                    if (responseJson.success){
                        // TODO login
                        this.setState({ user: null });
                    } else {
                        let message = "";
                        for (let error in responseJson.errors){
                            message += error +" : " + responseJson.errors[error][0] + "\n";
                        }
                        this.setState({error: message});
                    }
                })
                .catch((error) => {
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
                        value={this.state.user}
                        onChange={this.onChange}
                        options={options}
                        type={User} />
                    <Button onPress={this.handleSubmit} title="Sign Up"/>
                    <View style={commonStyles.error}>
                        <Text style={commonStyles.errorText}>{this.state.error}</Text>
                        <ActivityIndicator animating={this.state.isLoading}/>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}