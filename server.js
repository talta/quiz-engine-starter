
////external dependencies:
const express = require('express');
const mongoose = require('mongoose');

///local dependencies:
const {PORT, DATABASE_URL, TEST_DATABASE_URL} = require('./config');
const TestQuiz = require('./models');

///app instantiation:
const app = express();
mongoose.Promise = global.Promise;
app.use(express.static('public'));
app.use('/modules', express.static(__dirname + '/node_modules/'));
// app.use(webpack);


// ///routes:
// app.get('/welcome', (req, res)=>{
// 	console.log('reached the welcome page');
// 	/////this should be the real quiz, after confirmed testing:
// 	Quiz
// 	.find()
// 	.exec()
// 	.then(quiz=>{
// 		res.json(quiz.map(quiz=>quiz.apiRepr()))
// 	})
// 	.catch(err=>{
// 		console.log(err);
// 		res.status(500).json({error:'Oops, something went wrong.'});
// 	});
// });


// app.get('/smokeTest', (req, res)=>{
// 	console.log('smoke test called', Quiz);
// 	Quiz
// 	.find()
// 	.exec()
// 	.then(setup=>{
// 		res.json(setup.map(setup =>setup.apiRepr()));
// 	})
// 	.catch(err=>{
// 		console.log(err);
// 		res.status(500).json({message: 'something wrong happened'});
// 	});
// });

app.get('/quiz', (req, res)=>{
	console.log('quiz called', TestQuiz);
	TestQuiz
	.findOne()
	.exec()
	.then(testQuiz =>res.json({
			question: testQuiz.question,
			answers: testQuiz.answers
	}))
	.catch(err=>{
		console.log(err);
		res.status(500).json({message:'something went wrong'});
	});
});

// app.get('/QuizYou', (req, res) => {
// 	res.json(Quiz.get());
// 	console.log(`get the quiz info`);
	
// 	res.status(201).send("you, you, you");
// });


let server;

function runServer(databaseUrl = TEST_DATABASE_URL, port=PORT){
	return new Promise((resolve, reject)=>{
		mongoose.connect(databaseUrl, err =>{
			if(err){
				return reject(err);
			}
			app.listen(port, () =>{
				console.log(`your app is listening on post ${port}`);
				resolve();
			})
			.on('error', err =>{
				mongoose.disconnect();
				reject(err);
			});
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
  });
}

if(require.main === module){
	runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};