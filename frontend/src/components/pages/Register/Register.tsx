import Header from "../../base/Header"
import Footer from "../../base/Footer"
import { NavLink } from "react-router-dom"
import React, { useEffect } from "react"
import { postRegisterUser } from "../../../store/actionCreators/UserAPI"
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux"

function Register() {

    const dispatch = useAppDispatch()
    function useHandleReg() {
        // const {result} = useAppSelector(state => state.registerUserReducer)
        useEffect(() => {
            dispatch(postRegisterUser('12323', 'use12r@example.com', 'Velden228', 'Velden228'))
        }, [])
        // console.log(result)
    }
    const test = useHandleReg()

    return (
        <>
            <Header/>
            <div className="w-[80%] max-w-[820px] mx-auto">
                <div className="mt-[70px] flex gap-[110px] justify-around items-center">
                    <h1 className="text-[40px]">Регистрация</h1>
                    <span className="text-[24px] align-bottom bg-[#D9D9D9] px-[30px] py-[7px]">Уже есть аккаунт?</span>
                </div>
                
                <form action="" className="mt-[40px] text-center border-solid border-[1px] border-black pt-[33px] pb-[60px]">
                    <input type="text" placeholder="Логин" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                    max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white" />
                    <input type="text" placeholder="Имя" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                    max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />
                    <input type="text" placeholder="Фамилия" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                    max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />
                    <input type="password" placeholder="Пароль" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                    max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />
                    <input type="password" placeholder="Повторите пароль" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                    max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />
                    <input type="tel" placeholder="Номер телефона" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                    max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />
                    <input type="email" placeholder="Эл. почта" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                    max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />
                    <input type="text" placeholder="Любимые жанры книг" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                    max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />
                    <input type="text" placeholder="Город, населенный пункт" className="bg-[#A0A0A0] placeholder:text-white placeholder:text-[24px] 
                    max-w-[720px] w-[100%] mx-auto py-[15px] px-[45px] text-[24px] text-white mt-[35px]" />

                    <div className="mt-[40px] flex justify-around">
                        <NavLink to="/" className="py-[7px] px-[35px] text-[24px] hover:text-blue-300">Назад</NavLink>
                        <button type="submit" className="py-[7px] bg-[#4F4F4F] px-[35px] text-[24px] text-white hover:text-blue-300"
                        onClick={() => test} 
                            
                        >Зарегистрироваться
                        </button>
                    </div>
                    
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default Register