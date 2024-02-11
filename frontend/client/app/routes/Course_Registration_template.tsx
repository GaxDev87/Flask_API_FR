import { Layout } from "./components/layout";
import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import cursoStyles from "~/styles/gestionar_cursos.css";
import { LinksFunction, json } from "@remix-run/node";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-modal";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cursoStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];
// useEffect(() => {}, []);

export default function Course_Template(props) {
  const location = useLocation();
  console.log(props, "props");
  console.log(location, "useLocation Hook");
  const data = location.state;
  const [firstName, setFirstName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseId, setCourseId] = useState(0);
  const [courseEmail, setCourseEmail] = useState("");

  // const firstName = data.firstName;
  // const course_Name = data.course_Name;
  // const course_Description = data.course_Description;
  const [info, setInfo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setFirstName(data.firstName);
    setCourseName(data.course_Name);
    setCourseDescription(data.course_Description);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleClickRegister = () => {
    // console.log(course_Id);
    // console.log(email);

    try {
      // setCourseId(data.course_Id);
      // setCourseEmail(data.email);

      axios
        .post("http://localhost:5000/course_enrollment", {
          course_Id: data.course_Id,
          email: data.email,
        })
        .then(
          (response) => {
            console.log(response);
            if (response.data == false) {
              // console.log("Error: no se ha podido registrar correctamente");
              setInfo(
                "Error: No se ha podido registrar el curso correctamente"
              );
            } else {
              // console.log("Usuario añadido correctamente");
              setInfo("Te has registrado en el curso correctamente!");
            }
          },
          (error) => {
            console.log(error);
            setInfo("Ya te has registrado en este curso");
          }
        );
    } catch (error) {
      console.log(error);
      setInfo("Error: No se ha podido registrar el curso correctamente");
    }
    setIsOpen(true);
  };

  return (
    <Sidebar>
      <div
        style={{ marginLeft: "280px", marginRight: "250px", marginTop: "7%" }}
      >
        <h1 className="text-3xl font-bold text-white bg-blue-600">
          Hola {firstName}, a continuación te ofrecemos los detalles del curso:{" "}
          <p>{courseName}</p>
          <br></br>
          <p className="text-3xl font-bold text-white">Descripción:</p>
          <br></br>
          <div>
            <p>{courseDescription}</p>
          </div>
        </h1>

        <br></br>

        <div>
          <button
            onClick={() => handleClickRegister()}
            // state={{
            //   course_Id: item.curso.course_Id,
            //   course_Name: item.curso.course_Name,
            //   department_Name: item.curso.department_Name,
            // }} // onClick={() =>
            //   handleClickCourse(
            //     item.curso.course_Id,
            //     item.curso.course_Name,
            //     item.curso.department_Name
            //   )
            // }
            className="Register_course"
          >
            REGISTRARME
          </button>
        </div>

        <Modal
          isOpen={isOpen}
          onRequestClose={handleClose}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              padding: "20px",
              height: "300px",
              maxWidth: "500px",
              width: "100%",
            },
          }}
        >
          <h4
            style={{
              textAlign: "center",
              marginRight: "40px",
              fontSize: "30px",
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
      </div>
    </Sidebar>
  );
}
