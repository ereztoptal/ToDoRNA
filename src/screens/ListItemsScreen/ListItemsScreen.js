import React, { Component } from 'react';
import { Button, SafeAreaView, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {getListItemsApiCall, removeListItem} from '../../redux'
import { connect } from 'react-redux';
import Icon from '../../components/Icon';

let list = null;

class ListItemsScreen extends Component{
    state = {
        searchFilter: ""
    };

    navigateToAddItem = (list, item) => () => {
        this.props.navigation.navigate('AddNewListItem', {list, item})
    };

    async componentDidMount() {
        this.props.getListItemsApiCall(this.getList());
    }

    removeItem = (item) => {
        this.props.removeListItem(this.getList(), item);
    };

    getListIndex = () =>{
        return this.props.navigation.state.params.listIndex;
    };

    getList = () => {
        return this.props.todoLists[this.getListIndex()];
    };

    itemsSearchFilter = (item) => {
        if (item.title.indexOf(this.state.searchFilter) != -1 ||
            item.description.indexOf(this.state.searchFilter) != -1){
            return item;
        }
    };

    render(){
        return(
            <SafeAreaView style={{ flex: 1, width: '100%', backgroundColor: 'white' }} >
                <View>
                    <TextInput placeholder="Search..."
                               onChangeText={(text) => this.setState({searchFilter:text})}
                               style={{ fontSize: 20, padding:10, paddingHorizontal: 40 }}/>
                </View>
                <View style={{ flex: 0.95}}>
                    <ScrollView>
                        {this.getList().items &&
                        this.getList().items.filter(this.itemsSearchFilter).map((item, index) => (
                            <View style={{
                                padding: 10,
                                paddingHorizontal: 40,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }} key={index}>
                                <TouchableOpacity onPress={this.navigateToAddItem(this.getList(),item)}>
                                    <Text style={{ fontSize: 20, color: '#1679bf' }}>{item.title}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.removeItem(item)}>
                                    <Icon nameIos='ios-remove-circle-outline' nameAndroid='remove' size={20} />
                                </TouchableOpacity>

                            </View>
                        ))}
                    </ScrollView>
                </View>
                <Button onPress={this.navigateToAddItem(this.getList(), null)} title="Add"/>
            </SafeAreaView>
        )
    }
}

export default connect(state => state.lists, {getListItemsApiCall, removeListItem})(ListItemsScreen);