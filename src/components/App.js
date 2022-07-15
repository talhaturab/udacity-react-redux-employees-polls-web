
import "../App.css";
import handleInitialData from "../actions/shared";
import { useEffect } from "react";
import { connect } from "react-redux";

function App(props) {
	useEffect(() => {
		props.dispatch(handleInitialData());
	}, []);

    console.log(props)

	return (
		<div className="App">
			<p>React Project</p>
		</div>
	);
}

const mapStateToProps = ({authedUser}) => ({
    pageStatus: authedUser  
})

export default connect(mapStateToProps)(App);
