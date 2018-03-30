import React, { Component } from 'react';
import { Button, SafeAreaView, Text, View, Modal, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {addListItem, updateListItem} from '../../redux'
import { connect } from 'react-redux';
import commonStyles from '../common/CommonScreenStyle'
import t from 'tcomb-form-native';
import ImagePicker from 'react-native-image-picker'
import Contacts from 'react-native-contacts'
import Share, {ShareSheet, Button as ShareButton} from 'react-native-share';
import Icon from '../../components/Icon';

const Form = t.form.Form;

const NewItem = t.struct({
    title: t.String,
    description: t.String
});

const options = {
    fields: {
        title: {
            error: 'Please enter a name for your list'
        },
        description: {
            multiline: true,
            stylesheet: {
                ...Form.stylesheet,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: 100
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: 100
                    }
                }
            }
        }
    }
};

const imagePickerOptions = {
    title: 'Select Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


class AddNewListItemScreen extends Component{

    state = {
        newItem: {
            title: '',
            description: '',
            contact: {},
            photo: {uri: 'data:image/png;base64'}
        },
        showContactList: false,
        contacts: []
    };

    async componentDidMount() {
        if (this.props.navigation.state.params.item){
            this.setState({newItem: this.props.navigation.state.params.item});
        }
    }

    onChange = (value) => {
        let item = {...this.state.newItem};
        item.title = value.title;
        item.description = value.description;
        this.setState({newItem: item});
    };

    addOrUpdateListItem = () => {
        if (this.state.newItem.uuid){
            this.props.updateListItem(this.props.navigation.state.params.list, this.state.newItem);
        }else {
            this.props.addListItem(this.props.navigation.state.params.list, this.state.newItem);
        }
        this.props.navigation.dispatch(NavigationActions.back());
    };

    addContact = () => {
        Contacts.getAll((err, contacts) => {
            if(err === 'denied'){
                // error
            } else {
                this.setState({
                    contacts: contacts
                });
            }
        });
        this.setState({
            showContactList: true
        });

    };

    addPhoto = () => {
        ImagePicker.showImagePicker(imagePickerOptions, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                let item = {...this.state.newItem};
                item.photo = source;
                this.setState({
                    newItem: item
                });
            }
        });
    };

    getCreateOrUpdateName = () => {
        if (this.state.newItem.uuid){
            return "Update Task";
        }
        else {
            return "Create Task";
        }
    };

    getAddOrUpdateContact = () => {
        if (this.state.newItem.contact.recordID){
            return "Change Contact";
        }
        else {
            return "Add Contact";
        }
    };

    getShareMessage = () => {
        let message = "Task: {task}\nDescription: {description}\n"
            .replace('{task}', this.state.newItem.title)
            .replace('{description}', this.state.newItem.description);
        if (this.state.newItem.contact.recordID){
            message += "Contact Information:\nName: {name}\nEmail: {email}"
                .replace('{name}', this.state.newItem.contact.givenName +" "+this.state.newItem.contact.familyName)
                .replace('{email}', this.state.newItem.contact.emailAddresses[0].email);
        }
        return message;
    };

    render(){
        let shareOptions = {
            title: "ToDo task",
            message: this.getShareMessage(),
            subject: "Share ToDo Task"
        };
        return(
            <SafeAreaView style={{flex: 1}}>
                <View style={commonStyles.form}>
                    <TouchableOpacity onPress={()=>{Share.open(shareOptions).catch((err) => { err && console.log(err); })}}>
                        <Icon style={{alignSelf: 'flex-end'}} nameIos='ios-share-outline' nameAndroid='share' size={20} />
                    </TouchableOpacity>
                    <Form
                        ref={c => this._form = c}
                        options={options}
                        value={this.state.newItem}
                        onChange={this.onChange}
                        type={NewItem} />
                    <View style={{flexDirection:'row', paddingBottom: 10}}>
                        <Text style={{ fontSize: 18 }}>Contact: </Text>
                        <Text style={{ fontSize: 18, color: '#1679bf' }}>{this.state.newItem.contact.givenName} {this.state.newItem.contact.familyName}</Text>
                    </View>
                    <Image source={this.state.newItem.photo} style={{flex: 1}} />
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <Button onPress={this.addContact} title={this.getAddOrUpdateContact()}/>
                        <Button onPress={this.addPhoto} title="Select Photo"/>
                    </View>
                    <Button onPress={this.addOrUpdateListItem} title={this.getCreateOrUpdateName()}/>
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showContactList}
                    onRequestClose={() => {}}>
                    <View style={{marginTop: 22}}>
                        <View>
                            {this.state.contacts.map((contact, index) => (
                                <View style={{
                                    padding: 10,
                                    paddingHorizontal: 40,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }} key={index}>
                                    <TouchableOpacity onPress={() => {
                                        let item = {...this.state.newItem};
                                        item.contact = contact;
                                        this.setState({
                                            newItem: item,
                                            showContactList: false
                                        });
                                    }}>
                                        <Text style={{ fontSize: 20, color: '#1679bf' }}>
                                            {contact.givenName} {contact.familyName}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}

                            <Button title="Close"
                                    onPress={() => {
                                        this.setState({showContactList:false});
                                    }}>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}

export default connect(state => state.lists, {addListItem, updateListItem})(AddNewListItemScreen);