import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRadio,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { cssBundleHref } from "@remix-run/css-bundle";
// import { safeRedirect } from "~/utils";
import registroStyles from "~/styles/survey.css";
import { Navigate } from "react-router-dom";
import { useLocation } from "@remix-run/react";
import { FaCheck } from "react-icons/fa";
import { IoCloseCircle, IoBookSharp } from "react-icons/io5";
import { LinksFunction, json } from "@remix-run/node";
import Modal from "react-modal";
import NTT from "~/images/NTT2.png";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Sidebar from "~/routes/components/Sidebar";
import { Text } from "lucide-react";
import { Button, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";

// import Navbar from "~/components/Navbar";
// import { FaCog } from "react-icons/fa";
// import { FiUser, FiHome } from "react-icons/fi";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: registroStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

// import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
export default function CardWithFeedback(props) {
  const Location = useLocation();
  // console.log(props, "props");
  // console.log(Location, "useLocation Hook");
  const data = Location.state;
  const [isOpen, setIsOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const [courseRank, setCourseRank] = useState("3");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setCourseId(data.course_Id);
    setCourseName(data.course_Name);

    // setCourseDescription(data.course_Description);
  }, []);
  const handleClose = () => {
    setIsOpen(false);
    navigate("/courses_survey", {
      state: { course_Id: courseId, course_Name: courseName },
    });
  };

  const handleChange = (e) => {
    setCourseRank(e.target.value);
    // console.log(courseRank);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    const userId = sessionStorage.getItem("user_id");

    axios
      .post("http://localhost:5000/course_survey_rank", {
        user_Id: userId,
        course_Id: data.course_Id,
        course_Name: courseName,
        course_Rank: courseRank,
        course_Comment: comment,
      })
      .then((response) => {
        setInfo("Respuesta enviada correctamente!");
        setIsOpen(true);
      })
      .catch((error) => {
        setInfo("Ya has enviado una valoración para este curso.");
        setIsOpen(true);
      });
  };

  return (
    <Sidebar>
      <div
        className=" h-full flex justify-left items-left flex-col gap-4"
        style={{
          marginLeft: "280px",

          marginTop: "7%",
        }}
      >
        <div style={{ marginLeft: "60%", marginRight: "250px" }}>
          <form
            className="bg-blue-700"
            style={{ marginTop: "10%", marginLeft: "10%" }}
            // onSubmit={handleSubmit}
          >
            <div className="justify-content-center">
              <img
                className="NTT"
                src={NTT}
                alt="Logo de NTT"
                style={{ width: "50%", height: "auto" }}
              />{" "}
              <h2> Cuestionario de Satisfacción del curso {courseName} </h2>
              {/* <h3>{info}</h3> */}
              {/* <label htmlFor="name">Nombre:</label> */}
              <div className="text-center">
                <MDBIcon far icon="file-alt mb-3 text-primary" size="4x" />{" "}
                <p className="text-1xl text-white font-bold">
                  Nos importa tu opinión. Por favor, valora el contenido de este
                  curso formativo:
                </p>{" "}
              </div>
              <div>
                <label className="text-1xl text-white font-bold">
                  Muy bueno
                </label>
                <input
                  style={{ marginTop: "-4%" }}
                  type="radio"
                  name="courseRank"
                  id="veryGood"
                  className="mb-2"
                  value={"5"}
                  checked={courseRank === "5"}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-1xl text-white font-bold">Bueno</label>
                <input
                  style={{ marginTop: "-5%" }}
                  type="radio"
                  name="courseRank"
                  id="good"
                  value={"4"}
                  className="mb-2"
                  checked={courseRank === "4"}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-1xl text-white font-bold">Neutral</label>
                <input
                  style={{ marginTop: "-5%" }}
                  type="radio"
                  name="courseRank"
                  id="neutral"
                  value={"3"}
                  className="mb-2"
                  checked={courseRank === "3"}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-1xl text-white font-bold">Malo</label>
                <input
                  style={{ marginTop: "-5%" }}
                  type="radio"
                  name="courseRank"
                  id="bad"
                  value={"2"}
                  className="mb-2"
                  checked={courseRank === "2"}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-1xl text-white font-bold">
                  Muy malo
                </label>
                <input
                  style={{ marginTop: "-6%" }}
                  type="radio"
                  name="courseRank"
                  id="veryBad"
                  value={"1"}
                  className="mb-2"
                  checked={courseRank === "1"}
                  onChange={handleChange}
                />
              </div>
              <p className="text-center">
                <strong>
                  {" "}
                  ¿Cómo podemos mejorar el contenido de este curso?{" "}
                </strong>
              </p>
              <textarea
                placeholder="Opcional"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                style={{
                  color: "black",
                  fontSize: "20px",
                  borderRadius: "15px",
                  width: "100%",
                  height: "80%",
                }}
              />
            </div>

            <div>
              <Button onClick={handleSubmit} className="popUpButtonCreate">
                ENVIAR
              </Button>
            </div>

            {/* <button type="submit">ENVIAR</button> */}
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
                {/* {info} */}
              </p>
              <button
                // onClick={handleClose}
                className="popUpButton"
              >
                Aceptar
              </button>
            </Modal>
          </form>
        </div>

        <div
          className=" h-full flex justify-right items-right flex-col gap-4"
          style={{
            marginLeft: "280px",

            marginTop: "7%",
          }}
        >
          <div>
            <div
              className="fixed top-0 center-8 bg-blue-700"
              style={{
                marginTop: "30px",
                height: "100%",
                width: "12%",
                marginLeft: "-11.5%",
              }}
            >
              <ul className="flex flex-col flex-1 py-4">
                <li className="flex items-center px-6 py-3 font-bold text-white">
                  {" "}
                  <h2 className="text-1xl">Curso de Formación {courseName}</h2>
                </li>
                <li
                  className="flex items-center px-6 py-3 font-bold text-blue-300 hover:text-white hover:bg-blue-800"
                  style={{ color: "white" }}
                >
                  <IoBookSharp className="w-6 h-6 mr-2 " />
                  <Link
                    className="text-1xl"
                    // onClick={toggleDropdown}
                    to={"#"}
                  >
                    Módulos del curso:
                  </Link>
                </li>

                <ul
                  id="rundeck-dropdown"
                  className="pl-8 py-2 text-blue-300 cursor-pointer"
                >
                  <li
                    className="flex items-center py-1 hover:text-white hover:bg-blue-800"
                    style={{ color: "white" }}
                  >
                    <FaCheck className="w-4 h-4 mr-2" />
                    <Link
                      className="text-1xl font-bold"
                      // onClick={toggleDropdown}
                      to={"/Python_m1"}
                      state={{
                        // userId: user_Id,
                        // firstName: firstName,
                        // email: email,
                        course_Id: courseId,
                        course_Name: courseName,
                      }}
                    >
                      Módulo I:
                    </Link>
                  </li>
                  <li
                    className="flex items-center py-1 hover:text-white hover:bg-blue-800"
                    style={{ color: "white" }}
                  >
                    <FaCheck className="w-4 h-4 mr-2" />
                    <Link
                      className="text-1xl font-bold"
                      to={"/Python_m2"}
                      state={{
                        // userId: user_Id,
                        // firstName: firstName,
                        // email: email,
                        course_Id: courseId,
                        course_Name: courseName,
                      }}
                    >
                      {" "}
                      Módulo II:
                    </Link>
                  </li>
                  <li
                    className="flex items-center py-1 hover:text-white hover:bg-blue-800"
                    style={{ color: "white" }}
                  >
                    <FaCheck className="w-4 h-4 mr-2" />
                    <Link
                      className="text-1xl font-bold"
                      to={"/Python_m3"}
                      state={{
                        // userId: user_Id,
                        // firstName: firstName,
                        // email: email,
                        course_Id: courseId,
                        course_Name: courseName,
                      }}
                    >
                      Módulo III:
                    </Link>
                  </li>
                  <li
                    className="flex items-center py-1 hover:text-white hover:bg-blue-800"
                    style={{ color: "white" }}
                  >
                    <FaCheck className="w-4 h-4 mr-2" />
                    <Link className="text-1xl font-bold" to={"#"}>
                      Módulo IV:
                    </Link>
                  </li>
                  <li
                    className="flex items-center py-1 hover:text-white hover:bg-blue-800"
                    style={{ color: "white" }}
                  >
                    <FaCheck className="w-4 h-4 mr-2" />
                    <Link className="text-1xl font-bold" to={"#"}>
                      Módulo V:
                    </Link>
                  </li>

                  <li
                    className="flex items-center py-1 hover:text-white hover:bg-blue-700"
                    style={{ color: "white" }}
                  >
                    <FaCheck className="w-4 h-4 mr-2" />
                    <Link
                      className="text-1xl font-bold"
                      to={"/python_survey"}
                      state={{
                        // userId: user_Id,
                        // firstName: firstName,
                        // email: email,
                        course_Id: courseId,
                        course_Name: courseName,
                      }}
                    >
                      Encuesta de Satisfacción del curso
                    </Link>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
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
