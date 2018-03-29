import {URL, LOGIN, TODO_LIST} from '../config/ApiServicesConfig'
let token = "";

export function setToken(_token){
    token = _token;
}

export async function login(username, password) {
    try {
        let response = await fetch(URL + LOGIN,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
        });
        let responseJson = await response.json();
        return responseJson.token;
    } catch (error) {
        console.error(error);
    }
}

export async function getTodoLists() {
    try {
        let response = await fetch(URL + TODO_LIST,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token
            },
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

export async function addTodoList(todoList) {
    try {
        let response = await fetch(URL + TODO_LIST + "create/",{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token
            },
            body: JSON.stringify(todoList),
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

export async function removeTodoList(todoList) {
    try {
        let response = await fetch(URL + TODO_LIST + todoList.uuid + "/",{
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token
            },
        });
        return null;
    } catch (error) {
        console.error(error);
    }
}

export async function getListItems(todoList) {
    try {
        let response = await fetch(URL + TODO_LIST+ todoList.uuid + "/items/",{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token
            },
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

export async function addListItem(list, item) {
    try {
        let response = await fetch(URL + TODO_LIST + list.uuid + "/items/create/",{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token
            },
            body: JSON.stringify(item),
        });
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

export async function removeListItem(list, item) {
    try {
        let response = await fetch(URL + TODO_LIST + "items/" +item.uuid+ "/",{
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token
            },
        });
        return null;
    } catch (error) {
        console.error(error);
    }
}