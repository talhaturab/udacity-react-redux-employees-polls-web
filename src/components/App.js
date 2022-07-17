import handleInitialData from "../actions/shared";
import { useEffect } from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import "../App.css";
import Nav from "./Nav";
import UserProfile from "./UserProfile";
import CreatePoll from "./CreatePoll";

function App(props) {
	useEffect(() => {
		props.dispatch(handleInitialData());
	}, []);

	return (
		<div>
			{props.isLoggedIn === true ? (
				<LoginForm />
			) : (
				<div>
					<Nav />
					<UserProfile />
					<Routes>
						<Route path="/" exact element={<Dashboard />} />
						<Route path="/add" element={<CreatePoll />} />
					</Routes>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = ({ authedUser }) => ({
	isLoggedIn: authedUser === null,
});

export default connect(mapStateToProps)(App);
