import React, { Component } from 'react';
import { Button, SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {addList} from '../../redux'
import { connect } from 'react-redux';
import commonStyles from '../common/CommonScreenStyle'
import t from 'tcomb-form-native';

const Form = t.form.Form;

const NewList = t.struct({
    title: t.String
});

const options = {
    fields: {
        title: {
            error: 'Please enter a name for your list'
        }
    },
};

class AddNewListScreen extends Component{

    state = {
        newList: {
            title: ''
        }
    };

    onChange = (value) => {
        this.setState({newList: value});
    };

    addList = () => {
        this.props.addList(this.state.newList);
        this.props.navigation.dispatch(NavigationActions.back());
    };

    render(){
        return(
            <SafeAreaView style={{flex: 1}}>
                <View style={commonStyles.form}>
                    <Form
                        ref={c => this._form = c}
                        options={options}
                        value={this.state.title}
                        onChange={this.onChange}
                        type={NewList} />
                    <Button onPress={this.addList} title="Create List"/>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(state => state.lists, {addList})(AddNewListScreen);