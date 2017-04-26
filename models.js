const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
		name: {type: String},
		questions: [{
			question: {type: String},
			index: {type: Number},
			answer: {type: String},
			answers:
			[{
				message: {type: String}
			}]
		}]
});


QuizSchema.methods.apiRepr = function(){
	return{
		name: this.name,
		questions:[{
			question: this.question,
			index: this.index,
			answer: this.answer,
			answers: [{
				message: this.message
			}]
		}]
	};
};





const Quiz = mongoose.model('TestQuiz', QuizSchema);
const TestQuiz = mongoose.model('tests', QuizSchema);

module.exports = TestQuiz;