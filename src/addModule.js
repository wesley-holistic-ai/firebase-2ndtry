import { useContext, useReducer, useState } from "react";
import ModuleConfig from "./moduleConfig";
import ModulesContext from "./modulesContext";
import Question from "./question";

const AddModule = () => {
  const [moduleProfile, dispatch] = useReducer(reducer, {
    name: "",
    quali: false,
    downstreamField: "",
    downstreamList: [],
  });

  const {savedModules, setSavedModules} = useContext(ModulesContext);

  function reducer(moduleProfile, action) {
    switch (action.type) {
      case "CHANGE_NAME":
        return { ...moduleProfile, name: action.payload.name };

      case "TOGGLE_QUALI":
        return { ...moduleProfile, quali: !moduleProfile.quali };
      case "CHANGE_DOWNSTREAM_FIELD":
        return {
          ...moduleProfile,
          downstreamField: action.payload.downstreamField,
        };
      case "ADD_DOWNSTREAM":
        return {
          ...moduleProfile,
          downstreamList: [
            ...moduleProfile.downstreamList,
            moduleProfile.downstreamField,
          ],
        };
      case "CLEAR_MODULE_PROFILE":
        return {
          ...moduleProfile,
          ...{
            name: "",
            quali: false,
            downstreamField: "",
            downstreamList: [],
          },
        };
    }
  }

  function handleAddDownstream() {
    dispatch({ type: "ADD_DOWNSTREAM" });
    dispatch({
      type: "CHANGE_DOWNSTREAM_FIELD",
      payload: { downstreamField: "" },
    });
  }

  function handleAddModule() {
    //This is where the module is saved (to the array savedMoudles)

    if (moduleProfile.name) {
      setSavedModules([
        ...savedModules,
        {
          key: Date.now(),
          name: moduleProfile.name,
          quali: moduleProfile.quali,
          downstreamList: moduleProfile.downstreamList,
          complete: false,
          questions:[]
        },
      ]);
      dispatch({ type: "CLEAR_MODULE_PROFILE" });
    }
  }

  function handleForm(e) {
    e.preventDefault();
  }

  

  return (
    <div className="flex-1 overflow: auto bg-slate-100 p-20">
      <form onSubmit={handleForm}>
        <h1 
        data-testid="dumbtest"
        className="font-extrabold text-indigo-600 text-4xl my-5">
          {" "}
          Module Configuration{" "}
        </h1>
        <h2 className="my-2"> Module title </h2>
        <input
          className="rounded"
          data-testid="module-name-input"
          type="text"
          placeholder="Enter name of Module"
          value={moduleProfile.name}
          onChange={(e) =>
            dispatch({ type: "CHANGE_NAME", payload: { name: e.target.value } })
          }
          required
        />
        <p className="my-2">
          <span className="mr-2">Qualitative</span>
          <input
            className="rounded"
            type="checkbox"
            id="quali"
            value={moduleProfile.qual}
            defaultChecked={moduleProfile.qual}
            onClick={() => dispatch({ type: "TOGGLE_QUALI" })}
          />
        </p>

        <p>
          <input
            className="rounded"
            type="text"
            placeholder="Downstream"
            value={moduleProfile.downstreamField}
            onChange={(e) =>
              dispatch({
                type: "CHANGE_DOWNSTREAM_FIELD",
                payload: { downstreamField: e.target.value },
              })
            }
          />
          <button
            className="bg-indigo-600 rounded text-white hover:bg-indigo-300 p-2 ml-2"
            onClick={handleAddDownstream}
          >
            {" "}
            Add downstream{" "}
          </button>
        </p>
        <p className="border-dashed border-4 text-slate-500 my-2 ">
          Downstream:{" "}
          {moduleProfile.downstreamList.map((downstream, i) => {
            return (i && downstream ? ", " : "") + downstream;
          })}
        </p>

        <button
          data-testid="add-module-btn"
          type="submit"
          disabled={moduleProfile.name === ""}
          onClick={handleAddModule}
          className="bg-indigo-600 rounded text-white hover:bg-indigo-300 disabled:bg-indigo-100 p-2 my-2"
        >
          Add Module
        </button>
      </form>
      <div className=" border-t-4  mt-20 lg:w-3/5">
        <h1 className="font-bold text-indigo-600 text-3xl"> Module details</h1>
        {savedModules ? savedModules.map((module, i) => {
          return (
            <div className="rounded border-2 p-10 bg-slate-100 my-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="font-bold text-lg border-b-4 mb-10" data-testid={`module-title${i}`}>
                    {i + 1}. {module.name}
                  </p>
                  <p>Qualitative: {module.quali ? "True" : "False"} </p>
                  <p>
                    Downstream:{" "}
                    {module.downstreamList.map((downstream, i) => {
                      return (i && downstream ? ", " : "") + downstream;
                    })}
                  </p>
                </div>

                <div className="justify-self-end">
                  {" "}
                  <button className="bg-indigo-600 rounded text-white hover:bg-indigo-300 p-2">
                    Show Question Details
                  </button>
                </div>
              </div>
              <div>
                <ModuleConfig key={module.key} module={module} />
              </div>
            </div>
          );
        }): null}
      </div>
    </div>
  );
};

export default AddModule;
