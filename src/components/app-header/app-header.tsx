import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';

function AppHeader() {

    const Link = (props: any) => {
        return (
            <a className={style.link} href="#">
                <>{props.img}</>
                <span className={!props.inActiv ? "ml-2 text text_type_main-default" : "ml-2 text text_type_main-default text_color_inactive"}>{props.children}</span>
            </a>
        )

    }

    return (
        <header className={style.header}>
            <div className={`${style.header_wrapper} pt-4 pb-4`}>
                <nav className={style.navigation}>
                    <ul className={style.navigation_panel}>
                        <li className='pt-4 pb-4 pl-5 pr-5 mr-2'>
                            <Link img={<BurgerIcon type="primary" />}>Конструктор</Link>
                        </li>
                        <li className='pt-4 pb-4 pl-5 pr-5'>
                            <Link inActiv img={<ListIcon type="secondary" />}>Лента заказов</Link>
                        </li>
                    </ul>
                </nav>
                <Logo></Logo>
                <div className={`${style.profile} pt-4 pb-4 pl-5 pr-5`}>
                    <Link inActiv img={<ProfileIcon type="secondary" />}>Личный кабинет</Link>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;