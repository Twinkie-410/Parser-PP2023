import React from "react"

function EditorsChoiceCard() {
    return (
        <>
            <div className="mt-[50px] bg-[#C1C1C1] w-[49%] h-[540px] flex align-bottom flex-col justify-between shrink">
                <div className="mx-[65px] mt-[42px] text-2xl">
                    <div>Название книги</div>
                    <div className="mt-[15px]">Автор книги</div>
                    <div className="mt-[15px]">Описание книги или отзыв критика</div>
                </div>
                <div className="flex justify-end mr-[26px] mb-[18px] gap-[20px] text-[24px]">
                    <button className="hover:text-blue-500">Не нравится</button>
                    <button className="py-[10px] bg-[#828282] px-[23px] hover:text-blue-300">Нравится</button>
                </div>
                
            </div>
        </>
    )
}

export default EditorsChoiceCard