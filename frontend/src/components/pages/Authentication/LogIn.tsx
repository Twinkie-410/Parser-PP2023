import React, { useEffect } from "react"
import Header from "../../base/Header"
import Footer from "../../base/Footer"
import { NavLink } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux"
import { postLogInUser } from "../../../store/actionCreators/UserAPI"

interface ILogInForm{
    username:''
    password:''
}

function LogIn() {

    const dispatch = useAppDispatch()
    function useHandleReg() {
        const {result} = useAppSelector(state => state.logInUserReducer)
        useEffect(() => {
            const result = dispatch(postLogInUser('1', 'Velden228'))
        }, [])
        console.log(result)
    }
    // useHandleReg()

    const {register, handleSubmit, formState: {errors, isValid}, reset, getValues} = useForm<ILogInForm>({mode: 'onBlur'})

    const submit: SubmitHandler<ILogInForm> = data => {
        dispatch(postLogInUser(data.username, data.password))
        reset()
    }

    return (
        <div className="min-h-[100%]">
            <Header/>
            <div className="w-[80%] max-w-[820px] mx-auto min-h-[54vh]">
                <div className="mt-[70px] flex gap-[110px] justify-around items-center">
                    <h1 className="text-[40px]">Вход</h1>
                    <NavLink to={'/register'} className="text-[24px] align-bottom bg-[#D9D9D9] px-[30px] py-[7px] hover:text-blue-300">
                        Нет аккаунта?
                    </NavLink>
                </div>
                
                <form action="" className="mt-[40px] text-center border-solid border-[1px] border-black pt-[33px] pb-[60px]"
                    onSubmit={handleSubmit(submit)}
                    noValidate
                >
                    <input
                    autoComplete="off"
                    className="reg-input"
                    placeholder="Логин"
                    {...register('username', {
                        required:'Поле обязательно к заполнению',
                    })}
                    />
                    <input
                    type="password"
                    autoComplete="off"
                    className="reg-input"
                    placeholder="Пароль"
                    {...register('password', {
                        required:'Поле обязательно к заполнению',
                    })}
                    />
                    <div className="mt-[40px] flex justify-around">
                        <NavLink to="/" className="py-[7px] px-[35px] text-[24px] hover:text-blue-300">Назад</NavLink>
                        <button type="submit" className="py-[7px] bg-[#4F4F4F] px-[70px] text-[24px] text-white hover:text-blue-300 disabled:opacity-50 disabled:hover:text-white"
                            disabled={!isValid}>
                            Войти
                        </button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default LogIn