import { RECEIVE_USERS } from "../actions/users";
import { UPDATE_USER_QUESTIONS } from "../actions/users";
import { UPDATE_USER_ANSWERS } from "../actions/users";

export default function users(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users,
			};
		case UPDATE_USER_QUESTIONS:
			const { questionID, authedUser } = action;

			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					questions: state[authedUser].questions.concat(questionID),
				},
			};
		case UPDATE_USER_ANSWERS:
			const { qid, answer } = action.answer;
			const authedUserID = action.answer.authedUser;

			return {
				...state,
				[authedUserID]: {
					...state[authedUserID],
					answers: { ...state[authedUserID].answers, [qid]: answer },
				},
			};

		default:
			return state;
	}
}
