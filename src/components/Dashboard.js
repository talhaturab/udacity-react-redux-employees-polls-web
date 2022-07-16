import { connect } from "react-redux";
import ListItemPoll from "./ListItemPoll";

const Dashboard = (props) => {
	return (
		<div className="center">
			<h1 className="center">Dashboard</h1>
			<div>
				<h1>New Questions</h1>
				<ul className="flex-container">
					{props.unansweredPolls.map((poll) => (
						<ListItemPoll item={poll} key={poll.id} />
					))}
				</ul>
			</div>
			<div>
				<h1>Done</h1>
				<ul className="flex-container">
					{props.answeredPolls.map((poll) => (
						<ListItemPoll item={poll} key={poll.id} />
					))}
				</ul>
			</div>
		</div>
	);
};

const mapStateToProps = ({ questions, authedUser }) => {
	const polls = Object.keys(questions).sort(
		(a, b) => questions[b].timestamp - questions[a].timestamp
	);

	const unansweredPolls = [];
	const answeredPolls = [];

	for (const id of polls) {
		const question = questions[id];
		const votes = question.optionOne.votes.concat(question.optionTwo.votes);
		if (votes.includes(authedUser)) {
			answeredPolls.push(question);
		} else {
			unansweredPolls.push(question);
		}
	}

	return {
		unansweredPolls,
		answeredPolls,
	};
};

export default connect(mapStateToProps)(Dashboard);
