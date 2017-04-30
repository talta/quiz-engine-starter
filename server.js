
////external dependencies:
const express = require('express');
const mongoose = require('mongoose');
const cors  = require('cors');

///local dependencies:
const {PORT, DATABASE_URL} = require('./config');
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
// app.use('/modules', express.static(__dirname + '/node_modules/'));


app.get('/quiz', (req, res)=>{
	try{
		console.log('quiz called', TestQuiz);
		TestQuiz
		.find({}, function(err, testQuiz){
			console.log('Test Quiz from 62: ', testQuiz);
			return res.status(200).json(testQuiz)
		})
		.catch(err=>{
			console.log(err);
			res.status(500).json({message:'something went wrong'});
		});
	}
	catch(err){
		message.innerHTML = "Input is " + err;
	}
	
});


let server;

function runServer(databaseUrl = DATABASE_URL, port=PORT){
	return new Promise((resolve, reject)=>{
		mongoose.connect(databaseUrl, err =>{
			app.listen(port, () =>{
				console.log(`your app is listening on port ${port}, and process.end: ${process.env}`);
				resolve();
			})
			.on('error', err =>{
				console.log('on error occured in runserver', err);
				mongoose.disconnect();
				reject(err);
			})
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