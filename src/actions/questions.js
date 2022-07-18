import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";
import { updateUserAnswers, updateUserQuestions } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	};
}

function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	};
}

export function handleAddQuestion(optionOneText, optionTwoText) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		return _saveQuestion({
			optionOneText,
			optionTwoText,
			author: authedUser,
		}).then((question) => {
			dispatch(addQuestion(question));
			dispatch(updateUserQuestions(question.id, authedUser));
		});
	};
}

function addAnswer(answer) {
	return {
		type: ADD_ANSWER,
		answer,
	};
}

export function handleAddAnswer(answerInfo) {
	return (dispatch) => {
		return _saveQuestionAnswer(answerInfo).then(() => {
			dispatch(addAnswer(answerInfo));
			dispatch(updateUserAnswers(answerInfo));
		});
	};
}
