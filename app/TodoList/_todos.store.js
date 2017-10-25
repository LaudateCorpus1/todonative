import store from 'react-native-simple-store';

export default (state = [], action) => {
    switch (action.type) {
        case 'TODOS_LOADED':
            return action.payload;
        case 'ADD_TODO': {
            const newTodo = action.payload;
            newTodo.id = new Date().getTime();
            return [
                ...state,
                newTodo
            ];
        }
        case 'UPDATE_TODO': {
            const updatedTodo = action.payload;
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === updatedTodo.id) {
                    state.splice(i, 1);
                    break;
                }
            }
            return [...state, updatedTodo];
        }
        case 'REMOVE_TODO': {
            const newState = [ ...state ];
            const todoId = action.payload;
            for (let todo in newState) {
                if (newState[todo].id === todoId) {
                    newState.splice(todo, 1);
                }
            }
            return newState;
        }
        case 'TOGGLE_TODO': {
            const todoId = action.payload;
            const newState = [ ...state ];
            for (let todoKey in newState) {
                const todo = newState[todoKey];
                if (todo.id === todoId) {
                    todo.done = !todo.done;
                    if (todo.done) todo.doneAt = new Date();
                    else todo.doneAt = null;
                }
            }
            return newState;
        }
        default: return state;
    }
}

export const addTodo = (todo) => {
    return (dispatch, getState) => {
        dispatch(_addTodo(todo));
        _saveTodosToStorage(getState().todos);
    }
}

export const updateTodo = (todo) => {
    return (dispatch, getState) => {
        dispatch(_updateTodo(todo));
        _saveTodosToStorage(getState().todos);
    }
}

export const removeTodo = (todoId) => {
    return (dispatch, getState) => {
        dispatch(_removeTodo(todoId));
        _saveTodosToStorage(getState().todos);
    }
}

export const toggleTodo = (todoId) => {
    return (dispatch, getState) => {
        dispatch(_toggleTodo(todoId));
        _saveTodosToStorage(getState().todos);
    }
}

export const loadTodos = () => {
    return async dispatch => {
        const todos = await _loadTodosFromStorage(); 
        dispatch(_todosLoaded(todos));
    }
}

const _addTodo = (todo) => ({ type: 'ADD_TODO', payload: todo });
const _updateTodo = (todo) => ({ type: 'UPDATE_TODO', payload: todo });
const _removeTodo = (todoId) => ({ type: 'REMOVE_TODO', payload: todoId });
const _toggleTodo = (todoId) => ({ type: 'TOGGLE_TODO', payload: todoId });
const _todosLoaded = (todos) => ({ type: 'TODOS_LOADED', payload: todos });

async function _saveTodosToStorage(todos) {
    try {
        await store.save('todos', todos);
      } catch (error) {
        console.log(error);
      }
}

async function _loadTodosFromStorage() {
    try {
        const value = await store.get('todos');
        return value || [];
      } catch (error) {
        console.log(error);
      }
}