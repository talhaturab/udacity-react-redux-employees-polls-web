import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const ListItemPoll = ({ item }) => {
	const navigate = useNavigate();
	const handleShowItem = (e, id) => {
		e.preventDefault();
		navigate(`questions/${id}`);
	};
	return (
		<li className="flex-item" key={item.id}>
			<p>{item.author}</p>
			<p>{formatDate(item.timestamp)}</p>
			<button className="btn" onClick={(e) => handleShowItem(e, item.id)}>
				Show
			</button>
		</li>
	);
};

export default ListItemPoll;
