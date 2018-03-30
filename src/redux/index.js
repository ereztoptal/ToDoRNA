import { combineReducers } from 'redux';
import configureStore from './configureStore';
import rootSaga from '../saga';

const SET_TOKEN = 'SET_TOKEN';

export const setToken = (token) => ({ type: SET_TOKEN, token });

export const INITIAL_ACCOUNT_STATE = {
	user: {},
	token: ""
};


const account = (state = INITIAL_ACCOUNT_STATE, action) => {
	switch (action.type) {
		case SET_TOKEN:
			return {
				...state,
                token: action.token
			};
		default:
			return state;
	}
};

export const INITIAL_TODO_LISTS_STATE = {
	todoLists: [],
};

export const ADD_LIST = 'ADD_LIST';
export const ADD_LIST_SUCCESS = 'ADD_LIST_SUCCESS';
export const ADD_LIST_FAILURE = 'ADD_LIST_FAILURE';
export const addList = (todoList) => ({ type: ADD_LIST, todoList });

export const REMOVE_LIST = 'REMOVE_LIST';
export const REMOVE_LIST_SUCCESS = 'REMOVE_LIST_SUCCESS';
export const REMOVE_LIST_FAILURE = 'REMOVE_LIST_FAILURE';
export const removeList = (todoList) => ({ type: REMOVE_LIST, todoList });

export const GET_TODO_LISTS_API_CALL = 'GET_TODO_LISTS_API_CALL';
export const GET_TODO_LISTS_API_CALL_SUCCESS = 'GET_TODO_LISTS_API_CALL_SUCCESS';
export const GET_TODO_LISTS_API_CALL_FAILURE = 'GET_TODO_LISTS_API_CALL_FAILURE';
export const getTodoListsApiCall = () => ({ type: GET_TODO_LISTS_API_CALL });

export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
export const ADD_LIST_ITEM_SUCCESS = 'ADD_LIST_ITEM_SUCCESS';
export const ADD_LIST_ITEM_FAILURE = 'ADD_LIST_ITEM_FAILURE';
export const addListItem = (list, item) => ({ type: ADD_LIST_ITEM, list, item });

export const UPDATE_LIST_ITEM = 'UPDATE_LIST_ITEM';
export const UPDATE_LIST_ITEM_SUCCESS = 'UPDATE_LIST_ITEM_SUCCESS';
export const UPDATE_LIST_ITEM_FAILURE = 'UPDATE_LIST_ITEM_FAILURE';
export const updateListItem = (list, item) => ({ type: UPDATE_LIST_ITEM, list, item });

export const REMOVE_LIST_ITEM = 'REMOVE_LIST_ITEM';
export const REMOVE_LIST_ITEM_SUCCESS = 'REMOVE_LIST_ITEM_SUCCESS';
export const REMOVE_LIST_ITEM_FAILURE = 'REMOVE_LIST_ITEM_FAILURE';
export const removeListItem = (list, item) => ({ type: REMOVE_LIST_ITEM, list, item });

export const GET_LIST_ITEMS = 'GET_LIST_ITEMS';
export const GET_LIST_ITEMS_SUCCESS = 'GET_LIST_ITEMS_SUCCESS';
export const GET_LIST_ITEMS_FAILURE = 'GET_LIST_ITEMS_FAILURE';
export const getListItemsApiCall = (todoList) => ({ type: GET_LIST_ITEMS, todoList });

const lists = (state = INITIAL_TODO_LISTS_STATE, action) => {
	let updateIndex = -1;
	let newList = {};

    const replaceFilter  = (item, index) => {
        if (index === updateIndex){
            return newList;
        } else{
            return item
        }
    };
	switch (action.type) {
		case ADD_LIST:
			return {
				...state,
				todoLists: [...state.todoLists, action.todoList]
			};
			break;
		case REMOVE_LIST:
			return {
				...state,
				todoLists: state.todoLists.filter(todoList => todoList !== action.todoList)
			};
			break;
		case GET_TODO_LISTS_API_CALL_SUCCESS:
			return {
				...state,
				todoLists: action.data
			};
			break;
		case ADD_LIST_SUCCESS:
			for (let i=0; i<state.todoLists.length; i++){
                if (state.todoLists[i].title == action.data.title &&
                    !state.todoLists[i].uuid){
					state.todoLists[i].uuid = action.data.uuid;
                }
            }
			return state;
			break;
		case ADD_LIST_ITEM:
			newList = {};
			for (let i=0; i<state.todoLists.length; i++){
                if (state.todoLists[i].uuid == action.list.uuid){
                	newList.items = state.todoLists[i].items;
                	newList.uuid = state.todoLists[i].uuid;
					newList.title = state.todoLists[i].title;
                	if (!newList.items){
                		newList.items = [];
					}
					newList.items.push(action.item);
                	updateIndex = i;
                }
            }
			return {
				...state,
				todoLists: state.todoLists.filter(replaceFilter)
			};
			break;
		case ADD_LIST_ITEM_SUCCESS:
			for (let i=0; i<state.todoLists.length; i++){
                if (state.todoLists[i].uuid == action.data.todo_list){
                	for (let j=0; j<state.todoLists[i].items.length; j++){
                		if (state.todoLists[i].items[j].title == action.data.title){
                			state.todoLists[i].items[j].uuid = action.data.uuid;
						}
					}
                }
            }
			return state;
			break;
		case UPDATE_LIST_ITEM:
			newList = {};
			for (let i=0; i<state.todoLists.length; i++){
                if (state.todoLists[i].uuid == action.list.uuid){
                	newList.items = state.todoLists[i].items;
                	newList.uuid = state.todoLists[i].uuid;
					newList.title = state.todoLists[i].title;
                	for (let j=0; j<newList.items.length; j++){
                		if (newList.items[j].uuid == action.item.uuid){
                			newList.items[j] = action.item;
						}
					}
                	updateIndex = i;
                }
            }
			return {
				...state,
				todoLists: state.todoLists.filter(replaceFilter)
			};
			break;
		case REMOVE_LIST_ITEM:
			newList = {};
			for (let i=0; i<state.todoLists.length; i++){
				let itemIndex = -1;
                if (state.todoLists[i].uuid == action.list.uuid){
                	updateIndex = i;
                	newList.uuid = state.todoLists[i].uuid;
					newList.title = state.todoLists[i].title;
					for (let j=0; j<state.todoLists[i].items.length; j++){
                		if (state.todoLists[i].items[j] == action.item){
                			itemIndex = j
						}
					}
					state.todoLists[i].items.splice(itemIndex, 1);
					newList.items = state.todoLists[i].items;
                }
            }
			return {
				...state,
				todoLists: state.todoLists.filter(replaceFilter)
			};
			break;
		case GET_LIST_ITEMS_SUCCESS:
			newList = {};
			for (let i=0; i<state.todoLists.length; i++){
                if (action.data && action.data.length > 0 &&
					state.todoLists[i].uuid == action.data[0].todo_list){
                	updateIndex = i;
					newList.items = action.data;
					newList.uuid = state.todoLists[i].uuid;
					newList.title = state.todoLists[i].title;
                }
            }
			return {
				...state,
				todoLists: state.todoLists.filter(replaceFilter)
			};
			break;
		default:
			return state;
	}
};

const appReducer = combineReducers({
    account,
	lists
});

export default configureStore(appReducer, rootSaga);
