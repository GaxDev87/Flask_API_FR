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

import { FiUser } from "react-icons/fi";
import { FaCog } from "react-icons/fa";
import axios from "axios";

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

import { IoCloseCircle, IoBookSharp } from "react-icons/io5";

import { FaUsers } from "react-icons/fa";
import { RiNumber0 } from "react-icons/ri";

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
          setgroup_Type(user.group_Type);
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
        <h1 className=" mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Mis datos personales
        </h1>
        <h2 className=" text-blue-600 font-bold size-20">
          Nombre: {firstName}
        </h2>
        <h2 className="text-blue-600 font-bold size-20">
          Apellidos: {lastName}
        </h2>
        <h2 className="text-blue-600 font-bold size-20">
          Departamento: {group_Type}
        </h2>
        <h2 className="text-blue-600 font-bold size-20">Correo: {email}</h2>
      </div>
    </Sidebar>
  );
}
