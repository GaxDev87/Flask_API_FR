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
import { FaTrash } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { IoAddOutline } from "react-icons/io5";
import { Button, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cursoStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function Document(props) {
  const Location = useLocation();
  console.log(props, "props");
  console.log(Location, "useLocation Hook");
  const data = Location.state;

  const [info, setInfo] = useState("");
  const [isEditOpen, setEditOpen] = useState(false);
  const [isCreatetDocumentOpen, setisCreatetDocumentOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isClosedCreatetOpen, setClosedCreatetOpen] = useState(false);

  const [user_Id, setId] = useState(0);
  //   const [firstName, setName] = useState("");
  const [lastName, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [group_Type, setgroup_Type] = useState("");
  const [user_type, setType] = useState("");

  // const [info, setInfo] = useState("");
  // const [isValidEmail, setIsValidEmail] = useState(true);
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const [courseId, setCourseId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [documentId, setDocumentId] = useState(0);
  const [documentName, setDocumentName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseName, setCourseName] = useState("");

  const [documentURL, setDocumentURL] = useState("");
  const navigate = useNavigate();

  const [CourseDocuments, setCourseDocuments] = useState([]);

  //   const navigate = useNavigate();

  //   const [courseData, setCourseData] = useState<
  //     {
  //       curso: Course;
  //     }[]
  //   >([]);
  //   const data = useLoaderData();
  //   let courses_data = data["data_response"];

  // const [coursesList, setCourses] = useState([]);

  // State to hold fetched thematic data

  const getCourseDocumentsAPI = () => {
    fetch("http://localhost:5000/course_document/" + data.course_Id) // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setCourseDocuments(data); // Set the fetched data
      });
  };

  useEffect(() => {
    // setCourseId(data.course_Id);
    setCourseName(data.course_Name);
    getCourseDocumentsAPI();
  }, []);
  // Trigger fetching method on component mount

  const handleSubmitDocument = async (event: {
    preventDefault: () => void;
  }) => {
    let documento_curso_sin_espacios = documentName.trim();
    let documento_URL_sin_espacios = documentURL.trim();

    if (documento_curso_sin_espacios === "") {
      setInfo("Por favor, introduzca el nombre del documento");
      setClosedCreatetOpen(true);

      return;
    }

    if (documento_URL_sin_espacios === "") {
      setInfo("Por favor, introduzca la URL del documento");

      setClosedCreatetOpen(true);

      return;
    }

    try {
      // setInfo("course_Id " + data.course_Id);
      // setInfo("document_Name" + documentName);
      // // setInfo("document_Url" + documentURL);

      // setIsOpen(true);

      axios
        .post("http://localhost:5000/document", {
          course_Id: data.course_Id,
          document_Name: documentName,
          document_Url: documentURL,
        })
        .then((response) => {
          setInfo("Documento creado correctamente!");
          setIsOpen(true);
          //   useEffect(() => {
          //     // Fetch data using Promise with the Fetch API

          //     // Trigger fetching method on component mount
          //     getCourseDocumentsAPI();
          //   }, []);
        })
        .catch((error) => {
          setInfo("Fallo al crear el documento");
          setIsOpen(true);
        });
    } catch {}
  };

  const handleClickEdit = (
    document_Id: number,
    document_Name: string,
    document_Url: string
  ) => {
    setDocumentId(document_Id);
    setDocumentName(document_Name);
    setDocumentURL(document_Url);

    // setInfo("Editando curso " + course_Name);
    setEditOpen(true);
  };

  const handleClose = () => {
    location.href = "/Documents"; // Actualizar la tabla después
    getCourseDocumentsAPI();

    setIsOpen(false);
  };

  const handleCloseCreate = () => {
    setClosedCreatetOpen(false);
    setisCreatetDocumentOpen(true); // location.href = "/Admin_cursos"; // Actualizar tabla cursos
  };

  const handleCloseCancel = () => {
    location.href = "/Documents"; // Actualizar la tabla después
    getCourseDocumentsAPI();
    setIsOpenConfirm(false);
  };

  const handleClickDelete = (id: number) => {
    setDocumentId(id);
    setInfo("¿Está seguro de que desea eliminar el documento " + id + "?");
    setIsOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    const data = {
      documentId: documentId,
    };

    setIsOpenConfirm(false);

    axios
      .delete("http://localhost:5000/delete_document/" + documentId)
      .then((response) => {
        setInfo("Documento eliminado correctamente!");
        setIsOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setInfo("Fallo al eliminar el documento" + documentId);
        setIsOpen(true);
      });
  };

  const handleClickUpdate = () => {
    axios
      .put("http://localhost:5000/update_document/" + documentId, {
        document_Name: documentName,
        document_Url: documentURL,
      })
      .then((response) => {
        setInfo("Documento actualizado correctamente!");
        setIsOpen(true);
      })
      .catch((error) => {
        setInfo("Fallo al actualizar el documento");
        setIsOpen(true);
      });
  };

  const handleClickAdd = () => {
    // setInfo("Editando usuario " + id);
    setisCreatetDocumentOpen(true);
  };

  if (CourseDocuments.map == null) {
    return (
      <Sidebar>
        <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
          <h1
            style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
            className="text-3xl font-bold text-blue-700"
          >
            DOCUMENTOS DEL CURSO {courseName}{" "}
          </h1>
          <table>
            <thead>
              <tr>
                <td>
                  <Button onClick={handleClickAdd} className="AddLink">
                    ANADIR NUEVO DOCUMENTO <IoAddOutline />
                  </Button>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>ID del Documento</th>
                <th> Nombre del Documento</th>
                <th> URL del Documento</th>

                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <input
                    style={{
                      width: "250px",
                      backgroundColor: "white",
                      textAlign: "center",
                      fontSize: "25px",
                      borderRadius: "15px",
                      marginLeft: "70px",
                    }}
                    name="searcherId"
                    // value={searchId}
                    className="search"
                    // onChange={handleChangeId}
                  ></input>
                </th>
                <th>
                  <input
                    style={{
                      backgroundColor: "white",
                      textAlign: "center",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                    name="searchName"
                    // value={searchFirstName}
                    className="search"
                    // onChange={handleChangeFirstName}
                  ></input>
                </th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </tbody>
            <Modal
              isOpen={isCreatetDocumentOpen}
              onRequestClose={handleClose}
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                  padding: "20px",
                  height: "570px",
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
                {" "}
                CREAR DOCUMENTO
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
              <form className="max-w-sm mx-auto bg">
                <div>
                  <label htmlFor="documentName">Nombre del Documento:</label>
                  <input
                    style={{
                      marginTop: "20px",
                      backgroundColor: "skyblue",
                      textAlign: "center",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                    type="text"
                    id="documentName"
                    value={documentName}
                    onChange={(event) => setDocumentName(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="document_URL">URL del Documento:</label>
                  <input
                    style={{
                      backgroundColor: "skyblue",
                      textAlign: "center",
                      marginTop: "20px",
                      fontSize: "25px",
                      borderRadius: "15px",
                    }}
                    type="text"
                    id="documentURL"
                    value={documentURL}
                    onChange={(event) => setDocumentURL(event.target.value)}
                  />
                </div>

                <div>
                  <Button
                    onClick={handleSubmitDocument}
                    className="popUpButtonCreate"
                  >
                    CREAR
                  </Button>
                  <Button
                    onClick={handleCloseCancel}
                    className="popUpButtonCancel"
                  >
                    CANCELAR
                  </Button>
                </div>
              </form>
            </Modal>

            <Modal
              isOpen={isOpenConfirm}
              onRequestClose={handleCloseCancel}
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
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
              <button onClick={handleCloseConfirm} className="popUpButton2">
                Aceptar
              </button>
              <button onClick={handleCloseCancel} className="popUpButton2">
                Cancelar
              </button>
            </Modal>
          </table>

          <Modal
            isOpen={isClosedCreatetOpen}
            onRequestClose={handleCloseCreate}
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
            <Button onClick={handleCloseCreate} className="popUpButton">
              Aceptar
            </Button>
          </Modal>

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
  return (
    <Sidebar>
      <div style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}>
        <h1
          style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%" }}
          className="text-3xl font-bold text-blue-700"
        >
          DOCUMENTOS DEL CURSO {courseName}{" "}
        </h1>
        <table>
          <thead>
            <tr>
              <td>
                <Button onClick={handleClickAdd} className="AddLink">
                  ANADIR NUEVO DOCUMENTO <IoAddOutline />
                </Button>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>ID del Documento</th>
              <th> Nombre del Documento</th>
              <th> URL del Documento</th>

              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <input
                  style={{
                    width: "250px",
                    backgroundColor: "white",
                    textAlign: "center",
                    fontSize: "25px",
                    borderRadius: "15px",
                    marginLeft: "70px",
                  }}
                  name="searcherId"
                  // value={searchId}
                  className="search"
                  // onChange={handleChangeId}
                ></input>
              </th>
              <th>
                <input
                  style={{
                    backgroundColor: "white",
                    textAlign: "center",
                    fontSize: "25px",
                    borderRadius: "15px",
                  }}
                  name="searchName"
                  // value={searchFirstName}
                  className="search"
                  // onChange={handleChangeFirstName}
                ></input>
              </th>
              <th></th>
              <th></th>
              <th></th>
            </tr>

            {CourseDocuments.map((item) => (
              <tr key={item.document_Id}>
                <td className="text-white font-bold size-15">
                  {item.document_Id}
                </td>
                <td className="text-white font-bold size-15">
                  {item.document_Name}
                </td>
                <td className="text-white font-bold size-15">
                  {item.document_Url}
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleClickEdit(
                        item.document_Id,
                        item.document_Name,
                        item.document_Url
                      )
                    }
                    className="EditLink"
                  >
                    <TbEdit />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleClickDelete(item.document_Id)}
                    className="DeleteLink"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <Modal
            isOpen={isCreatetDocumentOpen}
            onRequestClose={handleClose}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                padding: "20px",
                height: "570px",
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
              {" "}
              CREAR DOCUMENTO
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
            <form className="max-w-sm mx-auto bg">
              <div>
                <label htmlFor="documentName">Nombre del Documento:</label>
                <input
                  style={{
                    marginTop: "20px",
                    backgroundColor: "skyblue",
                    textAlign: "center",
                    fontSize: "25px",
                    borderRadius: "15px",
                  }}
                  type="text"
                  id="documentName"
                  value={documentName}
                  onChange={(event) => setDocumentName(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="document_URL">URL del Documento:</label>
                <input
                  style={{
                    backgroundColor: "skyblue",
                    textAlign: "center",
                    marginTop: "20px",
                    fontSize: "25px",
                    borderRadius: "15px",
                  }}
                  type="text"
                  id="documentURL"
                  value={documentURL}
                  onChange={(event) => setDocumentURL(event.target.value)}
                />
              </div>

              <div>
                <Button
                  onClick={handleSubmitDocument}
                  className="popUpButtonCreate"
                >
                  CREAR
                </Button>
                <Button
                  onClick={handleCloseCancel}
                  className="popUpButtonCancel"
                >
                  CANCELAR
                </Button>
              </div>
            </form>
          </Modal>

          <Modal
            isOpen={isOpenConfirm}
            onRequestClose={handleCloseCancel}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
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
            <button onClick={handleCloseConfirm} className="popUpButton2">
              Aceptar
            </button>
            <button onClick={handleCloseCancel} className="popUpButton2">
              Cancelar
            </button>
          </Modal>

          <Modal
            isOpen={isEditOpen}
            onRequestClose={handleClose}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                padding: "20px",
                height: "570px",
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
              {" "}
              EDITAR DOCUMENTO
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
            <form className="max-w-sm mx-auto bg">
              <div>
                <label htmlFor="documentName">Nombre del Documento:</label>
                <input
                  style={{
                    marginTop: "20px",
                    backgroundColor: "skyblue",
                    textAlign: "center",
                    fontSize: "25px",
                    borderRadius: "15px",
                  }}
                  type="text"
                  id="documentName"
                  value={documentName}
                  onChange={(event) => setDocumentName(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="surname">URL del Documento:</label>
                <input
                  style={{
                    backgroundColor: "skyblue",
                    textAlign: "center",
                    marginTop: "20px",
                    fontSize: "25px",
                    borderRadius: "15px",
                  }}
                  type="text"
                  id="courseDetartment"
                  value={documentURL}
                  onChange={(event) => setDocumentURL(event.target.value)}
                />
              </div>

              <div>
                <Button
                  onClick={handleClickUpdate}
                  className="popUpButtonUpdate"
                >
                  ACTUALIZAR
                </Button>
                <Button onClick={handleClose} className="popUpButtonCancel">
                  CANCELAR
                </Button>
              </div>
            </form>
          </Modal>
        </table>

        <Modal
          isOpen={isClosedCreatetOpen}
          onRequestClose={handleCloseCreate}
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
          <Button onClick={handleCloseCreate} className="popUpButton">
            Aceptar
          </Button>
        </Modal>

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
