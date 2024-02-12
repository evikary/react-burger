import Orders from '../../components/orders/orders';
import style from './feed.module.css';

function Feed() {
    return (
        <div className={`${style.container} mt-10`}>
            <h1 className={`${style.title} text text_type_main-large mb-5`}>Лента заказов</h1>
            <main className={style.main}>
                <Orders />
                <section className={style.infoContainer}>
                    <div className={style.box}>
                        <div className={style.boxId}>
                            <p className="text text_type_main-medium mb-4">Готовы:</p>
                            <ul>
                                <li className={`text text_type_digits-default ${style.done}`}>034567</li>
                                <li className={`text text_type_digits-default ${style.done}`}>034568</li>
                                <li className={`text text_type_digits-default ${style.done}`}>034569</li>
                                <li className={`text text_type_digits-default ${style.done}`}>034570</li>
                                <li className={`text text_type_digits-default ${style.done}`}>034571</li>
                                <li className={`text text_type_digits-default ${style.done}`}>034572</li>
                            </ul>
                        </div>
                        <div className={style.boxId}>
                            <p className="text text_type_main-medium mb-4">В работе:</p>
                            <ul>
                                <li className={`text text_type_digits-default`}>034566</li>
                                <li className={`text text_type_digits-default`}>034565</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text text_type_main-medium mb-4">Выполнено за все время:</p>
                    <p className="text text_type_digits-large mb-15">6789</p>
                    <p className="text text_type_main-medium mb-4">Выполнено за сегодня:</p>
                    <p className="text text_type_digits-large mb-15">6</p>
                </section>
            </main>
        </div>
    );
}

export default Feed;
