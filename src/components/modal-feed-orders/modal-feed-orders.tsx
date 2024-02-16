import style from './modal-feed-orders.module.css';
import { useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/store';
import { getFeedOrders } from '../../services/orders/selector';
import { allItems } from '../../services/burger-ingredients/selector';

function ModalFeedOrders() {
    const { number } = useParams();
    const { orders } = useSelector(getFeedOrders);
    const { items } = useSelector(allItems);

    const order = number ? orders.filter((item) => item.number === +number)[0] : null;
    const status = order?.status === 'done' ? 'Выполнен' : 'Готовится';
    const images = order?.ingredients.map((item) => {
        return items.find((i) => item === i._id);
    });

    console.log('images', images);

    const getPrice = () => {
        const arr = images?.map((item) => item?.price);
        console.log('getPrice', arr);
    };

    getPrice();

    return (
        <div className={style.container}>
            <div>
                <p className="text text_type_digits-default pt-6 pb-5">#{number}</p>
                <p className="text text_type_main-medium pb-2">{order?.name}</p>
                <p className={`text text_type_main-default pb-15 ${style.status}`}>{status}</p>
                <p className="text text_type_main-medium pb-6">Состав:</p>
            </div>
            <ul className={`mb-10 ${style.box}`}>
                {images &&
                    images.map((item) => {
                        return (
                            <li key={item?._id} className={style.component}>
                                <div className={style.component}>
                                    <div className={`mr-2 ${style.circle}`}></div>
                                    <span className="text text_type_main-default">{item?.name}</span>
                                </div>
                                <div className={style.component}>
                                    <span className="text text_type_digits-default mr-1">2 x {item?.price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </li>
                        );
                    })}
            </ul>
            <div className={style.box2}>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(order?.createdAt || '')} />
                <div className={style.price}>
                    <span className="text text_type_digits-default">524</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}

export default ModalFeedOrders;
