
import { FiHome, FiCompass, FiUsers, FiLogOut, FiChevronDown, FiChevronUp, FiCodesandbox } from 'react-icons/fi';
import {
    Link
} from "@remix-run/react";
import { useEffect, useState } from 'react';
import LogoNTT from '~/images/NTT2.png';
import { GiExitDoor } from "react-icons/gi";
import { AiFillExperiment } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import Navbar from './components/Navbar';
import styles from "~/styles/app.css";
import { FiUser } from "react-icons/fi";
import { FaCog } from "react-icons/fa";
import axios from 'axios';

import { User } from './components/user_interface';
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
import Sidebar from './components/Sidebar';
const Cursos = () => {

    
    const [user_Id, setId] = useState('');
    const [firstName, setName] = useState('');
    const [lastName, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [user_type, setType] = useState('');
    const [info, setInfo] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);

    useEffect(() => {
        try {
            // Para recuperar el ID del usuario logueado
            const userId = sessionStorage.getItem('user_id');
            console.log(userId)
          
            axios.get('http://localhost:5000/users/' + userId)
                .then((response) => {
                    const data = response.data;
                    const user: User = {
                        user_Id: data['user_Id'],
                        firstName: data['firstName'],
                        lastName: data['lastName'],
                        email: data['email'],
                        user_Type: data['user_Type'],

                    };
                    console.log(user);
                    setId(user.user_Id);
                    setName(user.firstName);
                    setSurname(user.lastName);
                    setEmail(user.email);

                }, (error) => {
                    console.log(error);
                    setInfo('Error: La información del usuario no se ha podido obtener correctamente');
                    setIsOpen(true);
                });

        } catch (error) {
            console.log(error);
            setInfo('Error: La información del usuario no se ha podido obtener correctamente');
            setIsOpen(true);
        }
    }, []);
    return (

        <Sidebar>

            <div className=" h-full flex justify-center items-center flex-col gap-4 bg-ambar-400" style={{ width: '600px', height: '500px' }}>
                <h1>Cursos 1</h1>
                <h1>Cursos 2</h1>
                <h1>Cursos 3</h1>
                <h1>Cursos 1</h1>
                <h1>Cursos 2</h1>
                <h1>Cursos 3</h1>
                <h1>Cursos 1</h1>
                <h1>Cursos 2</h1>
                <h1>Cursos 3</h1>

            </div>

        </Sidebar>
    );
};

export default Cursos;