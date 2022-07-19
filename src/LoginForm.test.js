import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";
import LoginForm from "./components/LoginForm";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/index";
import middleware from "./middleware/index";
import "@testing-library/jest-dom";

describe("LoginForm Snapshot", () => {
	it("matches the snapshot of the Login page", () => {
		const store = createStore(reducer, middleware);
		const view = render(
			<Provider store={store}>
				<LoginForm />
			</Provider>
		);
		expect(view).toMatchSnapshot();
	});
});

describe("Login Field exist", () => {
	it("test if the login page has all the correct fields", () => {
		const store = createStore(reducer, middleware);
		render(
			<Provider store={store}>
				<LoginForm />
			</Provider>
		);
		const logInHeading = screen.getAllByText("Login to see Polls");
		expect(logInHeading.length).toEqual(1);

		expect(screen.getByTestId("username")).toBeInTheDocument();

		expect(screen.getByTestId("password")).toBeInTheDocument();
		expect(screen.queryByTestId("success-header")).not.toBeInTheDocument();
		expect(screen.queryByTestId("error-header")).not.toBeInTheDocument();
	});
});

describe("Login Fail Test", () => {
	it("test to check login fails without correct information", () => {
		const store = createStore(reducer, middleware);
		render(
			<Provider store={store}>
				<LoginForm />
			</Provider>
		);
		const usernameInput = screen.getByTestId("username");
		fireEvent.change(usernameInput, { target: { value: "wrongUsername" } });

        const passwordInput = screen.getByTestId("password");
		fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

        const submitButton = screen.getByTestId("submit-btn");
        fireEvent.click(submitButton);

        expect(screen.getByTestId('error-header')).toBeInTheDocument();
        expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
	});
});

describe("Login Button Test", () => {
	it("Login button is disabled when username field is not filled", () => {
		const store = createStore(reducer, middleware);
		render(
			<Provider store={store}>
				<LoginForm />
			</Provider>
		);

        const passwordInput = screen.getByTestId("password");
		fireEvent.change(passwordInput, { target: { value: "password" } });

        const submitButton = screen.getByTestId("submit-btn");
        expect(submitButton).toBeDisabled()
	});

    it("Login button is disabled when password field is not filled", () => {
		const store = createStore(reducer, middleware);
		render(
			<Provider store={store}>
				<LoginForm />
			</Provider>
		);

        const usernameInput = screen.getByTestId("username");
		fireEvent.change(usernameInput, { target: { value: "username" } });

        const submitButton = screen.getByTestId("submit-btn");
        expect(submitButton).toBeDisabled()
	});
});
