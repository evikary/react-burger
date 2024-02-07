import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Link from '../link/link';
import style from './app-header.module.css';
import { useMatch } from 'react-router-dom';
import { selectUser } from '../../services/user/selector';
import { useSelector } from '../../services/store';

function AppHeader() {
    const isConstructor = !!useMatch({ path: '/', end: true });
    const isFeed = !!useMatch({ path: '/feed' });
    const isProfile = !!useMatch({ path: '/profile' });
    const user = useSelector(selectUser);

    return (
        <header className={style.header}>
            <div className={`${style.header_wrapper} pt-4 pb-4`}>
                <nav className={style.navigation}>
                    <ul className={style.navigation_panel}>
                        <li className="pt-4 pb-4 pl-5 pr-5 mr-2">
                            <Link to={'/'} isActive={isConstructor} img={<BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />}>
                                Конструктор
                            </Link>
                        </li>
                        <li className="pt-4 pb-4 pl-5 pr-5">
                            <Link to={'/feed'} isActive={isFeed} img={<ListIcon type={isFeed ? 'primary' : 'secondary'} />}>
                                Лента заказов
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Logo></Logo>
                <div className={`${style.profile} pt-4 pb-4 pl-5 pr-5`}>
                    <Link to={'/profile'} isActive={isProfile} img={<ProfileIcon type={isProfile ? 'primary' : 'secondary'} />}>
                        {user ? user.name : 'Личный кабинет'}
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
