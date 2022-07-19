import { render } from "@testing-library/react";
import * as React from "react";
import CreatePoll from "./components/CreatePoll";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/index";
import middleware from "./middleware/index";
import { BrowserRouter as Router } from "react-router-dom";

describe("CreatePoll", () => {
	it("matches the snapshot of the create poll", () => {
		const store = createStore(reducer, middleware);
		const view = render(
			<Provider store={store}>
				<Router>
					<CreatePoll />
				</Router>
			</Provider>
		);
		expect(view).toMatchSnapshot();
	});
});
