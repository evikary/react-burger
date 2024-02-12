import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/store';
import { allItems } from '../../services/burger-ingredients/selector';
import style from './card-order.module.css';

interface IProps {
    ingredientsId: string[];
    time: string;
}

function CardOrder({ ingredientsId, time }: IProps) {
    const { items } = useSelector(allItems);
    const images: any = [];
    const prices: any = [];
    let num: any = null;
    for (let ingredientId of ingredientsId) {
        items.map((item) => {
            if (item._id === ingredientId) {
                images.push(item.image_mobile);
                prices.push(item.price);
            }
        });
    }

    if (images.length > 6) {
        num = images.length - 6;
        images.splice(6, num);
    }

    const getPrice = () => {
        if (prices.length !== 0) {
            return prices.reduce((acc: any, item: any) => acc + item);
        }
        return 0;
    };

    return (
        <>
            <div className={style.container}>
                <div className={style.orderBox}>
                    <p className="text text_type_digits-default">#034535</p>
                    <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(time)} />
                </div>
                <h3 className="text text_type_main-medium">Interstellar бургер</h3>
                <div className={style.boxIngredients}>
                    <ul className={style.ingerients}>
                        {images.map((item: string, index: number) => {
                            return (
                                <li
                                    key={index}
                                    className={`text text_type_digits-default ${style.circle}`}
                                    style={{ backgroundImage: `url(${item})` }}
                                >
                                    {num && `+${num}`}
                                </li>
                            );
                        })}
                    </ul>
                    <div className={style.price}>
                        <span className="text text_type_digits-default">{getPrice()}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardOrder;
