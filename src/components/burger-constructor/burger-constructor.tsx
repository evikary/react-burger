import style from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IDropCollectedProps, IIngredient } from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { removeIngredient, addIngredient } from '../../services/constructor-ingredients/actions';
import { allIngredients } from '../../services/constructor-ingredients/selector';
import { getOrderModal } from '../../services/modal-order/selector';
import { closeModalOrder, sendIngredients } from '../../services/modal-order/action';
import React, { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import ToppingsConstructor from '../toppings-conctuctor/toppings-conctructor';
import { selectUser } from '../../services/user/selector';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

function BurgerConstructor() {
    const user = useSelector(selectUser);
    const { bun, toppings } = useSelector(allIngredients);
    const number = useSelector(getOrderModal);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getPrice = useMemo<number>(() => {
        const res = toppings.map((i) => i.price).reduce((acc, item) => acc + item, 0);
        const price = bun !== null ? bun?.price * 2 + res : res;
        return price;
    }, [bun, toppings]);

    const removeElement = (item: IIngredient) => {
        dispatch(removeIngredient(item));
    };

    const sendApi = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (bun !== null || toppings.length !== 0) {
            const arr = toppings.map((i) => i._id);

            if (bun) {
                arr.unshift(bun._id);
                arr.push(bun._id);
            }
            dispatch(sendIngredients({ ingredients: arr }));
        }
    };

    const [{ isOver, dragItem, canDrop }, dropTarget] = useDrop<IIngredient, unknown, IDropCollectedProps>({
        accept: 'ingredient',
        drop(ingredient: IIngredient) {
            dispatch(addIngredient(ingredient));
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            dragItem: monitor.getItem(),
            isOver: monitor.isOver(),
        }),
    });

    const dragBun = canDrop && dragItem && dragItem.type === 'bun';
    const disabledBtn = !bun ? true : false;

    return (
        <section className={style.burger_constructor}>
            <div ref={dropTarget}>
                {bun !== null ? (
                    <div className={`ml-8 mb-4`}>
                        <ConstructorElement
                            extraClass={(dragBun && isOver && style.active) || ''}
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                        />
                    </div>
                ) : (
                    <div className={`${style.stopperBunTop}  ${dragBun && isOver && style.active} text text_type_main-medium`}>Выберите булку</div>
                )}
                <div className={`${style.container}`}>
                    {toppings.length !== 0 ? (
                        toppings.map((item, index) => {
                            return <ToppingsConstructor key={item.key} item={item} index={index} handleClose={() => removeElement(item)} />;
                        })
                    ) : (
                        <div className={`${style.stopper} ${!dragBun && isOver && style.active2} text text_type_main-medium`}>
                            Выберите начинку для вашего бургера
                        </div>
                    )}
                </div>
                {bun !== null ? (
                    <div className={`mt-4 ml-8`}>
                        <ConstructorElement
                            extraClass={(dragBun && isOver && style.active) || ''}
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                        />
                    </div>
                ) : (
                    <div className={`${style.stopperBunBottom} ${dragBun && isOver && style.active} text text_type_main-medium`}>Выберите булку</div>
                )}
            </div>
            <div className={`${style.info} mt-10 mr-4`}>
                <div className={style.box}>
                    <span className="text text_type_digits-medium">{getPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={() => sendApi()} disabled={disabledBtn} htmlType="button" type="primary" size="large">
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
