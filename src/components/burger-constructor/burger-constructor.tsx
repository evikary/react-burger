import style from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { removeIngredient } from '../../services/constructor-ingredients/actions';
import { allIngredients } from '../../services/constructor-ingredients/selector';
import { getOrderModal } from '../../services/modal-order/selector';
import { closeModalOrder, sendIngredients } from '../../services/modal-order/action';
import React, { useMemo } from 'react';

function BurgerConstructor() {
    const { bun, toppings } = useSelector(allIngredients);
    const number = useSelector(getOrderModal);
    const dispatch: any = useDispatch();

    const getPrice = useMemo(() => {
        const res = toppings.map((i) => i.price).reduce((acc, item) => acc + item, 0);
        const price = bun !== null ? bun?.price * 2 + res : null;
        return price;
    }, [bun, toppings]);

    const removeElement = (item: IIngredient) => {
        dispatch(removeIngredient(item));
    };

    const sendApi = () => {
        if (bun !== null || toppings.length !== 0) {
            const arr = toppings.map((i) => i._id);
            if (bun) {
                arr.push(bun._id, bun._id);
            }
            dispatch(sendIngredients({ ingredients: arr }));
        }
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
                                <ConstructorElement
                                    handleClose={() => removeElement(item)}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_mobile}
                                />
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
                    <span className="text text_type_digits-medium">{getPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={() => sendApi()} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {number && (
                <Modal onClose={() => dispatch(closeModalOrder())}>
                    <OrderDetails order={number} />
                </Modal>
            )}
        </section>
    );
}

export default React.memo(BurgerConstructor);
