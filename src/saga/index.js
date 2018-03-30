import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../redux';
import {getTodoLists, addTodoList, removeTodoList, getListItems, addListItem, updateListItem, removeListItem} from '../services'

export function* todoListsApiCall() {
    try {
        const response = yield call(() => getTodoLists());
        const data = yield call(() => response);
        yield put({ type: Api.GET_TODO_LISTS_API_CALL_SUCCESS, data });
    } catch (err) {
        yield put({ type: Api.GET_TODO_LISTS_API_CALL_FAILURE });
    }
}

export function* addTodoListApiCall(todoList) {
    try {
        const response = yield call(() => addTodoList(todoList.todoList));
        const data = yield call(() => response);
        yield put({ type: Api.ADD_LIST_SUCCESS, data });
    } catch (err) {
        yield put({ type: Api.ADD_LIST_FAILURE });
    }
}

export function* removeTodoListApiCall(todoList) {
    try {
        const response = yield call(() => removeTodoList(todoList.todoList));
        const data = yield call(() => response);
        yield put({ type: Api.REMOVE_LIST_SUCCESS, data });
    } catch (err) {
        yield put({ type: Api.REMOVE_LIST_FAILURE });
    }
}

export function* listItemsApiCall(todoList) {
    try {
        const response = yield call(() => getListItems(todoList.todoList));
        const data = yield call(() => response);
        yield put({ type: Api.GET_LIST_ITEMS_SUCCESS, data });
    } catch (err) {
        yield put({ type: Api.GET_LIST_ITEMS_FAILURE });
    }
}

export function* addLisItemApiCall(list) {
    try {
        console.log(list.list, list.item);
        const response = yield call(() => addListItem(list.list, list.item));
        const data = yield call(() => response);
        yield put({ type: Api.ADD_LIST_ITEM_SUCCESS, data });
    } catch (err) {
        yield put({ type: Api.ADD_LIST_ITEM_FAILURE });
    }
}

export function* removeListItemApiCall(list) {
    try {
        const response = yield call(() => removeListItem(list.list, list.item));
        const data = yield call(() => response);
        yield put({ type: Api.REMOVE_LIST_ITEM_SUCCESS, data });
    } catch (err) {
        yield put({ type: Api.REMOVE_LIST_ITEM_FAILURE });
    }
}

export function* updateLisItemApiCall(list) {
    try {
        console.log(list.list, list.item);
        const response = yield call(() => updateListItem(list.list, list.item));
        const data = yield call(() => response);
        yield put({ type: Api.ADD_LIST_ITEM_SUCCESS, data });
    } catch (err) {
        yield put({ type: Api.ADD_LIST_ITEM_FAILURE });
    }
}

export default function* root() {
    yield all([
        takeLatest(Api.GET_TODO_LISTS_API_CALL, todoListsApiCall),
        takeLatest(Api.ADD_LIST, addTodoListApiCall),
        takeLatest(Api.REMOVE_LIST, removeTodoListApiCall),
        takeLatest(Api.GET_LIST_ITEMS, listItemsApiCall),
        takeLatest(Api.ADD_LIST_ITEM, addLisItemApiCall),
        takeLatest(Api.UPDATE_LIST_ITEM, updateLisItemApiCall),
        takeLatest(Api.REMOVE_LIST_ITEM, removeListItemApiCall)
    ])
}
