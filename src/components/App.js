import handleInitialData from "../actions/shared";
import { useEffect } from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import "../App.css";

function App(props) {
	useEffect(() => {
		props.dispatch(handleInitialData());
	}, []);

	return (
		<div>
			{props.isLoggedIn === true ? <LoginForm /> : <Dashboard />}
		</div>
	);
}

const mapStateToProps = ({ authedUser }) => ({
	isLoggedIn: authedUser === null,
});

export default connect(mapStateToProps)(App);
