import style from './order-details.module.css';
import done from '../../images/graphics.png';

interface IProps {
    order: number;
}

function OrderDetails({ order }: IProps) {
    return (
        <>
            <h2 className="pt-20 text text_type_digits-large">{order}</h2>
            <p className="mt-8 text text_type_main-medium">идентификатор заказа</p>
            <img className={`${style.done} mt-15 mb-15`} src={done} alt="done" />
            <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="pb-15 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
    );
}

export default OrderDetails;
