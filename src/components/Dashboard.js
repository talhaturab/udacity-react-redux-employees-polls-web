import { connect } from "react-redux";
import ListItemPoll from "./ListItemPoll";
import { useState } from "react";

const Dashboard = (props) => {
    const [showAnswered, setShowAnswered] = useState(false)
    const [showUnanswered, setShowUnanswered] = useState(true)

    const showAnsweredPolls = (e) => {
        e.preventDefault();
        setShowAnswered(true)
        setShowUnanswered(false)
    }

    const showUnansweredPolls = (e) => {
        e.preventDefault();
        setShowAnswered(false)
        setShowUnanswered(true)
    }

	return (
		<div className="center">
			<h1 className="center">Dashboard</h1>
            <div>
                <button style={{ margin: "10px" }} onClick={showAnsweredPolls}>Show Answered Questions</button>
                <button style={{ margin: "10px" }} onClick={showUnansweredPolls}>Show UnAnswered Questions</button>
            </div>
			<div>
				<h1>UnAnswered Questions</h1>
				<ul className="flex-container">
					{showUnanswered &&
                    props.unansweredPolls.map((poll) => (
						<ListItemPoll item={poll} key={poll.id} />
					))}
				</ul>
			</div>
			<div>
				<h1>Answered Questions</h1>
				<ul className="flex-container">
					{showAnswered &&
                    props.answeredPolls.map((poll) => (
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
