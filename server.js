
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


app.get('/quiz', (req, res)=>{
	// console.log('quiz called', TestQuiz);
	TestQuiz
	.findOne()
	.exec()
	.then(testQuiz =>res.json({
		////{this.props.answers.map((item, i)=>(
			question: testQuiz.question,
			answers: testQuiz.answers.map((item, i)=>({
				message: item.message,
				correct: item.correct
			}))
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


let server;

function runServer(databaseUrl = TEST_DATABASE_URL, port=PORT){
	return new Promise((resolve, reject)=>{
		mongoose.connect(databaseUrl, err =>{
			if(err){
				return reject(err);
			}
			app.listen(port, () =>{
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
    });
    resolve();
  });
}

if(require.main === module){
	runServer().catch(err => console.error(err));
};

module.exports = { app};