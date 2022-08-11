/**
 *  @jest-environment jsdom
 */

import "@testing-library/dom";
import "@testing-library/jest-dom";
import { expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddModule from "../addModule";
import ModulesContext from "../modulesContext";
import { renderHook } from "@testing-library/react-hooks";
import { useState } from "react";

test("Display module configuration", async () => {
  // just a simple (dumb) test to a h1 header is showing "Module Configuration"
  const addModule = render(<AddModule />);

  const dumbthing = await addModule.findByTestId("dumbtest");
  expect(dumbthing).toHaveTextContent("Module Configuration");
});

test("display module name in module details when given a savedModules object directly", async () => {
  const { result } = renderHook(() =>
    useState([
      {
        key: Date.now(),
        name: "foo",
        quali: true,
        downstreamList: [],
        complete: false,
        questions: [],
      },
    ])
  );

  const [savedModules, setSavedModules] = result.current;

  const addModule = render(
    <ModulesContext.Provider value={{ savedModules, setSavedModules }}>
      <AddModule />
    </ModulesContext.Provider>
  );

  const moduleName = await addModule.findByTestId("module-title0");
  expect(moduleName).toHaveTextContent("foo");
});

// I can't get this test to work so parking it at the moment
// test("display module name in module details when user enters a module name in input field", async () => {
//   const user = userEvent.setup();
//   const { result } = renderHook(() => useState([]));

//   const [savedModules, setSavedModules] = result.current;

//   const addModule = render(
//     <ModulesContext.Provider value={{ savedModules, setSavedModules }}>
//       <AddModule />
//     </ModulesContext.Provider>
//   );

//   const input = addModule.getByTestId("module-name-input");
//   await user.type(input, "Test module name 1");

//   const btn = await addModule.getByTestId("add-module-btn")
//   await user.click(btn)

//   const moduleName = await addModule.findByTestId("module-title0")
//   expect(moduleName).toHaveTextContent("Test module name 1")

// });
