import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";

import App from "../App";
import { AppContextProvider } from "../contexts/AppContext";

describe("App routing", () => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };

  const history = createMemoryHistory();
  const { container, getByText, getAllByText } = render(
    <Router history={history}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Router>
  );

  it("Defaults to homepage and has valid links to levels", () => {
    expect(history.location.pathname).toBe("/");

    getAllByText("Start!").forEach((e) => {
      var path = e.href.match(/\/game\/.*/g);
      expect(path).toBeTruthy();
    });
  });
});
