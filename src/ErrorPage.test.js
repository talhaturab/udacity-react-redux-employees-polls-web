import { render } from "@testing-library/react";
import * as React from "react";
import ErrorPage from "./components/ErrorPage";

describe("ErrorPage", () => {
	it("matches the snapshot of the error page", () => {
		const view = render(<ErrorPage />);
		expect(view).toMatchSnapshot();
	});
});
