import ModulesContext from "./modulesContext";
import { useContext } from "react";

const CreatedProducts = () => {
  const { savedProducts, setSavedProducts } = useContext(ModulesContext);

  return (
    <div className="flex-1 min-h-screen bg-slate-100 p-20">
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
    </div>
  );
};

export default CreatedProducts;
