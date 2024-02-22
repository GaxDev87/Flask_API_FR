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
import Navbar from "./components/Navbar";
import Modal from "react-modal";
import { FaCog, FaSave, FaTrash, FaUserCircle } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import PerfilStyles from "~/styles/perfil.css";
import { Button, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";

import { FiUser } from "react-icons/fi";
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
  { rel: "stylesheet", href: PerfilStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function Mi_cuenta() {
  const Location = useLocation();
  const menuOptions = [
    // { path: "/", icon: <FaCog /> },
    { path: "/Micuenta", icon: <FaCircleUser /> },
    { path: "/", icon: <AiOutlineHome /> },
  ];

  const [user_Id, setId] = useState(0);
  const [firstName, setName] = useState("");
  const [lastName, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [group_Type, setgroup_Type] = useState("");
  const [user_type, setType] = useState("");
  const [info, setInfo] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Para recuperar el ID del usuario que ha iniciado sesion
      const userId = sessionStorage.getItem("user_id");

      // console.log(userId);

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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    setIsValidEmail(isValidEmail);

    if (!isValidEmail) {
      console.log("Email no válido");
      setInfo("Error: Por favor, introduzca una dirección de email válida");
      setIsOpen(true);
      return;
    }

    // Validación de la presencia del username
    let username_sin_espacios = firstName.trim();
    if (username_sin_espacios === "") {
      console.log("Por favor, introduzca su nombre de usuario");
      setInfo("Por favor, introduzca su nombre de usuario");
      setIsOpen(true);
      return;
    }

    // Validación de la presencia del nombre
    let nombre_sin_espacios = lastName.trim();
    if (nombre_sin_espacios === "") {
      console.log("Por favor, introduzca su nombre");
      setInfo("Por favor, introduzca su nombre");
      setIsOpen(true);
      return;
    }

    try {
      const userId = sessionStorage.getItem("user_id");

      axios
        .put("http://localhost:5000/update_user_account/" + user_Id, {
          firstName: firstName,
          lastName: lastName,
          email: email,
        })
        .then(
          (response) => {
            // console.log(response);
            if (response.data == false) {
              console.log(
                "Error: el usuario no se ha podido actualizar correctamente"
              );
              setInfo(
                "Error: El usuario no se ha podido actualizar correctamente"
              );
            } else {
              console.log("Usuario actualizado correctamente!");
              setInfo("Usuario actualizado correctamente!");
            }
          },
          (error) => {
            console.log(error);
            setInfo(
              "Error: El usuario no se ha podido actualizar correctamente"
            );
          }
        );
    } catch (error) {
      console.log(error);
      setInfo("Error: El usuario no se ha podido actualizar correctamente");
    }

    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/Micuenta");
  };

  const handleCloseCancel = () => {
    navigate("/Micuenta");
    setIsOpenConfirm(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user_Id");
  };

  const handleCloseConfirm = () => {
    setId(user_Id);
    const data = {
      user_Id: user_Id,
    };

    setIsOpenConfirm(false);

    axios
      .delete("http://localhost:5000/delete/" + user_Id)
      .then((response) => {
        setInfo("Cuenta de usuario eliminada correctamente");
        setIsOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setInfo("Fallo al eliminar el cuenta de usuario");
        setIsOpen(true);
      });
  };

  const eliminarPerfil = () => {
    setInfo("¿Está seguro de que desea eliminar su perfil de usuario?");
    setIsOpenConfirm(true);
  };
  return (
    <Sidebar>
      <Navbar title="PERFIL DE USUARIO" options={menuOptions} />

      <div
        className=" h-full flex justify-center items-center flex-col gap-4"
        style={{ marginLeft: "300px", width: "600px", height: "500px" }}
      >
        <h1
          style={{ marginLeft: "280%", width: "70%", borderRadius: "15px" }}
          className="text-3xl font-bold text-white bg-blue-600 align-middle"
        >
          <p
            style={{
              paddingBottom: "15px",
            }}
          >
            DATOS DE MI CUENTA{" "}
          </p>
        </h1>

        <form onSubmit={handleSubmit}>
          <FaUserCircle
            style={{
              marginLeft: "270px",
              marginBottom: "20px",
              width: "120px",
              height: "120px",
            }}
          />
          <div>
            <h2 style={{ marginLeft: "270px", width: "120px" }}>
              Hola {firstName}
            </h2>
            {/* <h3>{info}</h3> */}

            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              placeholder="Introduzca su nombre"
              id="name"
              value={firstName}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="surname">Apellidos:</label>
            <input
              type="text"
              placeholder="Introduzca sus apellidos"
              id="surname"
              value={lastName}
              onChange={(event) => setSurname(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="text"
              placeholder="Introduzca su dirección de correo electrónico"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="button-container">
            <Button type="submit" className="save-button">
              <span className="button-icon">
                <FaSave />
              </span>
              Guardar cambios
            </Button>
            <Button
              type="button"
              className="delete-button"
              onClick={eliminarPerfil}
            >
              <span className="button-icon">
                <FaTrash />
              </span>
              Eliminar perfil
            </Button>
          </div>
          <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={{
              overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
              content: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                padding: "20px",
                maxWidth: "550px",
                width: "100%",
                height: "300px",
                maxHeight: "600px",
              },
            }}
          >
            <h4
              style={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "bold",
                color: "#141048",
              }}
            >
              AVISO
            </h4>
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              {info}
            </p>
            <button onClick={handleClose} className="popUpButton">
              Aceptar
            </button>
          </Modal>
          <Modal
            isOpen={isOpenConfirm}
            onRequestClose={handleCloseCancel}
            style={{
              overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
              content: {
                position: "absolute",
                top: "50%",
                left: "750px",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                padding: "20px",
                height: "300px",
                maxWidth: "700px",
                width: "100%",
              },
            }}
          >
            <h4
              style={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "bold",
                color: "#141048",
              }}
            >
              AVISO
            </h4>
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              {info}
            </p>
            <button onClick={handleCloseConfirm} className="popUpButton2">
              Aceptar
            </button>
            <button onClick={handleCloseCancel} className="popUpButton2">
              Cancelar
            </button>
          </Modal>
        </form>
      </div>
    </Sidebar>
  );
}
