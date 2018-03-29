import React, { Component } from 'react';
import { Button, SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {addListItem} from '../../redux'
import { connect } from 'react-redux';
import commonStyles from '../common/CommonScreenStyle'
import t from 'tcomb-form-native';

const Form = t.form.Form;

const NewItem = t.struct({
    title: t.String
});

const options = {
    fields: {
        title: {
            error: 'Please enter a name for your list'
        }
    },
};

class AddNewListItemScreen extends Component{

    state = {
        newItem: {
            title: ''
        }
    };

    onChange = (value) => {
        this.setState({newItem: value});
    };

    addListItem = () => {
        this.props.addListItem(this.props.navigation.state.params.list, this.state.newItem);
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
                        type={NewItem} />
                    <Button onPress={this.addListItem} title="Create Task"/>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(state => state.lists, {addListItem})(AddNewListItemScreen);