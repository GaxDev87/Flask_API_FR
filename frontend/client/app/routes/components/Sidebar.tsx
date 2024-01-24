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
import LogoNTT from "~/images/NTT2.png";
import { GiExitDoor } from "react-icons/gi";
import { AiFillExperiment, AiOutlineHome } from "react-icons/ai";
import { BiSolidBookReader } from "react-icons/bi";

import { RxDashboard } from "react-icons/rx";
import Navbar from "./Navbar";
import styles from "~/styles/app.css";
import {} from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";

import { FiUser } from "react-icons/fi";
import { FaCog } from "react-icons/fa";
import axios from "axios";

import { User } from "./user_interface";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";

import { IoCloseCircle, IoBookSharp } from "react-icons/io5";

import { FaUsers } from "react-icons/fa";
import { RiNumber0 } from "react-icons/ri";

// export const links: LinksFunction = () => [
// { rel: "stylesheet", href: sidebarStyle },
// ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

function Sidebar({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const menuOptions = [
    { path: "/", icon: <FaCog /> },
    { path: "/Micuenta", icon: <FaCircleUser /> },
    { path: "/", icon: <AiOutlineHome /> },
  ];

  const [user_Id, setId] = useState(RiNumber0);
  const [firstName, setName] = useState("");
  const [lastName, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [user_type, setType] = useState("");
  const [info, setInfo] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  useEffect(() => {
    try {
      // Para recuperar el ID del usuario que ha iniciado sesion
      const userId = sessionStorage.getItem("user_id");

      console.log(userId);

      axios.get("http://localhost:5000/users/" + userId).then(
        (response) => {
          const data = response.data;
          const user: User = {
            id: data["user_Id"],
            firstName: data["firstName"],
            lastName: data["lastName"],
            email: data["email"],
            group_Type: data["group_Type"],
            user_Type: data["user_Type"],
          };

          setId(user.id);
          setName(user.firstName);
          setSurname(user.lastName);
          setEmail(user.email);
          setType(user.user_Type);
        },
        (error) => {
          console.log(error);
          setInfo(
            "Error: La información del usuario no se ha podido obtener correctamente"
          );
          setIsOpen(true);
        }
      );
    } catch (error) {
      console.log(error);
      setInfo(
        "Error: La información del usuario no se ha podido obtener correctamente"
      );
      setIsOpen(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user_Id");
  };

  if (user_type !== "Administrador") {
    return (
      <aside>
        <div>
          <Navbar
            title={"Hola " + firstName + ", te damos la bienvenida!"}
            options={menuOptions}
          />

          <div
            className="fixed top-0 left-0 w-60 bg-blue-800"
            style={{
              zIndex: "9999",
              overflowY: "auto",
              height: "110%",
              overflowX: "hidden",
            }}
          >
            <div
              className="flex items-center justify-center bg-blue-900 py-4 h-15"
              style={{ width: "240px", height: "55px" }}
            >
              <img
                src={LogoNTT}
                alt="Logo de NTT DATA"
                style={{ width: "50%", height: "auto" }}
              />
            </div>
            <ul className="flex flex-col flex-1 py-4">
              <li
                className="flex items-center px-6 py-3 text-blue-300 hover:text-white hover:bg-blue-700"
                style={{ color: "white" }}
              >
                <RxDashboard className="w-6 h-6 mr-2" />
                <Link to={`/dashboard`}> Dashboard </Link>
              </li>

              <li
                className="flex items-center px-6 py-3 text-blue-300 hover:text-white hover:bg-blue-700"
                style={{ color: "white" }}
              >
                <BiSolidBookReader className="w-6 h-6 mr-2" />
                <Link to={`/Cursos_disponibles`}>Visualizar cursos</Link>
              </li>

              <li
                className="flex items-center px-6 py-3 text-blue-300 hover:text-white hover:bg-blue-700"
                style={{ color: "white" }}
              >
                <IoBookSharp className="w-6 h-6 mr-2" />
                <Link to={`/cursos`}>Mis cursos</Link>
              </li>

              <li
                className="flex items-center px-6 py-3 text-blue-300 hover:text-white hover:bg-blue-700"
                style={{ color: "white" }}
              >
                <AiFillExperiment className="w-6 h-6 mr-2" />
                <Link to={`/...`}>Mis laboratorios</Link>
              </li>
            </ul>

            <ul>
              <li
                className="fixed bottom-0 flex items-center justify-left text-blue-300 hover:text-white hover:bg-blue-700"
                style={{
                  height: "12%",
                  width: "240px",
                  color: "white",
                  zIndex: "9997",
                }}
                onClick={handleLogout}
              >
                <IoCloseCircle className="w-6 h-6 mr-2" />
                <Link to="/inicio">Cerrar sesión</Link>
              </li>
            </ul>
          </div>

          {children}
        </div>
      </aside>
    );
  }

  {
    return (
      <aside>
        <div>
          <Navbar
            title={"Hola " + firstName + ", te damos la bienvenida!"}
            options={menuOptions}
          />

          <div
            className="fixed top-0 left-0 w-60 bg-blue-800"
            style={{
              zIndex: "9999",
              overflowY: "auto",
              height: "110%",
              overflowX: "hidden",
            }}
          >
            <div
              className="flex items-center justify-center bg-blue-900 py-4 h-15"
              style={{ width: "240px", height: "55px" }}
            >
              <img
                src={LogoNTT}
                alt="Logo de NTT DATA"
                style={{ width: "50%", height: "auto" }}
              />
            </div>
            <ul className="flex flex-col flex-1 py-4">
              <li
                className="flex items-center px-6 py-3 text-blue-300 hover:text-white hover:bg-blue-700"
                style={{ color: "white" }}
              >
                <FaUsers className="w-6 h-6 mr-2" />

                <Link to={`/Admin_usuarios`}> Gestión de usuarios </Link>
              </li>

              <li
                className="flex items-center px-6 py-3 text-blue-300 hover:text-white hover:bg-blue-700"
                style={{ color: "white" }}
              >
                <IoBookSharp className="w-6 h-6 mr-2" />
                <Link to={`/Admin_cursos`}>Gestión de Cursos</Link>
              </li>

              <li
                className="flex items-center px-6 py-3 text-blue-300 hover:text-white hover:bg-blue-700"
                style={{ color: "white" }}
              >
                <AiFillExperiment className="w-6 h-6 mr-2" />
                <Link to={`/...`}>Gestión de Laboratorios</Link>
              </li>
            </ul>

            <ul>
              <li
                className="fixed bottom-0 flex items-center justify-left text-blue-300 hover:text-white hover:bg-blue-700"
                style={{
                  height: "12%",
                  width: "240px",
                  color: "white",
                  zIndex: "9997",
                }}
                onClick={handleLogout}
              >
                <IoCloseCircle className="w-6 h-6 mr-2" />
                <Link to="/inicio">Cerrar sesión</Link>
              </li>
            </ul>
          </div>

          {children}
        </div>
      </aside>
    );
  }
}

export default Sidebar;
