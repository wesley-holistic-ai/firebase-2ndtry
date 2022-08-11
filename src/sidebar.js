import { useState } from "react";
import HAI_LOGO from "./images/HAI_LOGO_FIGMA.png";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [expandProduct, setExpandProduct] = useState(false)
  const [expandClient, setExpandClient] = useState(false);
  console.log(expandProduct);

  return (
    <div className="w-72 min-h-screen bg-slate-200">
      <img src={HAI_LOGO} />
      <div className="flex gap-x-4 items-center"></div>
      <div className="overflow-y-auto">
        <ul className="pt-6">
          <li className="p-2 hover:bg-white rounded-md">
          <button className="flex items-center">

            <Link to={"/client-onboard"} className="flex items-center">
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
              <span>Client OnBoard</span>
            </Link>
            <button onClick={() => setExpandClient(!expandClient)}>
            <svg
                  sidebar-toggle-item
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
            </svg>
            </button>
            </button>
            {expandClient ? (
              <ul>
                <li className="p-4 flex items-center">
                  <svg
                    width="13"
                    height="16"
                    viewBox="0 0 13 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1286 16H0.437252C0.195984 16 0 15.804 0 15.5627V0.43833C0 0.321991 0.0462629 0.210529 0.128637 0.128546C0.210816 0.0465621 0.317395 -0.00848692 0.438811 0.00107766C2.01507 0.00712872 4.14746 0.0133754 6.2795 0.019427C8.41189 0.0254781 10.5445 0.0317244 12.1212 0.037776C12.3617 0.0385568 12.5563 0.23376 12.5567 0.474248C12.5575 0.873047 12.5586 2.22071 12.5598 3.95702C12.5598 4.05697 12.5258 4.15359 12.4634 4.23148L10.2568 6.97562L10.2775 7.69786L11.0202 7.56864L11.7847 6.62562C11.9012 6.48156 12.0958 6.42691 12.2703 6.48879C12.4448 6.55067 12.5616 6.71542 12.5618 6.90066L12.566 15.5622C12.566 15.6784 12.5202 15.7897 12.4382 15.8716C12.356 15.9538 12.2447 15.9999 12.1286 15.9999L12.1286 16ZM0.874504 15.1255H11.6914L11.6879 8.13446L11.5967 8.24709C11.5299 8.32908 11.436 8.38432 11.332 8.40247L9.93025 8.64628C9.80512 8.66814 9.67707 8.63457 9.57868 8.55414C9.4805 8.47392 9.42194 8.35504 9.41823 8.22816L9.37821 6.8401C9.37509 6.73606 9.40925 6.63455 9.47445 6.55354L11.6855 3.80375C11.6847 2.54781 11.6839 1.50995 11.6832 0.911242C10.1612 0.905581 8.21932 0.900114 6.27722 0.894453C4.33672 0.888793 2.39622 0.883132 0.874785 0.877472L0.874504 15.1255ZM11.2571 7.97155H11.2593H11.2571Z"
                      fill="#8492A6"
                    />
                  </svg>
                  <Link to={"/created-products"}>
                    <span>Created Products</span>
                  </Link>
                </li>
              </ul>
            ) : null}
          </li>
          
          <li className="p-2 hover:bg-white rounded-md">
            <button className="flex items-center">
              <Link to={"/product-config"} className="flex items-center" >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Product Configuration</span>
              </Link>
              <button onClick={() => setExpandProduct(!expandProduct)}>
                <svg
                  sidebar-toggle-item
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </button>


            {expandProduct ? (
              <ul>
                <li className="p-4 flex items-center">
                  <svg
                    width="13"
                    height="16"
                    viewBox="0 0 13 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1286 16H0.437252C0.195984 16 0 15.804 0 15.5627V0.43833C0 0.321991 0.0462629 0.210529 0.128637 0.128546C0.210816 0.0465621 0.317395 -0.00848692 0.438811 0.00107766C2.01507 0.00712872 4.14746 0.0133754 6.2795 0.019427C8.41189 0.0254781 10.5445 0.0317244 12.1212 0.037776C12.3617 0.0385568 12.5563 0.23376 12.5567 0.474248C12.5575 0.873047 12.5586 2.22071 12.5598 3.95702C12.5598 4.05697 12.5258 4.15359 12.4634 4.23148L10.2568 6.97562L10.2775 7.69786L11.0202 7.56864L11.7847 6.62562C11.9012 6.48156 12.0958 6.42691 12.2703 6.48879C12.4448 6.55067 12.5616 6.71542 12.5618 6.90066L12.566 15.5622C12.566 15.6784 12.5202 15.7897 12.4382 15.8716C12.356 15.9538 12.2447 15.9999 12.1286 15.9999L12.1286 16ZM0.874504 15.1255H11.6914L11.6879 8.13446L11.5967 8.24709C11.5299 8.32908 11.436 8.38432 11.332 8.40247L9.93025 8.64628C9.80512 8.66814 9.67707 8.63457 9.57868 8.55414C9.4805 8.47392 9.42194 8.35504 9.41823 8.22816L9.37821 6.8401C9.37509 6.73606 9.40925 6.63455 9.47445 6.55354L11.6855 3.80375C11.6847 2.54781 11.6839 1.50995 11.6832 0.911242C10.1612 0.905581 8.21932 0.900114 6.27722 0.894453C4.33672 0.888793 2.39622 0.883132 0.874785 0.877472L0.874504 15.1255ZM11.2571 7.97155H11.2593H11.2571Z"
                      fill="#8492A6"
                    />
                  </svg>
                  <Link to={"/module-config"}>
                    <span>Module Configuration</span>
                  </Link>
                </li>
              </ul>
            ) : null}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
