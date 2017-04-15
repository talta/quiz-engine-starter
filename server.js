
////external dependencies:
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

///local dependencies:
const {PORT, DATABASE_URL, TEST_DATABASE_URL} = require('./config');
const TestQuiz = require('./models');

///app instantiation:
const app = express();
const router = new express.Router();
mongoose.Promise = global.Promise;
app.use(express.static('public'));
app.use('/', router);
app.use('/modules', express.static(__dirname + '/node_modules/'));







router.get('/quiz', cors(), (req, res)=>{
	// console.log('quiz called', TestQuiz);
	TestQuiz
	.findOne()
	.exec()
	.then(testQuiz =>res.json({
				question: testQuiz.question,
				answers: [{
					message: testQuiz.answers[0].message,
					correct: testQuiz.answers[0].correct
					},
					{
					message: testQuiz.answers[1].message,
					correct: testQuiz.answers[1].correct
					},
					{
					message: testQuiz.answers[2].message,
					correct: testQuiz.answers[2].correct
					},
					{
					message: testQuiz.answers[3].message,
					correct: testQuiz.answers[3].correct
					},
					{
					message: testQuiz.answers[4].message,
					correct: testQuiz.answers[4].correct
				}]	
	}))
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

// const server = app.listen(app.get('port'), function(){
// 	console.log
// })


function runServer(databaseUrl = TEST_DATABASE_URL, port=PORT){
	return new Promise((resolve, reject)=>{
		mongoose.connect(databaseUrl, err =>{
			if(err){
				return reject(err);
			}
			app.listen(app.get(port), () =>{
				console.log(`your app is listening on port ${port}`);
				resolve();
			})
			.on('error', err =>{
				mongoose.disconnect();
				reject(err);
			});
		});
		resolve();
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
	    })
	    .catch(err=>{
			console.log(err);
			res.status(500).json({message:'something went wrong'});
		});

	});
}

if(require.main === module){
	runServer().catch(err => console.error(err));
};

module.exports = { app};