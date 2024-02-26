import style from './order-details.module.css';
import done from '../../images/graphics.png';
import { useSelector } from '../../services/store';
import { getOrderModal } from '../../services/modal-order/selector';
import loader from '../../images/rings.svg';
import { getOrderApi } from '../../services/api';

function OrderDetails() {
    const number = useSelector(getOrderModal);

    if (!number) {
        return (
            <div className={style.container}>
                <h3 className="text text_type_main-medium mb-5">Ваш заказ создается...</h3>
                <img src={loader} alt="loader" />
            </div>
        );
    } else {
        return (
            <>
                <h2 className="pt-20 text text_type_digits-large">{number}</h2>
                <p className="mt-8 text text_type_main-medium">идентификатор заказа</p>
                <img className={`${style.done} mt-15 mb-15`} src={done} alt="done" />
                <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
                <p className="pb-15 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
            </>
        );
    }
}

export default OrderDetails;
