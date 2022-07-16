import { Link } from "react-router-dom";
const Nav = () => {
	return (
		<nav>
			<ul className="nav-links">
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/leaderboard">LeaderBoard</Link>
				</li>
				<li>
					<Link to="/add">New</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
