import style from './link.module.css';

interface IProps {
    isActive?: boolean;
    img: React.ReactElement;
    children: React.ReactNode;
}

const Link = (props: IProps) => {
    return (
        <a className={style.link} href="#">
            <>{props.img}</>
            <span className={!props.isActive ? 'ml-2 text text_type_main-default' : 'ml-2 text text_type_main-default text_color_inactive'}>
                {props.children}
            </span>
        </a>
    );
};

export default Link;
