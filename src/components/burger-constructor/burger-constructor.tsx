import style from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.js';

function BurgerConstructor() {
    const bun = data.filter((item) => item.type === 'bun')[0];
    const toppings = data.filter((item) => item.type !== 'bun');

    return (
        <section className={style.burger_constructor}>
            <div className="ml-8 mb-4">
                <ConstructorElement type="top" isLocked={true} text={`${bun.name} (верх)`} price={bun.price} thumbnail={bun.image_mobile} />
            </div>
            <div className={style.container}>
                {toppings.map((item) => {
                    return (
                        <div className={style.box} key={item._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement text={item.name} price={item.price} thumbnail={item.image_mobile} />
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 ml-8">
                <ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image_mobile} />
            </div>
            <div className={`${style.info} mt-10 mr-4`}>
                <div className={style.box}>
                    <span className="text text_type_digits-medium">610</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;
