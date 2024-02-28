import { useMatch } from 'react-router-dom';
import { allItems } from '../../services/burger-ingredients/selector';
import { getFeedOrders } from '../../services/orders/selector';
import { getProfileOrders } from '../../services/profile-orders/selector';
import { useSelector } from '../../services/store';
import { IIngredientsOrder } from '../../utils/types';
import CardOrder from '../card-order/card-order';
import style from './orders.module.css';

function Orders({}) {
    const { items } = useSelector(allItems);
    const { orders: feedOrders } = useSelector(getFeedOrders);
    const { orders: profileOrders } = useSelector(getProfileOrders);
    const isFeed = !!useMatch({ path: '/feed', end: true });
    const orders = isFeed ? feedOrders : profileOrders;

    return (
        <section className={`${style.container} pr-2`}>
            {orders.map((item) => {
                const order = {
                    ...item,
                    ingredients: item.ingredients.map((i) => items.find((el) => el._id === i)).filter(Boolean),
                } as IIngredientsOrder;
                return <CardOrder key={item._id} number={item.number} order={order} />;
            })}
        </section>
    );
}

export default Orders;
