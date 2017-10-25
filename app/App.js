import React, { Component } from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import TodoList from './TodoList/TodoList';
import reducers from './Reducers';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default () => {
  return (
    <Provider store={store}>
      <TodoList></TodoList>
    </Provider>
  )
}