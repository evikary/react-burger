import style from './modal-feed-orders.module.css';
import { useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedOrders } from '../../services/orders/selector';
import { allItems } from '../../services/burger-ingredients/selector';
import { getProfileOrders } from '../../services/profile-orders/selector';
import Loader from '../loader/loader';
import { useEffect } from 'react';
import { getAllOrderApi } from '../../services/modal-order/action';
import { getApiOrder } from '../../services/modal-order/selector';

function ModalFeedOrders() {
    const dispath = useDispatch();
    const { number } = useParams();
    const { orders: feedOrders } = useSelector(getFeedOrders);
    const { orders: profileOrders } = useSelector(getProfileOrders);
    const currentOrder = useSelector(getApiOrder);
    const orders = [...feedOrders, ...profileOrders];
    const { items } = useSelector(allItems);
    const order = orders.filter((item) => item.number === Number(number))[0] || currentOrder;

    useEffect(() => {
        if (!order && number) {
            dispath(getAllOrderApi(number));
        }
    }, []);

    if (!order) {
        return <Loader />;
    }

    const ingredients = order ? order.ingredients.map((item) => items.find((i) => item === i._id)) : [];
    const price = ingredients.map((item) => item!.price).reduce((acc, item) => acc! + item!, 0);
    const setIngredients = ingredients ? [...new Set(ingredients)] : null;

    const getStatus = () => {
        let status: string = '';
        if (order) {
            if (order.status === 'created') {
                status = 'Создан';
            } else if (order.status === 'pending') {
                status = 'Готовится';
            } else if (order.status === 'done') {
                status = 'Выполнен';
            } else {
                status = 'Отменен';
            }
            return status;
        }
    };

    const getCount = (ingredient: string) => {
        return order?.ingredients?.filter((item) => item === ingredient).length;
    };

    return (
        <div className={style.container}>
            <div>
                <p className="text text_type_digits-default pt-6 pb-5">#{number}</p>
                <p className="text text_type_main-medium pb-2">{order?.name}</p>
                <p className={`text text_type_main-default pb-15 ${style.status}`}>{getStatus()}</p>
                <p className="text text_type_main-medium pb-6">Состав:</p>
            </div>
            <ul className={`mb-10 ${style.box}`}>
                {setIngredients &&
                    setIngredients.map((item, index) => {
                        return (
                            <li key={index} className={style.component}>
                                <div className={style.component}>
                                    <div className={`mr-2 ${style.circle}`} style={{ backgroundImage: `url(${item?.image_mobile})` }}></div>
                                    <span className="text text_type_main-default">{item?.name}</span>
                                </div>
                                <div className={style.component}>
                                    {item && (
                                        <span className="text text_type_digits-default mr-1">
                                            {getCount(item._id)} x {item?.price}
                                        </span>
                                    )}
                                    <CurrencyIcon type="primary" />
                                </div>
                            </li>
                        );
                    })}
            </ul>
            <div className={style.box2}>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(order?.createdAt || '')} />
                <div className={style.price}>
                    <span className="text text_type_digits-default">{price}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}

export default ModalFeedOrders;
