import style from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IConstructorContext } from '../../utils/types';
import Modal from '../modal/modal';
import { useContext, useState } from 'react';
import OrderDetails from '../order-details/order-details';
import { ConstructorContext } from '../../services/constructorContext';

function BurgerConstructor() {
    const { ingredientsConstructor, setIngredientsConstructor } = useContext<IConstructorContext>(ConstructorContext);
    const { bun, toppings } = ingredientsConstructor;
    const [open, setOpen] = useState(false);

    const getPrice = () => {
        const res = toppings.map((i) => i.price).reduce((acc, item) => acc + item, 0);
        const price = bun !== null ? bun?.price * 2 + res : null;
        return price;
    };

    return (
        <section className={style.burger_constructor}>
            {bun !== null && (
                <div className="ml-8 mb-4">
                    <ConstructorElement type="top" isLocked={true} text={`${bun.name} (верх)`} price={bun.price} thumbnail={bun.image_mobile} />
                </div>
            )}
            <div className={style.container}>
                {toppings.length !== 0 ? (
                    toppings.map((item) => {
                        return (
                            <div className={style.box} key={item.key}>
                                <DragIcon type="primary" />
                                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image_mobile} />
                            </div>
                        );
                    })
                ) : (
                    <div className={`${style.stopper} text text_type_main-medium`}>Выберите начинку для вашего бургера</div>
                )}
            </div>
            {bun !== null && (
                <div className="mt-4 ml-8">
                    <ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image_mobile} />
                </div>
            )}
            <div className={`${style.info} mt-10 mr-4`}>
                <div className={style.box}>
                    <span className="text text_type_digits-medium">{getPrice()}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={() => setOpen(true)} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    );
}

export default BurgerConstructor;
