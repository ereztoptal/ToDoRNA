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

export const REMOVE_LIST_ITEM = 'REMOVE_LIST_ITEM';
export const REMOVE_LIST_ITEM_SUCCESS = 'REMOVE_LIST_ITEM_SUCCESS';
export const REMOVE_LIST_ITEM_FAILURE = 'REMOVE_LIST_ITEM_FAILURE';
export const removeListItem = (list, item) => ({ type: REMOVE_LIST_ITEM, list, item });

export const GET_LIST_ITEMS = 'GET_LIST_ITEMS';
export const GET_LIST_ITEMS_SUCCESS = 'GET_LIST_ITEMS_SUCCESS';
export const GET_LIST_ITEMS_FAILURE = 'GET_LIST_ITEMS_FAILURE';
export const getListItemsApiCall = (todoList) => ({ type: GET_LIST_ITEMS, todoList });

const lists = (state = INITIAL_TODO_LISTS_STATE, action) => {
	switch (action.type) {
		case ADD_LIST:
			return {
				...state,
				todoLists: [...state.todoLists, action.todoList]
			};
		case REMOVE_LIST:
			return {
				...state,
				todoLists: state.todoLists.filter(todoList => todoList !== action.todoList)
			};
		case GET_TODO_LISTS_API_CALL_SUCCESS:
			return {
				...state,
				todoLists: action.data
			};
		case ADD_LIST_SUCCESS:
			for (let i in state.todoLists){
                if (state.todoLists[i].title == action.data.title &&
                    !state.todoLists[i].uuid){
					state.todoLists[i].uuid = action.data.uuid;
                }
            }
			return state;
		case ADD_LIST_ITEM:
			for (let i in state.todoLists){
                if (state.todoLists[i].uuid == action.list.uuid){
                	if (!state.todoLists[i].items){
                		state.todoLists[i].items = [];
					}
					state.todoLists[i].items.push(action.item);
                }
            }
			return {
				...state,
				todoLists: state.todoLists
			};
		case REMOVE_LIST_ITEM:
			for (let i in state.todoLists){
                if (state.todoLists[i].uuid == action.list.uuid){
					state.todoLists[i].items = state.todoLists[i].items.filter(item => item !== action.item);
                }
            }
			return state;
		case GET_LIST_ITEMS_SUCCESS:
			for (let i in state.todoLists){
                if (action.data && action.data.length > 0 &&
					state.todoLists[i].uuid == action.data[0].todo_list){
					state.todoLists[i].items = action.data;
                }
            }
			return state;
		default:
			return state;
	}
};

const appReducer = combineReducers({
    account,
	lists
});

export default configureStore(appReducer, rootSaga);
