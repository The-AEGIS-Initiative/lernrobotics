import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";

import EditorSection from "../sections/editor_section.js";
import { AppContext } from "../contexts/AppContext.js";
import { GamePageProvider } from "../contexts/GamePageContext";

afterEach(cleanup);

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

function renderEditorSection(isAuth) {
  return render(
    <AppContext.Provider value={{ isAuth: isAuth }}>
      <GamePageProvider>
        <EditorSection level="hello_world" width={`500px`} />
      </GamePageProvider>
    </AppContext.Provider>
  );
}

test("Submit button exists", () => {
  const { getByText } = renderEditorSection(false); //

  expect(getByText("Submit")).toBeTruthy();
});

test("Stop button exists", () => {
  const { getByText } = renderEditorSection(false); //

  expect(getByText("Stop")).toBeTruthy();
});
