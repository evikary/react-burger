import style from './not-found.module.css';

function NotFound() {
    return (
        <div className={`${style.container} mt-30`}>
            <h1 className="text text_type_digits-large">404</h1>
            <p className="text text_type_main-default text_color_inactive">
                Кажется что-то пошло не так! Страница, которую вы запрашиваете не существует.
            </p>
        </div>
    );
}

export default NotFound;
