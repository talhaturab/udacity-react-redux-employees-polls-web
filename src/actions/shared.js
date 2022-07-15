import { _getUsers } from "../utils/_DATA";
import { _getQuestions } from "../utils/_DATA";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";

export default function handleInitialData() {
	return async (dispatch) => {
		const users = await _getUsers().then((res) => (res));
		const questions = await _getQuestions().then((res) => (res));
		dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions))
	};
}
