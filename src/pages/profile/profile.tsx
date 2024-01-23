import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { sendLogout } from '../../services/user/action';
import { selectUser } from '../../services/user/selector';
import style from './profile.module.css';

function Profile() {
    const user = useSelector(selectUser);
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(sendLogout());
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    return (
        <main>
            <section className={style.container}>
                <aside className={style.box}>
                    <ul>
                        <li className={style.link}>
                            <NavLink to="/profile" end>
                                {({ isActive }) => (
                                    <span className={isActive ? `text text_type_main-medium` : `text text_type_main-medium text_color_inactive`}>
                                        Профиль
                                    </span>
                                )}
                            </NavLink>
                        </li>
                        <li className={style.link}>
                            <NavLink to="/profile/orders">
                                {({ isActive }) => (
                                    <span className={isActive ? `text text_type_main-medium` : `text text_type_main-medium text_color_inactive`}>
                                        История заказов
                                    </span>
                                )}
                            </NavLink>
                        </li>
                        <li className={style.link}>
                            <button onClick={handleClick} className={`${style.logout} text text_type_main-medium text_color_inactive`}>
                                Выход
                            </button>
                        </li>
                    </ul>
                    <p className="text text_type_main-default text_color_inactive pt-20">
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </aside>
                <Outlet />
            </section>
        </main>
    );
}

export default Profile;
