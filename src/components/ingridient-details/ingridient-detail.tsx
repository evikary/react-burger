import style from './ingridient-detail.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngridientDetail(props: any) {
    return (
        <>
            <img src={props.image} alt={props.name} />
            <div className={`${style.box} mt-2 mb-2`}>
                <span className='mr-2 text text_type_digits-default' >{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.name} text text_type_main-default`}>{props.name}</p>
        </>
    )
}

export default IngridientDetail;
