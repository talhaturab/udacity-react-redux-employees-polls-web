import {
	_saveQuestion,
	_saveQuestionAnswer,
	_getUsers,
	_getQuestions,
} from "./utils/_DATA.js";

describe("_getUsers", () => {
	it("to verify that users in database are returned correctly with expected fields", async () => {
		const users = await _getUsers();
		expect(users["sarahedo"].id).toEqual("sarahedo");
		expect(users["sarahedo"].password).toEqual("password123");
		expect(users["sarahedo"].name).toEqual("Sarah Edo");
		expect(users["sarahedo"].avatarURL).toEqual(
			"https://cdn.pixabay.com/photo/2016/08/28/13/12/secondlife-1625903_960_720.jpg"
		);
		expect(Object.keys(users["sarahedo"].answers).length).toEqual(4);
		expect(users["sarahedo"].questions).toEqual([
			"8xf0y6ziyjabvozdd253nd",
			"am8ehyc8byjqgar0jgpub9",
		]);
		expect(Object.keys(users)).toEqual([
			"sarahedo",
			"tylermcginnis",
			"mtsamis",
			"zoshikanlu",
		]);
	});
});

describe("getQuestions", () => {
	it("to verify that questions in database are returned correctly with expected fields", async () => {
		const questions = await _getQuestions();
		const testID = "xj352vofupe1dqz9emx13r";
		expect(questions[testID].id).toEqual(testID);
		expect(questions[testID].author).toEqual("mtsamis");
		expect(questions[testID].timestamp).toEqual(1493579767190);
		expect(questions[testID].optionOne.votes).toEqual([
			"mtsamis",
			"zoshikanlu",
		]);
		expect(questions[testID].optionOne.text).toEqual(
			"deploy to production once every two weeks"
		);
		expect(questions[testID].optionTwo.votes).toEqual(["tylermcginnis"]);
		expect(questions[testID].optionTwo.text).toEqual(
			"deploy to production once every month"
		);

		expect(Object.keys(questions).length).toEqual(6);
	});
});

describe("saveQuestion", () => {
	it("verify that the saved question is returned with all expected fields when formated data is passed to the function.", async () => {
		const questionInfo = {
			author: "sarahedo",
			optionOneText: "Build our new application with Javascript",
			optionTwoText: "Build our new application with Typescript",
		};
		const result = await _saveQuestion(questionInfo);
		expect(result.author).toEqual(questionInfo.author);
		expect(result.optionOne.text).toEqual(questionInfo.optionOneText);
		expect(result.optionOne.votes.length).toEqual(0);
		expect(result.optionTwo.text).toEqual(questionInfo.optionTwoText);
		expect(result.optionTwo.votes.length).toEqual(0);
		expect(result.hasOwnProperty("timestamp")).toEqual(true);
		expect(result.hasOwnProperty("id")).toEqual(true);
	});
});

describe("CheckSaveQuestion", () => {
	it("to verify that an error is returned if incorrect data is passed to the function", async () => {
		const incorrectData = {
			authorIncorrect: "sarahedo",
			optionOneTextIncorrect: "Build our new application with Javascript",
		};
		await expect(_saveQuestion(incorrectData)).rejects.toEqual(
			"Please provide optionOneText, optionTwoText, and author"
		);
	});
});

describe("saveQuestionAnswer returns true", () => {
	it("to verify that true is returned when correctly formatted data is passed to the function", async () => {
		const correctData = {
			authedUser: "sarahedo",
			qid: "xj352vofupe1dqz9emx13r",
			answer: "optionOne",
		};
		const result = await _saveQuestionAnswer(correctData);
		expect(result).toEqual(true);
	});
});

describe("saveQuestionAnswer returns error", () => {
	it("to verify that an error is returned if incorrect data is passed to the function", async () => {
		const incorrectData = {
			authedUser: "talha",
			answer: "optionOne",
		};
		await expect(_saveQuestionAnswer(incorrectData)).rejects.toEqual(
			"Please provide authedUser, qid, and answer"
		);
	});
});
