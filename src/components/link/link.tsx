import { NavLink } from 'react-router-dom';
import style from './link.module.css';

interface IProps {
    isActive?: boolean;
    img: React.ReactElement;
    children: React.ReactNode;
    to: string;
}

const Link = (props: IProps) => {
    return (
        <NavLink className={style.link} to={props.to}>
            {props.img}
            <span className={props.isActive ? 'ml-2 text text_type_main-default' : 'ml-2 text text_type_main-default text_color_inactive'}>
                {props.children}
            </span>
        </NavLink>
    );
};

export default Link;
