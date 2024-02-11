import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiCompass,
  FiUsers,
  FiLogOut,
  FiChevronDown,
  FiChevronUp,
  FiCodesandbox,
} from "react-icons/fi";

import { FaCheck } from "react-icons/fa";
import { IoCloseCircle, IoBookSharp } from "react-icons/io5";

function Menu() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen2, setDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setDropdownOpen4] = useState(false);
  const [isDropdownOpen5, setDropdownOpen5] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown2 = () => {
    setDropdownOpen2(!isDropdownOpen2);
  };

  const toggleDropdown3 = () => {
    setDropdownOpen3(!isDropdownOpen3);
  };

  const toggleDropdown4 = () => {
    setDropdownOpen4(!isDropdownOpen4);
  };
  const toggleDropdown5 = () => {
    setDropdownOpen5(!isDropdownOpen5);
  };

  return (
    <div>
      <div
        className="fixed top-0 left-0 w-60 bg-blue-600"
        style={{
          zIndex: "9999",
          overflowY: "auto",
          height: "100%",
          overflowX: "hidden",
          width: "12%",
        }}
      >
        <ul>
          <li className="flex items-center px-6 py-3 font-bold text-white">
            {" "}
            <h2 className="text-2xl">Curso de Formación Ansible</h2>
          </li>
          <li
            className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
            style={{ color: "white" }}
          >
            <IoBookSharp className="w-6 h-6 mr-2 " />
            <Link className="text-2xl" onClick={toggleDropdown} to={"#"}>
              Módulos del curso:
            </Link>
            <a
              className="ml-auto cursor-pointer"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
              aria-controls="rundeck-dropdown"
            >
              {isDropdownOpen ? (
                <FiChevronUp className="w-6 h-6" />
              ) : (
                <FiChevronDown className="w-6 h-6" />
              )}
            </a>
          </li>
          {isDropdownOpen && (
            <ul
              id="rundeck-isDropdownOpen"
              className="pl-8 py-2 text-blue-300 cursor-pointer"
            >
              <li
                className="flex items-center py-1 hover:text-white hover:bg-blue-700"
                style={{ color: "white" }}
              >
                <FaCheck className="w-4 h-4 mr-2" />
                <Link
                  className="text-2xl font-bold"
                  onClick={toggleDropdown2}
                  to={`/orchestrator_selection/${"ejecuciones"}`}
                >
                  Módulo I:
                </Link>
                <a
                  className="ml-auto cursor-pointer"
                  onClick={toggleDropdown2}
                  aria-expanded={isDropdownOpen2}
                  aria-controls="rundeck-isDropdownOpen2"
                >
                  {isDropdownOpen2 ? (
                    <FiChevronUp className="w-6 h-6" />
                  ) : (
                    <FiChevronDown className="w-6 h-6" />
                  )}
                </a>
              </li>
              {isDropdownOpen2 && (
                <ul id="rundeck-isDropdownOpen2">
                  <li
                    className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
                    style={{ color: "white" }}
                  >
                    <FaCheck className="w-4 h-4 mr-2" />
                    <Link
                      className="text-1xl"
                      to={`/orchestrator_selection/${"estados"}`}
                    >
                      1
                    </Link>
                  </li>
                  <li
                    className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
                    style={{ color: "white" }}
                  >
                    <FaCheck className="w-4 h-4 mr-2" />
                    <Link
                      className="text-1xl"
                      to={`/orchestrator_selection/${"estados"}`}
                    >
                      2
                    </Link>
                  </li>
                  <li
                    className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
                    style={{ color: "white" }}
                  >
                    <FaCheck className="w-4 h-4 mr-2" />
                    <Link
                      className="text-1xl"
                      to={`/orchestrator_selection/${"estados"}`}
                    >
                      3
                    </Link>
                  </li>
                </ul>
              )}

              <ul>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-700"
                  style={{ color: "white" }}
                >
                  <FaCheck className="w-4 h-4 mr-2" />
                  <Link
                    className="text-2xl font-bold"
                    onClick={toggleDropdown3}
                    to={`/orchestrator_selection/${"ejecuciones"}`}
                  >
                    Módulo II:
                  </Link>
                  <a
                    className="ml-auto cursor-pointer"
                    onClick={toggleDropdown3}
                    aria-expanded={isDropdownOpen3}
                    aria-controls="rundeck-isDropdownOpen2"
                  >
                    {isDropdownOpen3 ? (
                      <FiChevronUp className="w-6 h-6" />
                    ) : (
                      <FiChevronDown className="w-6 h-6" />
                    )}
                  </a>
                </li>

                {isDropdownOpen3 && (
                  <ul id="rundeck-isDropdownOpen2">
                    <li
                      className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
                      style={{ color: "white" }}
                    >
                      <FaCheck className="w-4 h-4 mr-2" />
                      <Link
                        className="text-1xl"
                        to={`/orchestrator_selection/${"estados"}`}
                      >
                        1
                      </Link>
                    </li>
                    <li
                      className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
                      style={{ color: "white" }}
                    >
                      <FaCheck className="w-4 h-4 mr-2" />
                      <Link
                        className="text-1xl"
                        to={`/orchestrator_selection/${"estados"}`}
                      >
                        2
                      </Link>
                    </li>
                    <li
                      className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
                      style={{ color: "white" }}
                    >
                      <FaCheck className="w-4 h-4 mr-2" />
                      <Link
                        className="text-1xl"
                        to={`/orchestrator_selection/${"estados"}`}
                      >
                        1
                      </Link>
                    </li>
                  </ul>
                )}
              </ul>

              <ul>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-700"
                  style={{ color: "white" }}
                >
                  <FaCheck className="w-4 h-4 mr-2" />
                  <Link
                    className="text-2xl font-bold"
                    onClick={toggleDropdown4}
                    to={`/orchestrator_selection/${"ejecuciones"}`}
                  >
                    Módulo III:
                  </Link>
                  <a
                    className="ml-auto cursor-pointer"
                    onClick={toggleDropdown4}
                    aria-expanded={isDropdownOpen4}
                    aria-controls="rundeck-isDropdownOpen2"
                  >
                    {isDropdownOpen4 ? (
                      <FiChevronUp className="w-6 h-6 align-left" />
                    ) : (
                      <FiChevronDown className="w-6 h-6 align-left" />
                    )}
                  </a>
                </li>

                {isDropdownOpen4 && (
                  <ul id="rundeck-isDropdownOpen2">
                    <li
                      className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
                      style={{ color: "white" }}
                    >
                      <FaCheck className="w-4 h-4 mr-2" />
                      <Link
                        className="text-1xl"
                        to={`/orchestrator_selection/${"estados"}`}
                      >
                        1
                      </Link>
                    </li>
                    <li
                      className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
                      style={{ color: "white" }}
                    >
                      <FaCheck className="w-4 h-4 mr-2" />
                      <Link
                        className="text-1xl"
                        to={`/orchestrator_selection/${"estados"}`}
                      >
                        2
                      </Link>
                    </li>
                    <li
                      className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
                      style={{ color: "white" }}
                    >
                      <FaCheck className="w-4 h-4 mr-2" />
                      <Link
                        className="text-1xl"
                        to={`/orchestrator_selection/${"estados"}`}
                      >
                        3
                      </Link>
                    </li>
                  </ul>
                )}
              </ul>

              <ul>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-700"
                  style={{ color: "white" }}
                >
                  <FaCheck className="w-4 h-4 mr-2" />
                  <Link
                    className="text-2xl font-bold"
                    onClick={toggleDropdown5}
                    to={`/orchestrator_selection/${"ejecuciones"}`}
                  >
                    Módulo IV:
                  </Link>
                  <a
                    className="ml-auto cursor-pointer"
                    onClick={toggleDropdown5}
                    aria-expanded={isDropdownOpen5}
                    aria-controls="rundeck-isDropdownOpen2"
                  >
                    {isDropdownOpen5 ? (
                      <FiChevronUp className="w-6 h-6" />
                    ) : (
                      <FiChevronDown className="w-6 h-6" />
                    )}
                  </a>
                </li>

                {isDropdownOpen5 && (
                  <ul id="rundeck-isDropdownOpen2">
                    <li
                      className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
                      style={{ color: "white" }}
                    >
                      <FaCheck className="w-4 h-4 mr-2" />
                      <Link
                        className="text-1xl"
                        to={`/orchestrator_selection/${"estados"}`}
                      >
                        1
                      </Link>
                    </li>
                    <li
                      className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
                      style={{ color: "white" }}
                    >
                      <FaCheck className="w-4 h-4 mr-2" />
                      <Link
                        className="text-1xl"
                        to={`/orchestrator_selection/${"estados"}`}
                      >
                        2
                      </Link>
                    </li>
                    <li
                      className="flex items-center px-6 py-3 font-bold text-white hover:text-white hover:bg-blue-700"
                      style={{ color: "white" }}
                    >
                      <FaCheck className="w-4 h-4 mr-2" />
                      <Link
                        className="text-1xl"
                        to={`/orchestrator_selection/${"estados"}`}
                      >
                        3
                      </Link>
                    </li>
                  </ul>
                )}
              </ul>

              {/*next /* */}
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
