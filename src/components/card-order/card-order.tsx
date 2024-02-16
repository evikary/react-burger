import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/store';
import { allItems } from '../../services/burger-ingredients/selector';
import style from './card-order.module.css';
import { Link, useLocation } from 'react-router-dom';
import { getFeedOrders } from '../../services/orders/selector';
import { IIngredient } from '../../utils/types';

interface IProps {
    number: number;
}

function CardOrder({ number }: IProps) {
    const location = useLocation();
    const { orders } = useSelector(getFeedOrders);
    const { items } = useSelector(allItems);

    const rawOrder = orders.filter((item) => item.number === number)[0];
    const order = { ...rawOrder, ingredients: rawOrder.ingredients.map((id) => items.filter((item) => item._id === id)[0]) };
    const price = order.ingredients.reduce((acc, item) => acc + item.price, 0);
    let num: null | number = null;

    if (order.ingredients.length > 6) {
        num = order.ingredients.length - 6;
        order.ingredients.splice(6, num);
    }

    return (
        <>
            <div className={style.container}>
                <Link className={style.item} to={`${location.pathname}/${number}`} state={{ backgroundLocation: location }}>
                    <div className={style.orderBox}>
                        <p className="text text_type_digits-default mb-6">#{number}</p>
                        <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(order.createdAt)} />
                    </div>
                    <h3 className="text text_type_main-medium mb-6">{order.name}</h3>
                    <div className={style.boxIngredients}>
                        <ul className={style.ingerients}>
                            {order.ingredients.map((item: IIngredient, index: number) => {
                                return (
                                    <li
                                        key={index}
                                        className={`text text_type_digits-default ${style.circle}`}
                                        style={{ backgroundImage: `url(${item.image_mobile})` }}
                                    >
                                        {num && `+${num}`}
                                    </li>
                                );
                            })}
                        </ul>
                        <div className={style.price}>
                            <span className="text text_type_digits-default">{price}</span>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default CardOrder;
