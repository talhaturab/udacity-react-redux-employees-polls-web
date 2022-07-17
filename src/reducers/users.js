import { RECEIVE_USERS } from "../actions/users";
import { UPDATE_USER_QUESTIONS } from "../actions/users";

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

		default:
			return state;
	}
}
