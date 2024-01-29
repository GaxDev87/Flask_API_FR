import {
  FiHome,
  FiCompass,
  FiUsers,
  FiLogOut,
  FiChevronDown,
  FiChevronUp,
  FiCodesandbox,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import LogoNTT from "~/images/NTT2.png";
import { GiExitDoor } from "react-icons/gi";
import { AiFillExperiment, AiOutlineHome } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import Sidebar from "./components/Sidebar";
import styles from "~/styles/app.css";
import {} from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import gestionarUsuariosStyles from "~/styles/gestionar_usuarios.css";

import { FiUser } from "react-icons/fi";
import { FaCog } from "react-icons/fa";
import axios from "axios";
import { LinksFunction, json } from "@remix-run/node";

import { useNavigate } from "react-router-dom";

import { User } from "./components/user_interface";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";

import { cssBundleHref } from "@remix-run/css-bundle";

import { FaUsers } from "react-icons/fa";
import { RiNumber0 } from "react-icons/ri";
import { Table } from "flowbite-react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: gestionarUsuariosStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function Mi_cuenta() {
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
  const [group_Type, setgroup_Type] = useState("");
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
            user_Id: data["user_Id"],
            firstName: data["firstName"],
            lastName: data["lastName"],
            email: data["email"],
            // group_Type: data["group_Type"],
            user_Type: data["user_Type"],
          };

          setId(user.user_Id);
          setName(user.firstName);
          setSurname(user.lastName);
          // setgroup_Type(user.group_Type);
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
  return (
    <Sidebar>
      <div
        className=" h-full flex justify-center items-center flex-col gap-4"
        style={{ marginLeft: "300px", width: "600px", height: "500px" }}
      >
        {" "}
        <h2 className=" mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-600 md:text-5xl lg:text-4xl dark:text-white">
          Mis Datos:
        </h2>
        <table>
          <tr>
            <th>Nombre:</th>
            <td>{firstName}</td>
          </tr>
          <tr>
            <th>Apellidos:</th>
            <td>{lastName}</td>
          </tr>
          <tr>
            <th>Area:</th>
            <td>{group_Type}</td>
          </tr>

          <tr>
            <th>Correo:</th>
            <td>{email}</td>
          </tr>
        </table>
        <button
          style={{
            marginLeft: "20px",

            borderRadius: "5px",
          }}
        >
          Editar
        </button>
      </div>
    </Sidebar>
  );
}
