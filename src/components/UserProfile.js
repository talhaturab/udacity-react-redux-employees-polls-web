import { connect } from "react-redux";
import { logOutUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const UserProfile = (props) => {
	const navigate = useNavigate();
	const handleLogout = (e) => {
		e.preventDefault();
		props.dispatch(logOutUser());
        navigate('/')
	};

	return (
		<div className="profile-container">
			<img
				className="avatar profile-container-item"
				src={`${props.user.avatarURL}`}
				alt="Avatar"
			/>
			<p className="profile-container-item">{props.user.name}</p>
			<button className="profile-container-item" onClick={handleLogout}>
				Log Out
			</button>
		</div>
	);
};

const mapStateToProps = ({ authedUser, users }) => {
	const user = users[authedUser];
	return {
		user,
	};
};

export default connect(mapStateToProps)(UserProfile);
