import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import { useEffect } from "react";

const withRouter = (Component) => {
	const ComponentWithRouterProp = (props) => {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return <Component {...props} router={{ location, navigate, params }} />;
	};

	return ComponentWithRouterProp;
};

const ShowPoll = (props) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!props.question) {
			navigate("/errorPage");
		}
	}, []);

	if (props.question === null) {
		return;
	}

	let optionSelected = null;
	const { question, avatarURL, isAnswered, authedUser, dispatch } = props;
	if (isAnswered) {
		optionSelected = question.optionOne.votes.includes(authedUser)
			? "optionOne"
			: "optionTwo";
	}

	const optionOneVotes = question.optionOne.votes.length;
	const optionTwoVotes = question.optionTwo.votes.length;
	const totalVotes = optionOneVotes + optionTwoVotes;
	const votePercentage = {
		voteOne:
			optionOneVotes !== 0
				? ((optionOneVotes / totalVotes) * 100).toFixed(0) + "%"
				: "0%",
		voteTwo:
			optionTwoVotes !== 0
				? ((optionTwoVotes / totalVotes) * 100).toFixed(0) + "%"
				: "0%",
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(
			handleAddAnswer({
				authedUser,
				qid: question.id,
				answer: e.target.value,
			})
		);
	};
	return (
		<div className="showpoll-container">
			<h1>Poll By {question.author}</h1>
			<img
				className="poll-user-avatar"
				src={`${avatarURL}`}
				alt="Avatar"
			/>
			<h2>Would You Rather</h2>
			<div className="optionContainer">
				<form className="poll-option">
					<p>{question.optionOne.text}</p>
					<button
						style={{
							backgroundColor:
								optionSelected === "optionOne" ? "green" : null,
						}}
						className="btn option-btn"
						disabled={isAnswered}
						value="optionOne"
						onClick={handleSubmit}
					>
						Click
					</button>
					{optionSelected === "optionOne" && (
						<p>Option has been Selected</p>
					)}
					<p>Number of votes</p>
					<span>{question.optionOne.votes.length}</span>
					<p>Vote Percetage = {votePercentage.voteOne}</p>
				</form>
				<form className="poll-option">
					<p>{question.optionTwo.text}</p>
					<button
						value="optionTwo"
						style={{
							backgroundColor:
								optionSelected === "optionTwo" ? "green" : null,
						}}
						className="btn option-btn"
						disabled={isAnswered}
						onClick={handleSubmit}
					>
						Click
					</button>
					{optionSelected === "optionTwo" && (
						<p>Option has been Selected</p>
					)}
					<p>Number of votes</p>
					<span>{question.optionTwo.votes.length}</span>
					<p>Vote Percetage = {votePercentage.voteTwo}</p>
				</form>
			</div>
		</div>
	);
};
const mapStateToProps = ({ authedUser, users, questions }, props) => {
	const { id } = props.router.params;
	const question = questions[id] ? questions[id] : null;
	const { avatarURL } = question ? users[questions[id].author] : "";
	const isAnswered = question
		? question.optionOne.votes
				.concat(question.optionTwo.votes)
				.includes(authedUser)
		: null;

	return {
		question,
		avatarURL,
		isAnswered,
		authedUser,
	};
};
export default withRouter(connect(mapStateToProps)(ShowPoll));
