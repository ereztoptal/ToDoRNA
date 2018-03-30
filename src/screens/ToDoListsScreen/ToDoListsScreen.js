import React, { Component } from 'react';
import { Button, SafeAreaView, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {getTodoListsApiCall, removeList} from '../../redux'
import { connect } from 'react-redux';
import Icon from '../../components/Icon';

class ToDoListsScreen extends Component{
    navigateToAddList = () => () => this.props.navigation.navigate('AddNewList');
    navigateToList = (listIndex) => () => {
        this.props.navigation.navigate('ListInfo', {
            listIndex,
            title:this.props.todoLists[listIndex].title
        });
    };

    async componentDidMount() {
        this.props.getTodoListsApiCall();
    }

    removeToDoList = (todoList) => {
        this.props.removeList(todoList);
    };

    render(){
        return(
            <SafeAreaView style={{ flex: 1, width: '100%', backgroundColor: 'white' }}>
                <View style={{ flex: 0.95}}>
                    <ScrollView>
                        {this.props.todoLists && this.props.todoLists.map((todoList, index) => (
                            <View style={{
                                padding: 10,
                                paddingHorizontal: 40,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }} key={index}>
                                <TouchableOpacity onPress={this.navigateToList(index)}>
                                    <Text style={{ fontSize: 20, color: '#1679bf' }}>{todoList.title}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.removeToDoList(todoList)}>
                                    <Icon nameIos='ios-remove-circle-outline' nameAndroid='remove' size={20} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <Button onPress={this.navigateToAddList()} title="Add"/>
            </SafeAreaView>
        )
    }
}

export default connect(state => state.lists, {getTodoListsApiCall, removeList})(ToDoListsScreen);