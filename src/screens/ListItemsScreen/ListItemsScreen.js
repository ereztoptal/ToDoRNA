import React, { Component } from 'react';
import { Button, SafeAreaView, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import {getListItemsApiCall, removeListItem} from '../../redux'
import { connect } from 'react-redux';
import commonStyles from '../common/CommonScreenStyle'
import Icon from '../../components/Icon';

let list = null;

class ListItemsScreen extends Component{
    navigateToAddItem = (list) => () => {
        this.props.navigation.navigate('AddNewListItem', {list})
    };

    async componentDidMount() {
        this.props.getListItemsApiCall(this.getList());
    }

    removeItem = (item) => {
        this.props.removeListItem(this.getList(), item);
    };

    getList = () => {
        return this.props.todoLists[this.props.navigation.state.params.listIndex];
    };

    getListIndex = () =>{
        return this.props.navigation.state.params.listIndex;
    };

    render(){
        return(
            <SafeAreaView style={{ flex: 1, width: '100%', backgroundColor: 'white' }}>
                {this.props.todoLists[this.getListIndex()].items && this.props.todoLists[this.getListIndex()].items.map((item, index) => (
                    <View style={{
                        padding: 10,
                        paddingHorizontal: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }} key={index}>
                        <TouchableOpacity onPress={() => this.removeItem(item)}>
                            <Text style={{ fontSize: 20, color: '#1679bf' }}>{item.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.removeItem(item)}>
                            <Icon nameIos='ios-remove-circle-outline' nameAndroid='remove' size={20} />
                        </TouchableOpacity>
                    </View>
                ))}
                <View>
                    <Button onPress={this.navigateToAddItem(this.getList())} title="Add"/>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(state => state.lists, {getListItemsApiCall, removeListItem})(ListItemsScreen);