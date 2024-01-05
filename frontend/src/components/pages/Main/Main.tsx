import Header from "../../base/Header"
import EditorsChoiceCard from "../../elements/EditorsChoiceCard"
import AdCard from "../../elements/AdCard"
import Footer from "../../base/Footer"
import React, { useEffect } from "react"
import { getUserList, postRegisterUser } from "../../../store/actionCreators/UserAPI"
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux"

function Main () {

    const dispatch= useAppDispatch()
    const {results} = useAppSelector(state => state.userPageReducer)
    useEffect( () => {
    dispatch(getUserList(1))
  }, [])

  console.log(results)

    return (
        <>
            <Header/>
            <div className="">
                <div className="h-[512px] bg-[#C1C1C1] flex align-center justify-between">
                    <button className="ml-[48px]">
                        <svg width="24" height="43" viewBox="0 0 24 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="-1.5" x2="29.0364" y2="-1.5" transform="matrix(-0.688791 -0.724961 0.688791 -0.724961 23 40)" stroke="#2C2C2C" stroke-width="3"/>
                    <line y1="-1.5" x2="29.0364" y2="-1.5" transform="matrix(-0.68879 0.724961 -0.68879 -0.724961 21 0)" stroke="#2C2C2C" stroke-width="3"/>
                    </svg>
                    </button>
                    <button className="mr-[48px]">
                    <svg width="24" height="43" viewBox="0 0 24 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="-1.5" x2="29.0364" y2="-1.5" transform="matrix(0.688791 0.724961 -0.688791 0.724961 1 3)" stroke="#2C2C2C" stroke-width="3"/>
                        <line y1="-1.5" x2="29.0364" y2="-1.5" transform="matrix(0.68879 -0.724961 0.68879 0.724961 3 43)" stroke="#2C2C2C" stroke-width="3"/>
                    </svg>

                    </button>

                </div>
            </div>
            <div className="w-[80%] max-w-[1520px] mx-auto">
                <h1 className="mt-[50px] text-[48px]">Выбор редакции</h1>
                <div className="flex justify-center gap-[20px] w-[100%] max-w-[1520px] mx-auto">
                    <EditorsChoiceCard/>
                    <EditorsChoiceCard/>
                    {/* <EditorsChoiceCard/> */}
                </div>

                <h1 className="mt-[50px] text-[48px]">Объявления сообщества</h1>
                <div className="flex justify-center gap-[20px] flex-wrap mt-[50px] w-[100%] max-w-[1520px] mx-auto">
                    <AdCard/>
                    <AdCard/>
                    <AdCard/>
                    <AdCard/>
                    <AdCard/>
                    <AdCard/>
                    <AdCard/>
                    <AdCard/>
                </div>
            </div>
            
            <Footer/>
        </>
    )
}

export default Main