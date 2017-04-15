const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
			question: {type: String},
			answers:
			[{
				message: {type: String},
				correct: {type: Boolean}
			}]
});


QuizSchema.methods.apiRepr = function(){
	return{
			question: this.question,
			answers: [{
				message: this.message,
				correct: this.correct
			}
			]
	};
};


const Quiz = mongoose.model('TestQuiz', QuizSchema);
const TestQuiz = mongoose.model('tests', QuizSchema);
// console.log(TestQuiz);

module.exports = TestQuiz;