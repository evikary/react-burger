import { getFeedOrders } from '../../services/orders/selector';
import { useSelector } from '../../services/store';
import CardOrder from '../card-order/card-order';
import style from './orders.module.css';

function Orders({}) {
    const { orders } = useSelector(getFeedOrders);
    return (
        <section className={`${style.container} pr-2`}>
            {orders.map((item) => {
                return <CardOrder key={item._id} number={item.number} />;
            })}
        </section>
    );
}

export default Orders;
