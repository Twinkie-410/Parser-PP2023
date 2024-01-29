import React from "react"
import { NavLink } from "react-router-dom"

function Header() {
    return(
        <header className="bg-[#535353] ">
            <div className="text-center align-center w-[80%] max-w-[1520px] mx-auto">
                <ul className="flex flex-row justify-center gap-[20px] align-middle items-center flex-wrap text-white text-2xl">
                    <li className="w-[14%]">
                        <span className="mx-[20px]">
                            Лого
                        </span>
                        <NavLink to={"/"} className='hover:text-blue-300'>
                            Главная
                        </NavLink>
                    </li>
                    <li className="w-[14%]">
                        Профиль
                    </li>
                    <li className="w-[14%]">
                        <NavLink to="/login" className="hover:text-blue-300">
                            Вход
                        </NavLink>
                    </li>
                    <li className="w-[14%]">
                        <NavLink to="/register" className="hover:text-blue-300">
                            Регистрация
                        </NavLink>
                    </li>
                    <li className="w-[14%] my-[14px]">
                        <form className="flex flex-row relative bg-[#D9D9D9]">
                            <button type="submit" className="h-[55px] px-[9px]">
                            <svg width="39" height="41" viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M33.2391 23.8502C28.2833 28.806 20.1744 28.7754 15.1271 23.7282C10.0799 18.6809 10.0493 10.572 15.0051 5.61625C19.9608 0.660516 28.0697 0.691036 33.117 5.73832C38.1643 10.7856 38.1948 18.8945 33.2391 23.8502Z" fill="#D9D9D9" stroke="#A0A0A0" stroke-width="3"/>
                                <line x1="15.213" y1="25.5607" x2="1.0607" y2="39.713" stroke="#A0A0A0" stroke-width="3"/>
                            </svg>

                            
                            </button>
                            <input className="text-black bg-[#D9D9D9] pl-[5px] outline-none" type="search"  placeholder="Поиск"/>
                        </form> 
                    </li>
                </ul>
        
            </div>
        </header>
        
        
    )
}

export default Header