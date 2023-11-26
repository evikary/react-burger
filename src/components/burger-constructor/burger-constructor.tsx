import style from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../utils/types';
import Modal from '../modal/modal';
import { useState } from 'react';
import OrderDetails from '../order-details/order-details';

interface IProps {
    data: IIngredient[];
}

function BurgerConstructor({ data }: IProps) {
    const [open, setOpen] = useState(false);
    const bun = data.filter((item) => item.type === 'bun')[0];
    const toppings = data.filter((item) => item.type !== 'bun');
    return (
        <section className={style.burger_constructor}>
            {bun !== undefined && (
                <div className="ml-8 mb-4">
                    <ConstructorElement type="top" isLocked={true} text={`${bun.name} (верх)`} price={bun.price} thumbnail={bun.image_mobile} />
                </div>
            )}
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
            {bun !== undefined && (
                <div className="mt-4 ml-8">
                    <ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image_mobile} />
                </div>
            )}
            <div className={`${style.info} mt-10 mr-4`}>
                <div className={style.box}>
                    <span className="text text_type_digits-medium">610</span>
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
