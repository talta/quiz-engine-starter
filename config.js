
// exports.DATABASE_URL = (process.env.DATABASE_URL ||
// 						global.DATABASE_URL //||
// 						// 'mongodb://tatest1:Password1234@ds149278.mlab.com:49278/quizengine'
// 						);

// exports.TEST_DATABASE_URL = (process.env.TEST_DATABASE_URL ||
// 						'mongodb://localhost/quiz-engine-test');
// 						// 'mongodb://tatest:Password1234@ds149278.mlab.com:49278/quiz-engine'
						


// exports.PORT = process.env.PORT || 8080




// if(NODE_ENV==='production'){
	
// 	exports.DATABASE_URL= process.env.DATABASE_URL;
// }else{
// 	exports.DATABASE_URL=	(process.env.DATABASE_URL || 'mongodb://localhost/quiz-engine-test')
// }


NODE_ENV= production;


if(NODE_ENV==='production'){
  exports.DATABASE_URL= process.env.DATABASE_URL;
  exports.PORT = process.env.PORT; 
} else {
  exports.DATABASE_URL= 'mongodb://localhost/quiz-engine-test';
  exports.PORT = 8080;
}