import React from 'react';
import { Animated } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import LoginScreen from "../screens/LoginScreen/LoginScreen"
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen"
import ToDoListsScreen from "../screens/ToDoListsScreen/ToDoListsScreen"
import AddNewListScreen from "../screens/ToDoListsScreen/AddNewListScreen"
import ListItemsScreen from "../screens/ListItemsScreen/ListItemsScreen"
import AddNewListItemScreen from "../screens/ListItemsScreen/AddNewListItemScreen"
import Icon from '../components/Icon';

export const LoginNavigator = TabNavigator({
	LoginScreen: {
		screen: LoginScreen,
		navigationOptions: {
			tabBarLabel: 'Login',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon
					nameAndroid={focused ? 'login' : 'login'}
					nameIos={focused ? 'ios-log-in' : 'ios-log-in-outline'}
					size={26}
					style={{ color: tintColor }}
				/>
			)
		}
	},
	SignUpScreen: {
		screen: SignUpScreen,
		navigationOptions: {
			tabBarLabel: 'Sign Up',
			tabBarIcon: ({ tintColor, focused }) => (
				<Icon
					nameAndroid={focused ? 'add' : 'add-circle-outline'}
					nameIos={focused ? 'ios-add' : 'ios-add-circle-outline'}
					size={26}
					style={{ color: tintColor }}
				/>
			)
		}
	}
}, {
	initialRouteName: 'LoginScreen',
	animationEnabled: true,
	tabBarPosition: 'bottom',
	configureTransition: () => ({
		timing: Animated.spring,
		tension: 1,
		friction: 25
	}),
	swipeEnabled: true,
	activeTintColor: 'red'
});

export const ListNavigator = StackNavigator({
	MainList: {
		screen: ToDoListsScreen,
		navigationOptions: () => ({
			title: 'ToDo Lists'
		})
	},
	AddNewList: {
		screen: AddNewListScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Add New ToDo List'
		})
	},
	ListInfo:{
		screen: ListItemsScreen,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.title}'s Tasks`
		})
	},
	AddNewListItem:{
		screen: AddNewListItemScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Add New Task'
		})
	}
}, {
	initialRouteName: 'MainList',
	navigationOptions: {
		headerStyle: {
			backgroundColor: 'white'
		}
	}
});