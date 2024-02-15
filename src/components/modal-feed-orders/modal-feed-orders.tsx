import style from './modal-feed-orders.module.css';
import { useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

function ModalFeedOrders() {
    const { number } = useParams();

    return (
        <div className={style.container}>
            <div>
                <p className="text text_type_digits-default pt-6 pb-5">#00000{number}</p>
                <p className="text text_type_main-medium pb-2">Black Hole Singlarity острый бургер</p>
                <p className={`text text_type_main-default pb-15 ${style.status}`}>Выполнен</p>
                <p className="text text_type_main-medium pb-6">Состав:</p>
            </div>
            <ul className={`mb-10 ${style.box}`}>
                <li className={style.component}>
                    <div className={style.component}>
                        <div className={`mr-2 ${style.circle}`}></div>
                        <span className="text text_type_main-default">Флюресцентная булка R2-D3</span>
                    </div>
                    <div className={style.component}>
                        <span className="text text_type_digits-default mr-1">2 x 20</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
                <li className={style.component}>
                    <div className={style.component}>
                        <div className={`mr-2 ${style.circle}`}></div>
                        <span className="text text_type_main-default">Флюресцентная булка R2-D3</span>
                    </div>
                    <div className={style.component}>
                        <span className="text text_type_digits-default mr-1">2 x 20</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
                <li className={style.component}>
                    <div className={style.component}>
                        <div className={`mr-2 ${style.circle}`}></div>
                        <span className="text text_type_main-default">Флюресцентная булка R2-D3</span>
                    </div>
                    <div className={style.component}>
                        <span className="text text_type_digits-default mr-1">2 x 20</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
                <li className={style.component}>
                    <div className={style.component}>
                        <div className={`mr-2 ${style.circle}`}></div>
                        <span className="text text_type_main-default">Флюресцентная булка R2-D3</span>
                    </div>
                    <div className={style.component}>
                        <span className="text text_type_digits-default mr-1">2 x 20</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
                <li className={style.component}>
                    <div className={style.component}>
                        <div className={`mr-2 ${style.circle}`}></div>
                        <span className="text text_type_main-default">Флюресцентная булка R2-D3</span>
                    </div>
                    <div className={style.component}>
                        <span className="text text_type_digits-default mr-1">2 x 20</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
                <li className={style.component}>
                    <div className={style.component}>
                        <div className={`mr-2 ${style.circle}`}></div>
                        <span className="text text_type_main-default">Флюресцентная булка R2-D3</span>
                    </div>
                    <div className={style.component}>
                        <span className="text text_type_digits-default mr-1">2 x 20</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
            </ul>
            <div className={style.box2}>
                <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date()} />
                <div className={style.price}>
                    <span className="text text_type_digits-default">524</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}

export default ModalFeedOrders;
