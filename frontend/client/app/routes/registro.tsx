import React, { useState } from "react";
import axios from "axios";
import { cssBundleHref } from "@remix-run/css-bundle";
// import { safeRedirect } from "~/utils";
import registroStyles from "~/styles/registro.css";
import { Navigate } from "react-router-dom";

import { LinksFunction, json } from "@remix-run/node";
import Modal from "react-modal";
import NTT from "~/images/NTT2.png";
import { useNavigate } from "react-router-dom";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Layout } from "./layout";
// import Navbar from "~/components/Navbar";
// import { FaCog } from "react-icons/fa";
// import { FiUser, FiHome } from "react-icons/fi";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: registroStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const Registro_user = () => {
  const [firstName, setName] = useState("");
  const [lastName, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  //const [user_type, setType] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar_password, setConfirmarPassword] = useState("");
  const [info, setInfo] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    if (password != confirmar_password) {
      event.preventDefault();
      console.log("Error: La contraseña no coincide con su confirmación");
      setInfo("Error: La contraseña no coincide con su confirmación");
      setIsOpen(true);
    } else {
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

      // Validación de la contraseña
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      const isValidPass = passwordRegex.test(password);
      setIsValidPassword(isValidPass);

      if (!isValidPass) {
        console.log("Contraseña no válida");
        setInfo(
          "Error: Por favor, introduzca una contraseña válida. Requisitos: La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (por ejemplo, !@#$%^&*)."
        );
        setIsOpen(true);
        return;
      }

      // Validación de la presencia del nombre
      let nombre_sin_espacios = firstName.trim();
      if (nombre_sin_espacios === "") {
        console.log("Por favor, introduzca su nombre");
        setInfo("Por favor, introduzca su nombre");
        setIsOpen(true);
        return;
      }

      try {
        axios
          .post("http://localhost:5000/user", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            department: department,
            password: password,
          })
          .then(
            (response) => {
              console.log(response);
              if (response.data == false) {
                console.log(
                  "Error: el nuevo usuario no se ha podido crear correctamente"
                );
                setInfo(
                  "Error: El nuevo usuario no se ha podido crear correctamente"
                );
              } else {
                console.log("Usuario añadido correctamente");
                setInfo("Usuario creado correctamente");
                navigate("/inicio")


              }
            },
            (error) => {
              console.log(error);
              setInfo(
                "Error: El nuevo usuario no se ha podido crear correctamente"
              );
            }
          );
      } catch (error) {
        console.log(error);
        setInfo("Error: El nuevo usuario no se ha podido crear correctamente");
      }
      setIsOpen(true);
    }
  };

  const handleClose = () => {   

    setIsOpen(false);
    

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <img
          src={NTT}
          alt="Logo de NTT"
          style={{ width: "50%", height: "auto" }}
        />{" "}
        <h2> REGISTRO DE USUARIO</h2>
        <h3>{info}</h3>
        {/* <label htmlFor="name">Nombre:</label> */}
        <input
          type="text"
          placeholder="Introduzca su nombre"
          id="name"
          value={firstName}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        {/* <label htmlFor="surname">Apellidos:</label> */}
        <input
          type="text"
          placeholder="Introduzca sus apellidos"
          id="surname"
          value={lastName}
          onChange={(event) => setSurname(event.target.value)}
        />
      </div>
      <div>
        {/* <label htmlFor="email">Correo Electrónico:</label> */}
        <input
          type="text"
          placeholder="Introduzca su correo electrónico"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div>
        {/* <label htmlFor="password">Contraseña:</label> */}
        <input
          type="password"
          placeholder="Introduzca su contraseña"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        {/* <label htmlFor="confirmar_password">Confirmar contraseña:</label> */}
        <input
          type="password"
          placeholder="Vuelva a introducir su contraseña"
          id="confirmar_password"
          value={confirmar_password}
          onChange={(event) => setConfirmarPassword(event.target.value)}
        />
      </div>

      <button type="submit">REGISTRAR USUARIO</button>
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
    </form>
  );
};

export default Registro_user;
