import { useContext, useReducer, useState } from "react";
import ModulesContext from "./modulesContext";

const ProductConfig = () => {
  const { savedModules, setSavedModules, savedProducts, setSavedProducts } =
    useContext(ModulesContext);
  const [productName, setProductName] = useState("");

  const [stages, dispatch] = useReducer(reducer, [
    {
      key: Date.now(),
      name: "", // name of the stage
      selectedModule: "", // this is the module that the user is choosing from the module drop down menu 
      assignedModules: [], // this is the list of modules that the user has assigned to the stage 
    },
  ]);


  function reducer(stages, action) {
    switch (action.type) {
      case "ADD_STAGE":
        return [...stages, { key: Date.now(), name: "", assignedModules: [] }];
      case "CHANGE_STAGE_NAME":
        return stages.map((stage) => {
          if (stage.key === action.payload.key) {
            return { ...stage, name: action.payload.name };
          }
          return stage;
        });
      case "SELECT_MODULES":
        return stages.map((stage) => {
          if (stage.key === action.payload.key) {
            return {
              ...stage,
              selectedModule: action.payload.selectedModule,
            };
          }
          return stage;
        });
      case "ADD_MODULE":
        return stages.map((stage) => {
          if (stage.key === action.payload.key) {
            return {
              ...stage,
              assignedModules: [
                ...stage.assignedModules,
                action.payload.module,
              ],
            };
          }
          return stage;
        });
      case "CLEAR_STAGES":
        return [
          {
            key: Date.now(),
            name: "",
            selectedModule: "",
            assignedModules: [],
          },
        ];
    }
  }

  const handleAddModule = (stage) => {
    if (stages.selectedModule !== "") {
      dispatch({
        type: "ADD_MODULE",
        payload: {
          key: stage.key,
          module: savedModules.find(
            ({ name }) => name === stage.selectedModule
          ),
        },
      });
      setSavedModules(
        savedModules.filter(
          (savedModule) => savedModule.name !== stage.selectedModule
        )
      );
    }
  };

  function handleSaveProduct() {
    setSavedProducts([
      ...savedProducts,
      { productId: Date.now(), name: productName, stages: stages },
    ]);
    setProductName("");
    dispatch({ type: "CLEAR_STAGES" });
  }

  console.log(savedProducts);
  return (
    <div className="flex-1 min-h-screen bg-slate-100 p-20">
      <h1 className="font-extrabold text-indigo-600 text-4xl my-5">
        Product Configuration
      </h1>
      <h2>Enter Product Name</h2>
      <p>
        <input
          className="rounded"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        ></input>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "ADD_STAGE" })}
          className="bg-indigo-600 rounded text-white hover:bg-indigo-300 p-2 mt-10"
        >
          Add Stage
        </button>
      </p>
      <div className="grid grid-flow-col gap-2 py-2">
        {stages.map((stage) => {
          return (
            <div>
              <div className="bg-white p-2 rounded">
                <input
                  key={stage.key}
                  className="text-slate-600 border-slate-200 rounded"
                  type="text"
                  placeholder="Enter Stage Name"
                  value={stage.name}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_STAGE_NAME",
                      payload: { key: stage.key, name: e.target.value },
                    })
                  }
                />
                <p>Add module</p>
                <p>
                  <select
                    value={stage.selectedModule}
                    onChange={(e) =>
                      dispatch({
                        type: "SELECT_MODULES",
                        payload: {
                          key: stage.key,
                          selectedModule: e.target.value,
                        },
                      })
                    }
                    onBlur={(e) =>
                      dispatch({
                        type: "SELECT_MODULES",
                        payload: {
                          key: stage.key,
                          selectedModule: e.target.value,
                        },
                      })
                    }
                  >
                    <option></option>
                    {savedModules.map((module) => {
                      return <option>{module.name}</option>;
                    })}
                  </select>
                  <button
                    disabled={stage.name === ""}
                    onClick={() => handleAddModule(stage)}
                    className="bg-indigo-600 rounded text-white hover:bg-indigo-300 p-2 mx-2 disabled:bg-indigo-100"
                  >
                    {" "}
                    Add Module to Stage{" "}
                  </button>
                </p>
                {stage.assignedModules.map((assignedModule) => {
                  return <p>{assignedModule.name}</p>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <button
        disabled={productName === ""}
        onClick={handleSaveProduct}
        className="bg-indigo-600 rounded text-white hover:bg-indigo-300 p-2 mt-10 disabled:bg-indigo-100"
      >
        Save Product
      </button>

      <div className="my-20 text-m border-t-4">
        <h1 className="font-bold text-indigo-600 text-2xl">Saved Products</h1>
        <div className="grid grid-flow-col h-2/5 gap-2 pt-10 overflow-x-auto">
          {savedProducts.map((savedProduct) => {
            return (
              <div className="bg-white p-5 rounded">
                <h1 className="border-b-2">{savedProduct.name}</h1>
                <h3 className="my-2">Stages:</h3>

                {savedProduct.stages.map((stage) => {
                  return (
                    <ol className="ml-5 my-5">
                      <li>Stage Title: {stage.name}</li>
                      <li>Number of modules: {stage.assignedModules.length}</li>
                    </ol>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="my-20 text-m border-t-4">
        <h1 className="font-bold text-indigo-600 text-2xl">
          Available Modules
        </h1>
        <div className="grid grid-flow-col h-2/5 gap-2 pt-10 overflow-x-auto">
          {savedModules.map((savedModule) => {
            return (
              <div className="bg-white p-5 rounded">
                <h1 className="border-b-2 my-5">Module title: {savedModule.name}</h1>
                <h2>Qualitative? {savedModule.quali ? "True" : "False"}</h2>
                <h3>Questions:</h3>
                <ol>
                  {savedModule.questions.map((question) => {
                    return <li className="ml-5">{question.questionText}</li>;
                  })}
                </ol>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductConfig;
