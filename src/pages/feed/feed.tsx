import { useEffect } from 'react';
import Orders from '../../components/orders/orders';
import { connect, disconnect } from '../../services/orders/actions';
import { getFeedOrders } from '../../services/orders/selector';
import { useDispatch, useSelector } from '../../services/store';
import { FEED_ORDER_URL } from '../../utils/ constants';
import style from './feed.module.css';

function Feed() {
    const dispatch = useDispatch();
    const { orders, total, totalToday } = useSelector(getFeedOrders);
    let done = orders.filter((item) => item.status === 'done').slice(0, 20);
    let pending = orders.filter((item) => item.status !== 'done').slice(0, 20);

    useEffect(() => {
        dispatch(connect(FEED_ORDER_URL));
        return () => {
            dispatch(disconnect());
        };
    }, []);

    return (
        <div className={`${style.container} mt-10`}>
            <h1 className={`${style.title} text text_type_main-large mb-5`}>Лента заказов</h1>
            <main className={style.main}>
                <Orders />
                <section className={style.infoContainer}>
                    <div className={style.box}>
                        <div className={style.boxId}>
                            <p className="text text_type_main-medium mb-4">Готовы:</p>
                            <ul className={style.doneOrders}>
                                {done.map((item) => {
                                    return (
                                        <li key={item._id} className={`text text_type_digits-default ${style.done}`}>
                                            {item.number}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className={style.boxId}>
                            <p className="text text_type_main-medium mb-4">В работе:</p>
                            <ul>
                                {pending.map((item) => {
                                    return (
                                        <li key={item._id} className={`text text_type_digits-default`}>
                                            {item.number}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <p className="text text_type_main-medium mb-4">Выполнено за все время:</p>
                    <p className="text text_type_digits-large mb-15">{total}</p>
                    <p className="text text_type_main-medium mb-4">Выполнено за сегодня:</p>
                    <p className="text text_type_digits-large mb-15">{totalToday}</p>
                </section>
            </main>
        </div>
    );
}

export default Feed;
