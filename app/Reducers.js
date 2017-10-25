import { combineReducers } from 'redux';

import TodoListReducer from './TodoList/_todos.store';
import EditModeReducer from './TodoList/_editmode.store';
import FilterReducer from './TodoList/_filter.store';

export default combineReducers({
  todos: TodoListReducer,
  editMode: EditModeReducer,
  filter: FilterReducer
})