require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';


import QuestionAnswer from './components/question-answer';
import store from './store';
// import '../css/index.css';


ReactDOM.render(
	<Provider store={store}>
  		<QuestionAnswer />
 	</Provider>,
  document.getElementById('root')
);
