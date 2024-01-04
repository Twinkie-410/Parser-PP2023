import React from "react"
import { NavLink } from "react-router-dom"

function AdCard() {

    return (
        <>
            <div className="bg-[#EFEEEE] shrink">
                <svg width="365" height="333" viewBox="0 0 365 333" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.0458984" y="1.03528" width="363.935" height="330.264" fill="#D9D9D9"/>
                <line y1="-0.5" x2="491.368" y2="-0.5" transform="matrix(0.740714 0.671821 -0.679342 0.733822 0.0458984 1.15747)" stroke="#8A8A8A"/>
                <line y1="-0.5" x2="491.368" y2="-0.5" transform="matrix(-0.740656 0.671884 -0.67928 -0.733879 363.98 1.15747)" stroke="#8A8A8A"/>
                </svg>
                <div className="mx-[32px] mt-[10px] text-2xl">
                    <div>Название книги</div>
                    <div className="mt-[15px]">Автор книги</div>
                    <div className="mt-[15px]">Жанр</div>
                </div>
                <span className="flex justify-center my-[15px]">
                    <NavLink to="/advertisement" className="py-[7px] bg-[#828282] px-[35px] text-[24px] hover:text-blue-300">Узнать больше</NavLink>
                </span>
                
            </div>
            

        </>
    )
}

export default AdCard