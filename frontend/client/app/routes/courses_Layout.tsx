import {
  FiHome,
  FiCompass,
  FiUsers,
  FiLogOut,
  FiChevronDown,
  FiChevronUp,
  FiCodesandbox,
} from "react-icons/fi";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import LogoNTT from "~/images/NTT-Data-Logo.png";
import {
  FaCog,
  FaProjectDiagram,
  FaTasks,
  FaCalendarTimes,
  FaBriefcase,
  FaRavelry,
  FaTumblr,
  FaIndent,
  FaCompass,
  FaPlusCircle,
  FaSyncAlt,
  FaTrashAlt,
  FaKey,
  FaHammer,
  FaClipboardList,
  FaCube,
  FaSatellite,
  FaFileArchive,
  FaBox,
  FaFileAlt,
  FaLock,
  FaUserSecret,
  FaRegCheckCircle,
  FaCheck,
} from "react-icons/fa";
import { IoCloseCircle, IoBookSharp } from "react-icons/io5";

// export const links: LinksFunction = () => [
// { rel: "stylesheet", href: sidebarStyle },
// ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

function Sidebar({ children }: { children: React.ReactNode }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen2, setDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setDropdownOpen4] = useState(false);
  const [isDropdownOpenV, setDropdownOpenV] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    // Obtiene el valor de user_type almacenado en sessionStorage si está disponible
    const storedUserType = sessionStorage.getItem("user_type");
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

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

  const toggleDropdownVault = () => {
    setDropdownOpenV(!isDropdownOpenV);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
  };

  const shouldHideLink = userType !== "ADMIN";

  const renderLink = () => {
    return (
      <>
        <li
          className="flex items-center px-6 py-3 text-blue-300 hover:text-white hover:bg-blue-700"
          style={{ color: "white" }}
        >
          <FaCompass className="w-6 h-6 mr-2" />
          <Link onClick={toggleDropdown3} to={"#"}>
            Orquestadores
          </Link>
          <a
            className="ml-auto cursor-pointer"
            onClick={toggleDropdown3}
            aria-expanded={isDropdownOpen3}
            aria-controls="orquestadores-dropdown"
          >
            {isDropdownOpen3 ? (
              <FiChevronUp className="w-4 h-4" />
            ) : (
              <FiChevronDown className="w-4 h-4" />
            )}
          </a>
        </li>
      </>
    );
  };

  return (
    <aside>
      <div>
        {children}
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
          {/* <div
            className="flex items-center justify-center  text-white font-bold bg-blue-900 py-4 h-15"
            style={{ width: "20%", height: "55px" }}
          >
            {" "}
            <img
              src={LogoNTT}
              alt="Logo de NTT DATA"
              style={{ width: "50%", height: "auto" }}
            />
          </div> */}

          <ul className="flex flex-col flex-1 py-4">
            <li className="flex items-center px-6 py-3 font-bold text-white">
              {" "}
              <h2 className="text-2xl">Curso de Formación Ansible</h2>
            </li>
            <li
              className="flex items-center px-6 py-3 font-bold text-blue-300 hover:text-white hover:bg-blue-700"
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
                id="rundeck-dropdown"
                className="pl-8 py-2 text-blue-300 cursor-pointer"
              >
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-700"
                  style={{ color: "white" }}
                >
                  <FaCheck className="w-4 h-4 mr-2" />
                  <Link
                    className="text-2xl font-bold"
                    onClick={toggleDropdown}
                    to={`/orchestrator_selection/${"ejecuciones"}`}
                  >
                    Módulo I:
                  </Link>
                </li>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-700"
                  style={{ color: "white" }}
                >
                  <FaCheck className="w-4 h-4 mr-2" />
                  <Link
                    className="text-2xl font-bold"
                    to={`/orchestrator_selection/${"jobs"}`}
                  >
                    {" "}
                    Módulo II:
                  </Link>
                </li>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-700"
                  style={{ color: "white" }}
                >
                  <FaCheck className="w-4 h-4 mr-2" />
                  <Link
                    className="text-2xl font-bold"
                    to={`/orchestrator_selection/${"estados"}`}
                  >
                    Módulo III:
                  </Link>
                </li>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-700"
                  style={{ color: "white" }}
                >
                  <FaCheck className="w-4 h-4 mr-2" />
                  <Link
                    className="text-2xl font-bold"
                    to={`/orchestrator_selection/${"timeouts"}`}
                  >
                    Módulo IV:
                  </Link>
                </li>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-700"
                  style={{ color: "white" }}
                >
                  <FaCheck className="w-4 h-4 mr-2" />
                  <Link
                    className="text-2xl font-bold"
                    to={`/orchestrator_selection/${"proyectos"}`}
                  >
                    Módulo V:
                  </Link>
                </li>
              </ul>
            )}

            {/* <li
              className="flex items-center px-6 py-3 text-blue-300 hover:text-white hover:bg-blue-700"
              style={{ color: "white" }}
            >
              <FaKey className="w-6 h-6 mr-2" />
              <Link onClick={toggleDropdownVault} to={"#"}>
                Vault
              </Link>
              <a
                className="ml-auto cursor-pointer"
                onClick={toggleDropdownVault}
                aria-expanded={isDropdownOpenV}
                aria-controls="vault-dropdown"
              >
                {isDropdownOpenV ? (
                  <FiChevronUp className="w-4 h-4" />
                ) : (
                  <FiChevronDown className="w-4 h-4" />
                )}
              </a>
            </li>
            {isDropdownOpenV && (
              <ul
                id="vault-dropdown"
                className="pl-8 py-2 text-blue-300 cursor-pointer"
              >
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-600"
                  style={{ color: "white" }}
                >
                  <FaKey className="w-4 h-4 mr-2" />
                  <Link to={`/orchestrator_selection/${"vault"}`}>
                    Claves en Rundeck
                  </Link>
                </li>
              </ul>
            )}

            <li
              className="flex items-center px-6 py-3 text-blue-300 hover:text-white hover:bg-blue-700"
              style={{ color: "white" }}
            >
              <FaClipboardList className="w-6 h-6 mr-2" />
              <Link onClick={toggleDropdown4} to={"#"}>
                Logs
              </Link>
              <a
                className="ml-auto cursor-pointer"
                onClick={toggleDropdown4}
                aria-expanded={isDropdownOpen4}
                aria-controls="logs-dropdown"
              >
                {isDropdownOpen4 ? (
                  <FiChevronUp className="w-4 h-4" />
                ) : (
                  <FiChevronDown className="w-4 h-4" />
                )}
              </a>
            </li>
            {isDropdownOpen4 && (
              <ul
                id="logs-dropdown"
                className="pl-8 py-2 text-blue-300 cursor-pointer"
              >
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-600"
                  style={{ color: "white" }}
                >
                  <FaRavelry className="w-4 h-4 mr-2" />
                  <Link to={`/logs/${"rundeck"}`}>Rundeck</Link>
                </li>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-600"
                  style={{ color: "white" }}
                >
                  <FaBox className="w-4 h-4 mr-2" />
                  <Link to={`/logs/${"netbox"}`}>Netbox</Link>
                </li>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-600"
                  style={{ color: "white" }}
                >
                  <FaFileAlt className="w-4 h-4 mr-2" />
                  <Link to={`/logs/${"filebrowser"}`}>Filebrowser</Link>
                </li>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-600"
                  style={{ color: "white" }}
                >
                  <FaSatellite className="w-4 h-4 mr-2" />
                  <Link to={`/logs/${"sonarqube"}`}>Sonarqube</Link>
                </li>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-600"
                  style={{ color: "white" }}
                >
                  <FaKey className="w-4 h-4 mr-2" />
                  <Link to={`/logs/${"vault"}`}>Vault</Link>
                </li>
              </ul>
            )} */}

            {/* {renderLink()}
            {isDropdownOpen3 && (
              <ul
                id="orquestadores-dropdown"
                className="pl-8 py-2 text-blue-300 cursor-pointer"
              >
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-600"
                  style={{ color: "white" }}
                >
                  <FaPlusCircle className="w-4 h-4 mr-2" />
                  <Link to={`/registrar_orquestador`}>
                    Registrar orquestador
                  </Link>
                </li>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-600"
                  style={{ color: "white" }}
                >
                  <FaSyncAlt className="w-4 h-4 mr-2" />
                  <Link to={`/actualizar_orquestador`}>
                    Actualizar orquestador
                  </Link>
                </li>
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-600"
                  style={{ color: "white" }}
                >
                  <FaTrashAlt className="w-4 h-4 mr-2" />
                  <Link to={`/eliminar_orquestador`}>Eliminar orquestador</Link>
                </li>
              </ul>
            )}
            <li
              className="flex items-center px-6 py-3 text-blue-300 hover:text-white hover:bg-blue-700"
              style={{ color: "white" }}
            >
              <FaTumblr className="w-6 h-6 mr-2" />
              <Link onClick={toggleDropdown2} to={"#"}>
                Ansible Tower
              </Link>
              <a
                className="ml-auto cursor-pointer"
                onClick={toggleDropdown2}
                aria-expanded={isDropdownOpen2}
                aria-controls="tower-dropdown"
              >
                {isDropdownOpen2 ? (
                  <FiChevronUp className="w-4 h-4" />
                ) : (
                  <FiChevronDown className="w-4 h-4" />
                )}
              </a>
            </li>
            {isDropdownOpen2 && (
              <ul
                id="tower-dropdown"
                className="pl-8 py-2 text-blue-300 cursor-pointer"
              >
                <li
                  className="flex items-center py-1 hover:text-white hover:bg-blue-600"
                  style={{ color: "white" }}
                >
                  <FaHammer className="w-4 h-4 mr-2" />
                  <Link to={"#"}>Próximamente</Link>
                </li>
              </ul>
            )} */}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
