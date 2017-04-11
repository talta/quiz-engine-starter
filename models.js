const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
		question: {type: String},
		answers: {type: String}
		// [
		// 	{
		// 		message: {type:String},
		// 		correct: {type: Boolean}
		// 	}
		// ]
});


QuizSchema.methods.apiRepr = function(){
	return{
			question: this.question,
			answers: this.answers
			// [
			// 	{
			// 		message:this.message,
			// 		correct: this.Correct

			// 	},
			// 	{
			// 		message:this.message,
			// 		correct: this.Correct

			// 	},
			// 	{
			// 		message:this.message,
			// 		correct: this.Correct

			// 	},
			// 	{
			// 		message:this.message,
			// 		correct: this.Correct

			// 	}
			// ]

	};
};


const Quiz = mongoose.model('TestQuiz', QuizSchema);
const TestQuiz = mongoose.model('tests', QuizSchema);
// console.log(TestQuiz);

module.exports = TestQuiz;