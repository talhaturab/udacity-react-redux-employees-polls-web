/***************************************************************************************
 *    Login form  ONLY html css is somewhat copied
 *    Title: LOGIN FORM
 *    Author: Mohithpoojary
 *    Made With: HTML / CSS
 *    Availability: https://codepen.io/Mohuth/pen/QWgrPvp
 ***************************************************************************************/

import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const LoginForm = (props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = props.users[username];

		if (user && user.password === password) {
			setErrorMessage(false);
			setSuccessMessage(true);
			props.dispatch(setAuthedUser(user.id));
			setUsername("");
			setPassword("");
		} else {
			setErrorMessage(true);
			setSuccessMessage(false);
		}
	};

	return (
		<div className="container">
			<div className="screen">
				<h1>Login to see Polls</h1>
				{errorMessage && (
					<h1 data-testid="error-header">
						The Login Credentials are wrong. Please try Again
					</h1>
				)}
				{successMessage && (
					<h1 data-testid="success-header">LogIn Success!</h1>
				)}
				<form className="login" onSubmit={handleSubmit}>
					<div className="login__field">
						<input
							data-testid="username"
							type="text"
							value={username}
							className="login__input"
							placeholder="User name / Email"
							onChange={handleUsernameChange}
						/>
					</div>
					<div className="login__field">
						<input
							data-testid="password"
							type="password"
							value={password}
							className="login__input"
							placeholder="Password"
							onChange={handlePasswordChange}
						/>
					</div>
					<button
                        data-testid="submit-btn"
						className="button login__submit"
						type="submit"
						disabled={username === "" || password === ""}
					>
						<span className="button__text">Log In Now</span>
					</button>
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = ({ users }) => ({
	users,
});

export default connect(mapStateToProps)(LoginForm);
