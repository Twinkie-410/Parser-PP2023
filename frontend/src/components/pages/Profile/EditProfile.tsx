import React from "react";
import Footer from "../../base/Footer";
import LoggedHeader from "../../base/LoggedHeader";
import AdCard from "../../elements/AdCard";
import { NavLink } from "react-router-dom";

function EditProfile() {
    return (
        <>
            <LoggedHeader/>
            <div className="w-[80%] max-w-[1520px] mx-auto mt-[100px]">
                <div className="flex justify-between">
                    <div className="">
                        <svg width="340" height="400" viewBox="0 0 340 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="340" height="400" fill="#D9D9D9"/>
                        </svg>
                        
                        <div className="flex flex-col">
                            <button className="py-[7px] bg-[#D9D9D9] px-[35px] text-[24px] mt-[20px] hover:text-blue-300">Загрузить новое</button>
                            <button className="py-[7px] bg-[#D9D9D9] px-[35px] text-[24px] mt-[20px] hover:text-blue-300">Удалить фото</button>
                        </div>
                        
                    </div>
                    <div className="text-[32px]">
                        <ul className="flex flex-col gap-[10px]">
                            <li>
                                <div className="">
                                Логин:
                                </div>
                                tuctuctuc2
                            </li>
                            <li>
                                <div className="">
                                Дата регистрации:
                                </div>
                                01. 01. 1970
                            </li>
                            <li>
                                <div className="">
                                Успешных обменов:
                                </div>
                                4
                            </li>
                        </ul>
                    </div>
                    <div className="text-[32px]">
                        <form action="" className="flex flex-col min-w-[585px]">
                            <input type="text" placeholder="Имя" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                            max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white" />
                            <input type="text" placeholder="Фамилия" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                            max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />
                            <input type="text" placeholder="Эл. почта" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                            max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />
                            <input type="password" placeholder="Номер телефона" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                            max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />
                            <input type="password" placeholder="Город, населенный пункт" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                            max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />
                            <input type="tel" placeholder="Любимые жанры книг" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                            max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />
                            <input type="email" placeholder="Контактные данные" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                            max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />

                            <div className="mt-[40px] flex justify-around">
                                <NavLink to="/" className="py-[7px] px-[35px] text-[24px] hover:text-blue-300">Назад</NavLink>
                                <button type="submit" className="py-[7px] bg-[#D9D9D9] px-[35px] text-[24px] text-black hover:text-blue-300"                                    
                                >Сохранить
                                </button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default EditProfile