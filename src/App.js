import { render } from "react-dom";
import AddModule from "./addModule";
import SideBar from "./sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientOnBoard from "./clientOnBoard";
import ProductConfig from "./productConfig";
import ModulesContext from "./modulesContext";
import CreatedProducts from "./createdProducts";
import { useState } from "react";

const App = () => {

  const [savedModules, setSavedModules] = useState([])
  const [savedProducts, setSavedProducts] = useState([])

  return (
    <div className="flex">
      
      <ModulesContext.Provider value = {{savedModules, setSavedModules, savedProducts, setSavedProducts}}>
        <BrowserRouter>
          <SideBar />
          <Routes>
            <Route path="/module-config" element={<AddModule />} />
            <Route path="/client-onboard" element={<ClientOnBoard />} />
            <Route path="/product-config" element={<ProductConfig />} />
            <Route path="/created-products" element={<CreatedProducts />} />
          </Routes>
        </BrowserRouter>
      </ModulesContext.Provider>
    </div>
  );
};

render(<App />, document.getElementById("root"));
