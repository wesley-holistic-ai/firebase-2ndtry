import { createContext } from "react";

const ModulesContext = createContext({
  savedModules: [],
  setSavedModules: (state) => {},
});

export default ModulesContext;
