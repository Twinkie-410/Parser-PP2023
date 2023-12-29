import LoggedHeader from "../../base/LoggedHeader"
import Footer from "../../base/Footer"

function Advertisement() {
    return (
        <>
            <LoggedHeader/>
            <div className="w-[80%] max-w-[1520px] mx-auto mt-[100px]">
                <div className="flex flex-row justify-between">
                    <h1 className="mt-[50px] text-[48px]">Объявление</h1>
                    <button className="py-[7px] px-[35px] text-[24px] mt-[20px] hover:text-blue-300 text-[#535353]">Назад</button>
                </div>
                <div className="flex flex-row mt-[80px] gap-[11px]">
                    <div className="">
                        <svg width="750" height="524" viewBox="0 0 750 524" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="750" height="524" fill="#D9D9D9"/>
                        </svg>

                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <svg width="246" height="168" viewBox="0 0 246 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="246" height="168" fill="#D9D9D9"/>
                        </svg>
                        <svg width="246" height="168" viewBox="0 0 246 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="246" height="168" fill="#D9D9D9"/>
                        </svg>
                        <svg width="246" height="168" viewBox="0 0 246 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="246" height="168" fill="#D9D9D9"/>
                        </svg>

                    </div>
                    <div className="text-[32px]">
                        <ul className="flex flex-col gap-[13px] align-text-top">
                            <li>
                                <div className="">
                                Название:
                                </div>
                                ААА
                            </li>
                            <li>
                            <div className="">
                                Автор книги:
                                </div>
                                ААА
                            </li>
                            <li>
                            <div className="">
                                Жанр:
                                </div>
                                Роман, фантастика
                            </li>
                            <li>
                            <div className="">
                                Состояние:
                                </div>
                                Хорошее
                            </li>
                            <li>
                            <div className="">
                                Дата публикации:
                                </div>
                                01.01.1970
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <h1 className="mt-[50px] text-[48px]">Описание</h1>
                </div>
                <p className="text-[32px]">краткое описание книги, которое дает читателю представление о произведении, рассказывает завязку сюжета или обозначает общую тему книги.
                Обычно аннотация публикуется на обороте книги. Отдам бесплатно.</p>
                <div className="flex flex-row justify-between">
                    <h1 className="mt-[50px] text-[48px]">Владелец</h1>
                </div>
                <div className="flex flex-row justify-between align-center mt-[50px]">
                    <h1 className="text-[32px]">Имя Фамилия</h1>
                    <h1 className="text-[32px]">Город: Екатеринбург</h1>
                    <div className="flex gap-[18px] align-center">
                        <button className="py-[7px] bg-[#D9D9D9] px-[70px] text-[24px] hover:text-blue-300">Профиль</button>
                        <button className="py-[7px] bg-[#4F4F4F] px-[70px] text-[24px] hover:text-blue-300">Связаться</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Advertisement