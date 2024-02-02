import { cssBundleHref } from "@remix-run/css-bundle";
// import { safeRedirect } from "~/utils";
import registroStyles from "~/styles/registro.css";
import { LinksFunction, json } from "@remix-run/node";

import NTT from "~/images/NTT2.png";
import {
  FiHome,
  FiInfo,
  FiSettings,
  FiMail,
  FiUser,
  FiPieChart,
  FiCompass,
  FiUsers,
  FiLogOut,
  FiUserPlus,
  FiUserCheck,
  FiTool,
} from "react-icons/fi";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { User } from "./user_interface";
import { FaTrash } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { Button, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
<script src="https://unpkg.com/htmx.org@1.9.10"></script>;

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: registroStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const UsersList = () => {
  const [info, setInfo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [id, setId] = useState(0);
  const [firstName, setName] = useState("");
  const [lastName, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [user_Type, setuserType] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchSurname, setSearchSurname] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchUserType, setsearchUserType] = useState("");

  const [coursesList, setCourses] = useState([]);
  const [SearchUserData, setSearchUserData] = useState([]);

  const [userData, setUserData] = useState<
    {
      usuario: User;
    }[]
  >([]);
  const data = useLoaderData();
  let users_data = data["data_response"];

  // Fetch data using Promise with the Fetch API

  // const getUsersListAPI = () => {
  //   fetch("http://localhost:5000/get_users") // Fetch data based on the current page
  //     .then((response) => response.json()) // Parse the response as JSON
  //     .then((data) => {
  //       setSearchUserData(data); // Set the fetched data
  //     });
  // };
  const getUsersListAPI = () => {
    fetch("http://localhost:5000/get_users") // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setSearchUserData(data); // Set the fetched data
      });
  };

  useEffect(() => {
    // Trigger fetching method on component mount
    getUsersListAPI();
  }, []);

  const getUsersId = () => {
    fetch("http://localhost:5000/searchId/" + searchId) // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setSearchUserData(data); // Set the fetched data
      });
  };
  const getUsersFirst = () => {
    fetch("http://localhost:5000/searchfirst/" + searchFirstName) // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setSearchUserData(data); // Set the fetched data
      });
  };

  const getUsersSurname = () => {
    fetch("http://localhost:5000/searchlast/" + searchSurname) // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setSearchUserData(data); // Set the fetched data
      });
  };

  const getUsersEmail = () => {
    fetch("http://localhost:5000/searchemail/" + searchEmail) // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setSearchUserData(data); // Set the fetched data
      });
  };

  const getUsersUserType = () => {
    fetch("http://localhost:5000/searchusertype/" + searchUserType) // Fetch data based on the current page
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setSearchUserData(data); // Set the fetched data
      });
  };

  // useEffect(() => {
  //   // Trigger fetching method on component mount
  //   getUsersListAPI();
  //   updateUsers();
  // }, []);
  // Trigger fetching method on component mount

  const handleChangeId = (e) => {
    setSearchId(e.target.value);
    getUsersId();
  };

  const handleChangeFirstName = (event) => {
    setSearchFirstName(event.target.value);
    getUsersFirst();
    // getUsersListAPI();
  };

  const handleChangeSurname = (event) => {
    setSearchSurname(event.target.value);
    getUsersSurname();
  };

  const handleChangeEmail = (event) => {
    setSearchEmail(event.target.value);
    getUsersEmail();
  };

  const handleClickDelete = (user_Id: number) => {
    setId(user_Id);
    setInfo("¿Está seguro de que desea eliminar el usuario " + user_Id + "?");
    setIsOpenConfirm(true);
  };

  const handleSearch = () => {
    getUsersId();

    getUsersFirst();

    getUsersSurname();

    getUsersEmail();

    getUsersUserType();

    // Trigger fetching method on component mount
  };

  const handleClickUpdate = () => {
    axios
      .put("http://localhost:5000/update/" + id, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        user_Type: user_Type,
      })
      .then((response) => {
        setInfo("Usuario actualizado correctamente!");
        setIsOpen(true);
      })
      .catch((error) => {
        setInfo("Fallo al actualizar el usuario");
        setIsOpen(true);
      });
  };

  const handleClickEdit = (
    user_Id: number,
    firstName: string,
    lastName: string,
    email: string,
    user_Type: string
  ) => {
    setId(user_Id);
    setName(firstName);
    setSurname(lastName);
    setEmail(email);
    setuserType(user_Type);
    // setInfo("Editando usuario " + id);
    setEditOpen(true);
  };

  const handleClose = () => {
    location.href = "/Admin_users"; // Actualizar la tabla después
    getUsersListAPI();
    setIsOpen(false);
  };

  // const getOppositeUserRole = (userType: string) => {
  //   return userType === "Administrador" ? "Alumno" : "Administrador";
  // };

  const handleCloseCancel = () => {
    location.href = "/Admin_users";
    getUsersListAPI();
    setIsOpenConfirm(false);
  };

  const handleCloseConfirm = () => {
    const data = {
      user_Id: id,
    };

    setIsOpenConfirm(false);

    axios
      .delete("http://localhost:5000/delete/" + id)
      .then((response) => {
        setInfo("Usuario eliminado correctamente");
        setIsOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setInfo("Fallo al eliminar el usuario");
        setIsOpen(true);
      });
  };

  const updateUsers = () => {
    try {
      const userData = Object.keys(users_data).map((diccionarioKey) => {
        const diccionario = users_data[diccionarioKey];
        const usuario: User = {
          user_Id: diccionario["id"],
          firstName: diccionario["firstName"],
          lastName: diccionario["lastName"],
          email: diccionario["email"],
          user_Type: diccionario["user_Type"],
        };

        return {
          usuario: usuario,
        };
      });

      setUserData(userData);
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginRight: "7%", marginTop: "1%" }}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th
              style={{
                paddingLeft: "0px",
              }}
            >
              ID
            </th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo Electrónico</th>
            <th>Tipo de Usuario</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              style={{
                columnWidth: "100px",
              }}
            >
              {" "}
              <button onClick={handleSearch} className="Buscar">
                Buscar
              </button>
            </th>
            <th className="colim">
              <input
                style={{
                  width: "200px",
                  backgroundColor: "white",
                  textAlign: "center",
                  fontSize: "20px",
                  borderRadius: "15px",
                  marginLeft: "15%",
                }}
                name="searcherId"
                value={searchId}
                className="search"
                onChange={(event) => setSearchId(event.target.value)}
              ></input>
            </th>
            <th className="colim">
              <input
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  fontSize: "20px",
                  borderRadius: "15px",
                  marginRight: "7%",
                }}
                name="searchName"
                value={searchFirstName}
                className="search"
                onChange={(event) => setSearchFirstName(event.target.value)}
              ></input>
            </th>
            <th className="colim">
              <input
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  fontSize: "20px",
                  borderRadius: "15px",
                }}
                name="searchSurname"
                value={searchSurname}
                onChange={(event) => setSearchSurname(event.target.value)}
                className="search"
              ></input>
            </th>
            <th className="colim">
              <input
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  fontSize: "20px",
                  borderRadius: "15px",
                }}
                name="searchSurname"
                value={searchEmail}
                onChange={(event) => setSearchEmail(event.target.value)}
                className="search"
              ></input>
            </th>

            <th className="colim">
              <select
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  fontSize: "20px",
                  borderRadius: "15px",
                  width: "100%",
                }}
                value={searchUserType}
                onChange={(event) => setsearchUserType(event.target.value)}
                className="dropdownsearch"
              >
                <option value="">Tipo usuario</option>

                <option value="Administrador">Administrador</option>

                <option value="Alumno">Alumno</option>
              </select>
            </th>
            <th> </th>
            <th> </th>
          </tr>
          {SearchUserData.map((item) => (
            <tr key={item.user_Id}>
              <td></td>
              <td
                style={{
                  paddingLeft: "-10px",
                }}
                className="text-white font-bold size-15"
              >
                {item.user_Id}
              </td>
              <td className="text-white font-bold size-15">{item.firstName}</td>
              <td className="text-white font-bold size-15">{item.lastName}</td>
              <td className="text-white font-bold size-15">{item.email}</td>
              <td className="text-white font-bold size-15">{item.user_Type}</td>

              <td>
                <Link
                  to="#"
                  onClick={() =>
                    handleClickEdit(
                      item.user_Id,
                      item.firstName,
                      item.lastName,
                      item.email,
                      item.user_Type
                    )
                  }
                  className="EditLink"
                >
                  <TbEdit />
                </Link>
              </td>
              <td>
                <Link
                  to="#"
                  onClick={() => handleClickDelete(item.user_Id)}
                  className="DeleteLink"
                >
                  <FaTrash />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

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
              height: "800px",
              maxWidth: "500px",
              width: "600px",
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
            EDITAR USUARIO
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
            <br></br>
            <div>
              <label htmlFor="name">Nombre:</label>
              <input
                style={{
                  backgroundColor: "skyblue",
                  textAlign: "center",
                  fontSize: "25px",
                  borderRadius: "15px",
                }}
                type="text"
                id="name"
                value={firstName}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <br></br>
            <div>
              <label htmlFor="surname">Apellidos:</label>
              <input
                style={{
                  backgroundColor: "skyblue",
                  textAlign: "center",
                  fontSize: "25px",
                  borderRadius: "15px",
                }}
                type="text"
                id="surname"
                value={lastName}
                onChange={(event) => setSurname(event.target.value)}
              />
            </div>
            <br></br>

            <div>
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                style={{
                  backgroundColor: "skyblue",
                  textAlign: "center",
                  fontSize: "25px",
                  borderRadius: "15px",
                }}
                type="text"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <br></br>

            <div>
              <label htmlFor="email">Rol de Usuario:</label>

              <select
                value={user_Type}
                onChange={(event) => setuserType(event.target.value)}
                style={{
                  width: "200px",
                  height: "50px",

                  backgroundColor: "skyblue",
                  textAlign: "center",
                  fontSize: "20px",
                  borderRadius: "15px",
                }}
              >
                <option disabled value="">
                  Seleccione role..
                </option>
                <option value="Administrador">Administrador</option>

                <option value="Alumno">Alumno</option>
              </select>
            </div>

            <div>
              <Button onClick={handleClickUpdate} className="popUpButtonUpdate">
                ACTUALIZAR
              </Button>
              <Button onClick={handleClose} className="popUpButtonCancel">
                CANCELAR
              </Button>
            </div>
          </form>
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
    </div>
  );
};

export default UsersList;
