import React, { useState, useEffect } from 'react';
import logo from './../../assets/statics/logo.png';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null); //로그아웃 메뉴 활성화를 위한 상태

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

  const isWhiteBackground = location.pathname === '/companion';
  
  const handleLogout = () => {
    setActiveMenu('logout'); 
    window.location.href = 'https://j11c205.p.ssafy.io/api/v1/users/logout'};

  return (
    <nav
      id="navbar"
      style={{
        backgroundColor: isWhiteBackground
          ? '#FFFFFF'
          : isScrolled
          ? '#F4F4EE'
          : 'transparent',
        boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        fontFamily: 'Arita',
      }}
      className={`fixed top-0 left-0 w-full z-[1000] transition-colors duration-300 ease-in-out ${props.className}`}
      {...props}
    >
      <div className="max-w-[1440px] h-[80px] flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/main" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-10 w-42" alt="Handom Logo" />
        </NavLink>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-base">
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
                  isActive ? 'block py-2 text-black font-bold' : 'block py-2 text-gray-900'
                }
              >
                마이페이지
              </NavLink>
            </li>
            <li className="flex items-center">
              <div className="border-l-2 border-black h-6 pl-8"></div>
              <div
                className={`block py-2 cursor-pointer ${activeMenu === 'logout' ? 'text-black font-bold' : 'text-gray-900'}`}
                onClick={handleLogout}
              >
                로그아웃
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
