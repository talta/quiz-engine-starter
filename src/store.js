import {React, applyMiddleware, compose, createStore} from 'redux';

import thunk from 'react-thunk';

import {quizReducer} from './reducer';

export default createStore(quizReducer, applyMiddleware(thunk));