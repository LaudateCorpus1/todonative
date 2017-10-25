import { emptyTodo } from './config';

const initialState = { mode: 'none', currentTodo: emptyTodo }

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_MODE':
            const newState = { mode: action.mode };
            if (action.mode === 'edit') newState.currentTodo = { ...action.todo };
            else newState.currentTodo = { ...emptyTodo };
            return newState;
        case 'UPDATE_NAME':
            return { ...state, currentTodo: { ...state.currentTodo, name: action.payload } };
        case 'UPDATE_DESC':
            return { ...state, currentTodo: { ...state.currentTodo, description: action.payload } };
        case 'UPDATE_TIME':
            return { ...state, currentTodo: { ...state.currentTodo, shouldBeDoneBy: action.payload } };
        case 'UPDATE_IMPORTANCE':
            return { ...state, currentTodo: { ...state.currentTodo, importance: action.payload } };
        default: return state;
    }
}

export const setEditMode = (mode, todo) => {
    return dispatch => {
        dispatch(_setEditMode(mode, todo));
    }
}
export const updateName = (name) => dispatch => { dispatch(_updateName(name)) };
export const updateDesc = (desc) => dispatch => { dispatch(_updateDesc(desc)) };
export const updateTime = (time) => dispatch => { dispatch(_updateTime(time)) };
export const updateImportance = (importance) => dispatch => { dispatch(_updateImportance(importance)) };

const _setEditMode = (mode, todo) => ({ type: 'SET_MODE', mode, todo });
const _updateName = (name) => ({ type: 'UPDATE_NAME', payload: name });
const _updateDesc = (desc) => ({ type: 'UPDATE_DESC', payload: desc });
const _updateTime = (time) => ({ type: 'UPDATE_TIME', payload: time });
const _updateImportance = (importance) => ({ type: 'UPDATE_IMPORTANCE', payload: importance });