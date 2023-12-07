import style from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IConstructorContext, IIngredient, IBodyPost, IOrder } from '../../utils/types';
import Modal from '../modal/modal';
import React, { useContext, useState } from 'react';
import OrderDetails from '../order-details/order-details';
import { ConstructorContext } from '../../services/constructorContext';
import { typeActions } from '../../services/reducer';
import { sendLinkIngredients } from '../../utils/ constants';

function BurgerConstructor() {
    const { ingredientsConstructor, setIngredientsConstructor } = useContext<IConstructorContext>(ConstructorContext);
    const { bun, toppings } = ingredientsConstructor;
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState<IOrder | null>(null);

    const getPrice = () => {
        const res = toppings.map((i) => i.price).reduce((acc, item) => acc + item, 0);
        const price = bun !== null ? bun?.price * 2 + res : null;
        return price;
    };

    const removeElement = (item: IIngredient) => {
        setIngredientsConstructor({ type: typeActions.REMOVE, payload: item });
    };

    const sendIngredients = async (url: string, data: IBodyPost) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Произошла ошибка по адресу ${url}, статус ошибки ${response}`);
            }

            return await response.json();
        } catch (error) {
            setOrder(null);
        }
    };

    const sendApi = () => {
        if (ingredientsConstructor.bun !== null || ingredientsConstructor.toppings.length !== 0) {
            const arr = ingredientsConstructor.toppings.map((i) => i._id);
            if (ingredientsConstructor.bun) {
                arr.push(ingredientsConstructor.bun._id, ingredientsConstructor.bun._id);
            }

            sendIngredients(sendLinkIngredients, { ingredients: arr }).then((data) => {
                setOpen(true);
                if (data) {
                    setOrder(data);
                }
            });
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
                    <span className="text text_type_digits-medium">{getPrice()}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={() => sendApi()} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {open && order && (
                <Modal onClose={() => setOpen(false)}>
                    <OrderDetails order={order.order.number} />
                </Modal>
            )}
        </section>
    );
}

export default React.memo(BurgerConstructor);
