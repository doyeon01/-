import React, { useState, useEffect } from 'react';
import logo from './../../assets/statics/logo.png';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      id="navbar"
      style={{
        backgroundColor: isScrolled ? 'white' : 'transparent',  // 상태에 따라 배경색을 직접 지정
        boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      }}
      className={`fixed top-0 left-0 w-full z-[1000] transition-colors duration-300 ease-in-out ${props.className}`}
      {...props}
    >
      <div className="max-w-[1440px] h-[80px] flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/main" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12 w-42 my-2" alt="Handom Logo" />
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-lg">
            <li className="flex items-center">
              <NavLink
                to="/main"
                className={({ isActive }) =>
                  isActive ? 'block py-2 text-black font-bold' : 'block py-2 text-gray-900'
                }
              >
                메인 
              </NavLink>
            </li>
            <li className="flex items-center">
              <div className="border-l-2 border-black h-6 pl-8"></div>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive ? 'block py-2 text-black font-bold' : 'block py-2 text-gray-900'
                }
              >
                탐색하기 
              </NavLink>
            </li>
            <li className="flex items-center">
              <div className="border-l-2 border-black h-6 pl-8"></div>
              <NavLink
                to="/plan"
                className={({ isActive }) =>
                  isActive ? 'block py-2 text-black font-bold' : 'block py-2 text-gray-900'
                }
              >
                여행계획 
              </NavLink>
            </li>
            <li className="flex items-center">
              <div className="border-l-2 border-black h-6 pl-8"></div>
              <NavLink
                to="/companion"
                className={({ isActive }) =>
                  isActive ? 'block py-2 text-black font-bold' : 'block py-2 text-gray-900'
                }
              >
                동행하기 
              </NavLink>
            </li>
            <li className="flex items-center">
              <div className="border-l-2 border-black h-6 pl-8"></div>
              <NavLink
                to="/my"
                className={({ isActive }) =>
                  isActive ? 'block py-2 px-4 text-black font-bold' : 'block py-2 text-gray-900'
                }
              >
                마이페이지
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
