const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
		name: {type: String},
		questions: [{
			question: {type: String},
			index: {type: Number},
			answers:
			[{
				message: {type: String},
				correct: {type: Boolean}
			}]
		}]
});


QuizSchema.methods.apiRepr = function(){
	return{
		name: this.name,
		questions:[{
			question: this.question,
			index: this.index,
			answers: [{
				message: this.message,
				correct: this.correct
			}]
		}]
	};
};





const Quiz = mongoose.model('TestQuiz', QuizSchema);
const TestQuiz = mongoose.model('tests', QuizSchema);
// console.log(TestQuiz);

module.exports = TestQuiz;