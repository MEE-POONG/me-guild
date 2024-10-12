import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

// interface NavDropdownProps {
//   label: string;
//   content: React.ReactNode;
// }
// { label, content }
{/* <NavDropdownProps> */}
const NavDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [flyer, setFlyer] = useState(false);
  const [flyerTwo, setFlyerTwo] = useState(false);
  return (
    <>
      <button
        type="button"
        className="group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          setFlyer(!flyer);
          setFlyerTwo(false);
        }}
      >
        <span>Solutions</span>
        <FaChevronDown
          className={`ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 transition ease-out duration-200 ${flyer ? "transform rotate-180" : "transform rotate-0"
            }`}
        />
      </button>

      {flyer && (
        <div
          onMouseLeave={() => setFlyer(false)}
          className="opacity-100 translate-y-0 transition ease-out duration-200 absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
              <a
                href="#"
                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
              >
                <svg
                  className="flex-shrink-0 h-6 w-6 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">
                    Analytics
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Get a better understanding of where your traffic is coming from.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavDropdown;
