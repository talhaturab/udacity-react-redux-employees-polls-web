import { connect } from "react-redux";
import { useState } from "react";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const CreatePoll = ({ dispatch }) => {
    const navigate = useNavigate();
	const [valueOne, setValueOne] = useState("");
	const [valueTwo, setValueTwo] = useState("");

	const handleValueOneChange = (e) => {
		setValueOne(e.target.value);
	};
	const handleValueTwoChange = (e) => {
		setValueTwo(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(handleAddQuestion(valueOne, valueTwo));
        setValueOne("")
        setValueTwo("")
        navigate("/")
	};

	return (
		<div className="create-poll-container">
			<h1>Would You Rather</h1>
			<h3>Create Your Own Poll</h3>
			<form onSubmit={handleSubmit}>
				<div>
					<p>First Option</p>
					<textarea
						placeholder="Option One"
						value={valueOne}
						onChange={handleValueOneChange}
					/>
				</div>
				<div>
					<p>Second Option</p>
					<textarea
						placeholder="Option Two"
						value={valueTwo}
						onChange={handleValueTwoChange}
					/>
				</div>
				<button
					className="btn"
					type="submit"
					disabled={valueOne === "" || valueTwo === ""}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default connect()(CreatePoll);
