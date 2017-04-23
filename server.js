
////external dependencies:
const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors');

///local dependencies:
const {PORT, DATABASE_URL, TEST_DATABASE_URL} = require('./config');
const TestQuiz = require('./models');

///app instantiation:
const app = express();

//using the promise library for mongoose and setting that as a default:
//mongoose promise implementation
mongoose.Promise = global.Promise;
///need to have a public folder:
app.use(express.static('public'));
app.use(cors());
////look into this use:
app.use('/modules', express.static(__dirname + '/node_modules/'));




		/////potential to build this object somewhere else more dynamically:
/////{this.props.answers.map((answer, index)=>(
            // <div key={index}>
            //   <input value={answer.message} 

				
			// question: testQuiz.questions.question,
			// index: testQuiz.questions.index,
			// answers: [{
			// 	message: testQuiz.questions.answers[0].message,
			// 	correct: testQuiz.questions.answers[0].correct
			// },
			// {
			// 	message: testQuiz.questions.answers[1].message,
			// 	correct: testQuiz.questions.answers[1].correct
			// },
			// {
			// 	message: testQuiz.questions.answers[2].message,
			// 	correct: testQuiz.questions.answers[2].correct
			// },
			// {
			// 	message: testQuiz.questions.answers[3].message,
			// 	correct: testQuiz.questions.answers[3].correct
			// },
			// {
			// 	message: testQuiz.questions.answers[4].message,
			// 	correct: testQuiz.questions.answers[4].correct
			// }]

app.get('/quiz', (req, res)=>{
	console.log('quiz called', TestQuiz);
	TestQuiz
	.find({}, function(err, testQuiz){
		console.log('Test Quiz from 62: ', testQuiz);
		return res.status(200).json(testQuiz)
			/////this logs the data
	// 		testQuiz
	// 	// 	data: testQuiz.map(
	// 	// 		quiz=>quiz.apiRepr()
	// 	// 	)
	// 	// })
	// })
	// .exec()
	// .then(testQuiz =>res.json({
	// 	data: testQuiz.data
	})

	.catch(err=>{
		console.log(err);
		res.status(500).json({message:'something went wrong'});
	});
});

/////a simplier way to start the server and database:
// const databaseUrl = TEST_DATABASE_URL;
// const port=PORT

// mongoose.connect(databaseUrl, err =>{
// 	if(err){
// 		mongoose.disconnect();
// 		return reject(err);
// 	}
// });

// app.listen(port, () =>{
// 	console.log(`your app is listening on post ${port}`);
// });


let server;

///potentially a default in ES6
////potenail rewrite to make work:
function runServer(databaseUrl = TEST_DATABASE_URL, port=PORT){
	return new Promise((resolve, reject)=>{
		mongoose.connect(databaseUrl, err =>{
			app.listen(port, () =>{
				console.log(`your app is listening on port ${port}`);
				resolve();
			})
			.on('error', err =>{
				console.log('on error occured in runserver', err);
				mongoose.disconnect();
				reject(err);
			})
			// .catch(err=>{
			// 	console.log(err);
			// 	res.status(500).json({message:'something went wrong'});
			// })
		});
	});
	
};


function closeServer() {
	console.log('closing the server from server.js');
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
    resolve();
  });
}

if(require.main === module){
	runServer().catch(err => console.error(err));
};

module.exports = {app};