////external dependencies:
const chai =require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();


///internal dependencies:
const Quiz = require('../models');
const {app, server} = require('../server');
const {DATABASE_URL, TEST_DATABASE_URL} = require('../config');


chai.use(chaiHttp);


function seedQuizzesData(){
	console.log('seeding the database');
	const seedData = [];
	for(let i=0; i<=10; i++){
		seedData.push(generateQuizzesData());
	};
	return Quiz.insertMany(seedData);
};

function generateQuizNames(){
	const quizNames = ['quiz1', 'quiz2', 'quiz3', 'quiz4'];
	return quizNames[Math.floor(Math.random()*quizNames.length)];
};

function generateQuizQuestions(){
	const quizQuestions = ['what is your favorite drink', 'what is your favorite color', 'what is your mom\'s name', 'What day is it today?'];
	return quizQuestions[Math.floor(Math.random()*quizQuestions.length)];
};

function generateQuizAnswers(){
	const quizAnswers = ['Blue', 'Caramel', 'GoldenRod', 'Princepesa'];
	return quizAnswers[Math.floor(Math.random()*quizAnswers.length)];
};

function generateQuizCorrectAnswers(){
	const correctAnswers = ['this name', 'that name', 'this noun', 'that noun'];
	return correctAnswers[Math.floor(Math.random()*correctAnswers.length)];
};

function generateQuizzesData(){
	return {
		name: generateQuizNames(),
		Questions: {
			QuestionName1: generateQuizQuestions(),
			Answer1: generateQuizAnswers(),
			Answer2: generateQuizAnswers(),
			correctAnswers: generateQuizCorrectAnswers()
		}
	}
}

function tearDownDb(){
	console.warn('deleting database');
	return mongoose.connection.dropDatabase();
};


describe('Quiz', function(){

	describe('smoke test on node', function(){
		it('should return the question and answer on testquiz request', function(done){
			try{
				let res;
				return chai.request(app)
				.get('/quiz')
				.then(_res=>{
					res=_res;
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.answers.forEach(function(item){
						item.should.be.a('object');
						item.should.have.all.keys(
							'message', 'correct'
						);
						// item.forEach(function(answer){
						// 	item.should.have.length.of.at.least(5);
						// })
						// item.should.have.length.of.at.least(5);
					});
				})
				.catch((err)=>{
					console.log(err);
				})
				done()
			}
			catch(error){
				reject(error);
			}
		});
	});
});

