import React, { useState } from "react";
import axios from "axios";

// import { safeRedirect } from "~/utils";
import registroStyles from "~/styles/registro.css";
import { cssBundleHref } from "@remix-run/css-bundle";
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
// import Navbar from "~/components/Navbar";
// import { FaCog } from "react-icons/fa";
// import { FiUser, FiHome } from "react-icons/fi";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: registroStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const Forgot_password = () => {
  const [email, setEmail] = useState("");
  const [userdata, setUserData] = useState("");
  const [info, setInfo] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    {
      event.preventDefault();

      // Validación del email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);
      setIsValidEmail(isValidEmail);

      if (!isValidEmail) {
        setInfo("Error: Por favor, introduzca una dirección de email válida");
        setIsOpen(true);
        return;
      }
    }

    try {
      axios
        .post("http://localhost:5000/forgotpassword", {
          email: email,
        })
        .then((response) => setUserData(response.data));
      {
        setInfo("Se ha verificado el correo y token creado. En prueba!");
        // axios.post("http://localhost:5000/verify_reset_token", {
        //   user_Id: userdata.user,
        //   user_token: userdata.token,
        // }); // Fetch data based on the current page
        // // .then((response) => setCoursesData(response.data)); // Parse the response as JSON

        setIsOpen(true);
      }
    } catch (error) {
      console.log(error);
      setInfo("Error: No se ha podido verificado");
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("#");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <img
          src={NTT}
          alt="Logo de NTT"
          style={{ width: "50%", height: "auto" }}
        />{" "}
        <h2> Cambiar Contraseña</h2>
        <h2>
          Escribe el correo electrónico asociadado a tu cuenta. Recibirás un
          enlance para cambiar tu contraseña.
        </h2>
        {/* <label htmlFor="name">Nombre:</label> */}
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

      <button type="submit">Enviar</button>
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

export default Forgot_password;
