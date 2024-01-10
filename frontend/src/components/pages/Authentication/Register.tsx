import Header from "../../base/Header"
import Footer from "../../base/Footer"
import { NavLink } from "react-router-dom"
import React, { FormEvent, useEffect, useState } from "react"
import { postRegisterUser } from "../../../store/actionCreators/UserAPI"
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux"
import { IUserRegister } from "../../../store/models/IUser"
import { IInput } from "../../../store/types/IInput"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import validateEmail from "../../../store/functions/validateEmail"

interface IRegisterForm {
    username:string
    email:string
    password:string
    password2:string
    first_name?: string
    second_name?: string
    phone_number?: string
    genres?: string
    city?: string
}

function Register() {

    const dispatch = useAppDispatch()

    const {register, handleSubmit, formState: {errors, isValid}, reset, getValues} = useForm<IRegisterForm>({mode: 'onBlur'})
    const {result} = useAppSelector(state => state.registerUserReducer)

    const submit: SubmitHandler<IRegisterForm> = data => {
        
        dispatch(postRegisterUser(data.username, data.email, data.password, data.password2))
        console.log(result)
        reset()
    }
    const error: SubmitErrorHandler<IRegisterForm> = (data) => {
        console.log(data)
    }

    return (
        <>
            <Header/>
            <div className="w-[80%] max-w-[820px] mx-auto">
                <div className="mt-[70px] flex gap-[110px] justify-around items-center">
                    <h1 className="text-[40px]">Регистрация</h1>
                    <NavLink to={'/login'} className="text-[24px] align-bottom bg-[#D9D9D9] px-[30px] py-[7px] hover:text-blue-300">Уже есть аккаунт?</NavLink>
                </div>
                
                <form action="" className="mt-[40px] text-center border-solid border-[1px] border-black pt-[33px] pb-[60px]"
                    onSubmit={handleSubmit(submit, error)}
                    noValidate
                >
                    <input
                    autoComplete="off"
                    className="reg-input"
                    placeholder="Логин*"
                    {...register('username', {
                        required:'Поле обязательно к заполнению',
                    })}
                    />
                    {errors?.username && 
                    <p className="mt-2 text-sm text-red-500 text-[20px]">Это поле не может быть пустым</p>}  

                    <input type="text" placeholder="Имя" className="reg-input"
                    autoComplete="off"
                    {...register('first_name')}
                    />
                    <input type="text" placeholder="Фамилия" className="reg-input"
                    autoComplete="off" 
                    {...register('second_name')}
                    />
                    <input type="password" placeholder="Пароль*" className="reg-input peer-[&:not(:placeholder-shown):not(:focus):invalid]:block peer"
                    autoComplete="off"
                    pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}" 
                    {...register('password', {
                        required:true,
                        minLength: {
                            value:6,
                            message:'- быть длиннее 6 символов'
                        }   
                    })}
                    />
                    <div className="mt-2 text-sm text-[20px] text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block hidden">
                        Ваш пароль должен:
                        <ul>
                            <li>- содержать хотя бы одно число</li>
                            <li>- состоять из латинских букв верхнего и нижнего регистра</li>
                        </ul>
                        <p>{errors?.password?.message}</p>
                    </div>

                    <input type="password" placeholder="Повторите пароль*" className="reg-input"
                    autoComplete="off" 
                    {...register('password2', {required: true,
                    validate: () => {
                        if(getValues('password')!== getValues('password2')) {
                            return 'Пароли не совпадают'
                        }
                    }
                    })}
                    />
                    <p className="mt-2 text-sm text-[20px] text-red-500">{errors.password2?.message}</p>
                    <input type="tel" placeholder="Номер телефона" className="reg-input" 
                    autoComplete="off"
                    />
                    
                    <input type="email" placeholder="Эл. почта*" className="reg-input peer-[&:not(:placeholder-shown):not(:focus):invalid]:block peer"
                        autoComplete="off" 
                        {...register('email', {required: true,
                        pattern: {
                            value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                            message:"Введите валидный email"
                        }})}
                    />
                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block text-[20px]">
                        {errors.email?.message}
                    </span>
                    
                    <input type="text" placeholder="Любимые жанры книг" className="reg-input" 
                    autoComplete="off"/>
                    <input type="text" placeholder="Город, населенный пункт" className="reg-input" 
                    autoComplete="off"/>

                    <div className="mt-[40px] flex justify-around">
                        <NavLink to="/" className="py-[7px] px-[35px] text-[24px] hover:text-blue-300">Назад</NavLink>
                        <button type="submit" className="py-[7px] bg-[#4F4F4F] px-[35px] text-[24px] text-white hover:text-blue-300 disabled:opacity-50 disabled:hover:text-white"
                            disabled={!isValid}>
                            Зарегистрироваться
                        </button>
                    </div>
                    
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default Register