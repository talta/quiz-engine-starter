import * as actions from '../actions';

const initialState = {};

export function quizReducer= (instialState, action)=>{
	const state = initialState;

	switch(action.type){
		case 'SELECT_QUIZ':
			return state ///this needs to be changed

		default: 
			return state
	}

}