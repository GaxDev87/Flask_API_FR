
import { RiHome2Line, RiEqualizerLine, RiSettings2Line, RiInformationLine } from 'react-icons/ri';
import {
    Link
  } from "@remix-run/react";
import { LinksFunction } from '@remix-run/node';
import { cssBundleHref } from '@remix-run/css-bundle';
import LogoProteo from '~/images/ProteoLogo.png';
import { useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';

interface MenuOption {
    path: string;
    icon: JSX.Element;
  }
  
interface MenuProps {
    title: string;
    options: MenuOption[];
}

const Navbar: React.FC<MenuProps> = ({ title, options }) => {
  const [user_type, setUserType] = useState('');
  

  useEffect(() => {
    // Obtiene el valor de user_type almacenado en sessionStorage si está disponible
    const user_type = localStorage.getItem('user_Type');
    const Name =  localStorage.getItem('Name');

    if (user_type) {
      setUserType(user_type);

 
    }
  }, []);
  
  return (
    <header className="fixed top-0 right-0 w-full bg-blue-700"  style={{ zIndex: '9998'}}>
      <nav className="flex items-center justify-between h-14">
      <div className="flex items-center flex-grow justify-center"> 
          <h1 className="items-center justify-center mb-3 text-white" style={{ marginLeft: '30%'}}>{title}</h1>
      </div>
        <ul className="flex space-x-4 px-4">
          {options.map((option, index) => (
              <li key={index}>
                <a href={option.path} className={`text-white hover:text-blue-300 ${option.icon.type === FaCog && user_type !== 'Admin' ? 'pointer-events-none' : ''}`}>
                  <span className={`text-xl mr-2 flex items-center ${option.icon.type === FaCog && user_type !== 'Admin' ? 'text-white' : ''}`}>{option.icon}</span>
                </a>
              </li>
            ))}
        </ul>
        <div className="flex items-center justify-right bg-blue-700" style={{ width: '130px', height: '25px' }}>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;