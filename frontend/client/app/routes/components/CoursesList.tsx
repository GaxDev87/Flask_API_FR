import { FiHome, FiInfo, FiSettings, FiMail, FiUser, FiPieChart, FiCompass, FiUsers, FiLogOut, FiUserPlus, FiUserCheck, FiTool } from 'react-icons/fi';
import {
  Link, useLoaderData, useParams
} from "@remix-run/react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Course } from './course_interface';
import { FaTrash } from 'react-icons/fa';
import { TbEdit } from "react-icons/tb";


const UsersList = () => {
  const [info, setInfo] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [id, setId] = useState(0);
  const [courseData, setCourseData] = useState<{
    curso: Course
  }[]>([]);
  const data = useLoaderData();
  let courses_data = data["data_response"]

  const handleClickDelete = (id: number) => {
    setId(id);
    setInfo('¿Está seguro de que desea eliminar el curso ' + id + '?');
    setIsOpenConfirm(true);
  };

  const handleClickManage = (id: number) => {
    axios.put('http://localhost:5000/update/' + id)
      .then(response => {
        setInfo('Usuario actualizado correctamente');
        setIsOpen(true);
      })
      .catch(error => {
        setInfo('Fallo al promover/degradar el usuario '+ id);
        setIsOpen(true);
      });
  };

  const handleClose = () => {
    location.href = "/Admin_cursos"; // Actualizar la tabla después
    updateCourses();
    setIsOpen(false);
  };

  const handleCloseCancel = () => {
    location.href = "/Admin_cursos";
    updateCourses();
    setIsOpenConfirm(false);
  };

  const handleCloseConfirm = () => {
    const data = {
      id: id
    };

    setIsOpenConfirm(false);

    axios.delete('http://localhost:5000/delete_course/' + id)
      .then(response => {
        setInfo('Curso eliminado correctamente');
        setIsOpen(true);
      })
      .catch(error => {
        console.log(error);
        setInfo('Fallo al eliminar el curso' + id);
        setIsOpen(true);
      });
  };

  const updateCourses = () => {
    try {
      const courseData = Object.keys(courses_data).map(diccionarioKey => {
        const diccionario = courses_data[diccionarioKey];
        const curso: Course = {
          id: diccionario['course_Id'],
          course_Name: diccionario['course_Name'],
          department_Name: diccionario['department_Name'],
         
        };

        return {
            curso: curso
        };
      });

      setCourseData(courseData);
      console.log(courseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateCourses(); // Obtener los usuarios
  }, []);



  return (
    <div style={{ marginRight: '7%', marginTop: '1%' }}>
      <table>
        <thead>
          <tr>
            <th>ID de Curso</th>
            <th>Nombre del Curso</th>
            <th>Departamento</th>

            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courseData.map((item) => (
            <tr key={item.curso.id}>
              <td className='text-white font-bold size-15'>{item.curso.id}</td>
              <td className='text-white font-bold size-15'>{item.curso.course_Name}</td>
              <td className='text-white font-bold size-15'>{item.curso.department_Name}</td>
          

                <td>
                <Link
                  to="#"
                  onClick={() => handleClickManage(item.curso.id)}
                  className="DeleteLink"
                >
                  <TbEdit />
                </Link>
              </td>
              <td>
                <Link
                  to="#"
                  onClick={() => handleClickDelete(item.curso.id)}
                  className="DeleteLink"
                >
                  <FaTrash />
                </Link>
              </td>

            
            </tr>
          ))}
        </tbody>

        <Modal
          isOpen={isOpen}
          onRequestClose={handleClose}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '5px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              padding: '20px',
              height: '300px',
              maxWidth: '500px',
              width: '100%',
            },
          }}
        >
          <h4 style={{ textAlign: 'center', marginRight: '40px', fontSize: '30px' }}>AVISO</h4>
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>{info}</p>
          <button onClick={handleClose} className='popUpButton'>Aceptar</button>
        </Modal>
        <Modal
          isOpen={isOpenConfirm}
          onRequestClose={handleCloseCancel}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              position: 'absolute',
              top: '50%',
              left: '750px',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '5px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              padding: '20px',
              height: '300px',
              maxWidth: '700px',
              width: '100%',
            },
          }}
        >
          <h4 style={{ textAlign: 'center', marginRight: '40px', fontSize: '30px' }}>AVISO</h4>
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>{info}</p>
          <button onClick={handleCloseConfirm} className='popUpButton2'>Aceptar</button>
          <button onClick={handleCloseCancel} className='popUpButton2'>Cancelar</button>
        </Modal>
      </table>
    </div>
  );
};

export default UsersList;