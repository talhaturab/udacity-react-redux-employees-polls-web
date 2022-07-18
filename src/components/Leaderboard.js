import { connect } from "react-redux";

const Leaderboard = ({ users, userIDs }) => {
	console.log(userIDs);
	// console.log(Object.keys(users[id].answers).length)
	// console.log(users[userIDs])
	return (
		<div>
			<section id="leaderboard">
				<nav>
					<div>
						<h1 style={{ textAlign: "center" }}>Standings</h1>
					</div>
				</nav>
				<table id="rankings" width="100%">
					<thead>
						<tr>
							<th>User</th>
							<th>Answered</th>
							<th>Created</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody className="user-table-body">
						{userIDs.map((id) => (
							<tr key={id}>
								<td>
									<div className="user-table-data">
										<img
											alt="avatar"
											className="avatar"
											src={`${users[id].avatarURL}`}
										/>
										<span>{id}</span>
									</div>
								</td>
								<td>{Object.keys(users[id].answers).length}</td>
								<td>{users[id].questions.length}</td>
								<td>
									{Object.keys(users[id].answers).length +
										users[id].questions.length}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</div>
	);
};

const mapStateToProps = ({ users }) => {
	const userIDs = Object.keys(users).sort(
		(a, b) =>
			users[b].questions.length +
			Object.keys(users[b].answers).length -
			(users[a].questions.length + Object.keys(users[a].answers).length)
	);
	return { userIDs, users };
};

export default connect(mapStateToProps)(Leaderboard);
