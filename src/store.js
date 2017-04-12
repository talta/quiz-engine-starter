import {React, applyMiddleware, compose, createStore} from 'redux';

import thunk from 'redux-thunk';

import {quizReducer} from './reducer';

export default createStore(quizReducer, applyMiddleware(thunk));