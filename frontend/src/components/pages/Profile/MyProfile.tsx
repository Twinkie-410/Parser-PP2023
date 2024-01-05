import LoggedHeader from "../../base/LoggedHeader"
import AdCard from "../../elements/AdCard"
import Footer from "../../base/Footer"
import React from "react"
import { NavLink } from "react-router-dom"

function MyProfile () {
    return (
        <>
            <LoggedHeader/>
            <div className="w-[80%] max-w-[1520px] mx-auto mt-[100px]">
                <div className="flex justify-between">
                    <div className="">
                        <svg width="340" height="400" viewBox="0 0 340 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="340" height="400" fill="#D9D9D9"/>
                        </svg>
                        <button className="py-[7px] bg-[#D9D9D9] px-[35px] text-[24px] mt-[20px] hover:text-blue-300">
                            <NavLink to={"/editprofile"}>
                                Редактировать
                            </NavLink>
                        </button>
                    </div>
                    <div className="text-[32px]">
                        <ul className="flex flex-col gap-[10px]">
                            <li>
                                <div className="">
                                    Имя:
                                </div>
                                Дмитрий
                            </li>
                            <li>
                            <div className="">
                                    Фамилия:
                                </div>
                                Пупкин
                            </li>
                            <li>
                            <div className="">
                                Эл. почта:
                                </div>
                                2@urfu.ru
                            </li>
                            <li>
                            <div className="">
                                Логин:
                                </div>
                                tuctuctuc2
                            </li>
                        </ul>
                    </div>
                    <div className="text-[32px]">
                        <ul className="flex flex-col gap-[10px]">
                            <li>
                                <div className="">
                                Город:
                                </div>
                                Екатеринбург
                            </li>
                            <li>
                            <div className="">
                                Дата регистрации:
                                </div>
                                01. 01. 1970
                            </li>
                            <li>
                            <div className="">
                                Любимые жанры:
                                </div>
                                Роман, фантастика
                            </li>
                            <li>
                            <div className="">
                                Успешных обменов:
                                </div>
                                4
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    <h1 className="mt-[50px] text-3xl">Мои объявления</h1>
                    <button className="py-[7px] bg-[#D9D9D9] px-[35px] text-[24px] mt-[20px] hover:text-blue-300">Добавить новое</button>
                </div>
                
                <div className="flex justify-center gap-[20px] flex-wrap mt-[50px] w-[100%] max-w-[1520px] mx-auto">
                    <AdCard/>
                    <AdCard/>
                    <AdCard/>
                    <AdCard/>
                </div>
                <div className="flex">
                    <button className="mt-[20px] mx-auto">
                        <svg className="" width="96" height="50" viewBox="0 0 96 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-1.5" x2="66.2786" y2="-1.5" transform="matrix(-0.714606 0.699527 -0.714606 -0.699527 93.8629 1)" stroke="#2C2C2C" stroke-width="3"/>
                            <path d="M1.99994 2.00037L49.363 48.0002" stroke="#2C2C2C" stroke-width="3"/>
                        </svg>

                    </button>
                </div>
                
                <div className="flex flex-row justify-between">
                    <h1 className="mt-[50px] text-3xl">История обменов</h1>
                </div>
                
                <div className="flex justify-center gap-[20px] flex-wrap mt-[50px] w-[100%] max-w-[1520px] mx-auto">
                    <AdCard/>
                    <AdCard/>
                    <AdCard/>
                    <AdCard/>
                </div>
                <div className="flex">
                    <button className="mt-[20px] mx-auto">
                        <svg className="" width="96" height="50" viewBox="0 0 96 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-1.5" x2="66.2786" y2="-1.5" transform="matrix(-0.714606 0.699527 -0.714606 -0.699527 93.8629 1)" stroke="#2C2C2C" stroke-width="3"/>
                            <path d="M1.99994 2.00037L49.363 48.0002" stroke="#2C2C2C" stroke-width="3"/>
                        </svg>

                    </button>
                </div>

            </div>
            <Footer/>
        </>
    )
}

export default MyProfile