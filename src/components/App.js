import handleInitialData from "../actions/shared";
import { useEffect } from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";

function App(props) {
	useEffect(() => {
		props.dispatch(handleInitialData());
	}, []);

	return (
		<div className="App">
			{props.isLoggedIn === true ? <LoginForm /> : "Homepage"}
		</div>
	);
}

const mapStateToProps = ({ authedUser }) => ({
	isLoggedIn: authedUser === null,
});

export default connect(mapStateToProps)(App);
