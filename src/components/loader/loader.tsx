import loader from '../../images/rings.svg';
import style from './loader.module.css';

function Loader() {
    return (
        <div className={style.loader}>
            <img src={loader} alt="loader" />
        </div>
    );
}

export default Loader;
