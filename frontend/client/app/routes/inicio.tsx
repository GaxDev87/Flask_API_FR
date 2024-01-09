import React, { useState } from "react";
import axios from "axios";
import { cssBundleHref } from "@remix-run/css-bundle";
import inicioStyles from "~/styles/inicio.css";
import { LinksFunction, json } from "@remix-run/node";
import Modal from "react-modal";
import NTT from "~/images/NTT2.png";
import { Link } from "@remix-run/react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: inicioStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const Inicio = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      axios
        .post("http://localhost:5000/login", {
          email: email,
          password: password,
        })
        .then(
          (response) => {
            console.log(response.data);
            if (response.data == false) {
              console.log("Error: usuario o contraseña inválidos");
              setInfo("Error: Usuario o contraseña inválidos");
              setIsOpen(true);
            } else {
              console.log("Inicio de sesión correcto");

              // Storing session id and user type after login

              sessionStorage.setItem("user_id", response.data["id"]);
              sessionStorage.setItem("user_Type", response.data["user_Type"]);
              sessionStorage.setItem("Name", response.data["Name"]);
              const sessionId = sessionStorage.getItem("user_id");
              const user_type = sessionStorage.getItem("user_Type");
              const userName = sessionStorage.getItem("Name");

              console.log(sessionId);

              if (user_type == "Administrador")
                location.href = "/Admin_usuarios";
              else location.href = "/Dashboard";
            }
          },
          (error) => {
            console.log(error);
            setInfo("Error: Usuario o contraseña inválidos");
            setIsOpen(true);
          }
        );
    } catch (error) {
      console.log(error);
      setInfo("Error: Usuario o contraseña inválidos");
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
        <h2>INICIO DE SESIÓN</h2>
        <h3>{info}</h3>
        <input
          type="text"
          placeholder="Introduzca su nombre de usuario"
          id="email"
          value={email}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Introduzca su contraseña"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">INICIAR SESIÓN</button>

      <div className="contrasena">
        <Link to="#"> Olvidaste tu contraseña?</Link>
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
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "22px" }}
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

export default Inicio;
