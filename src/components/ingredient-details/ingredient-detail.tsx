import style from './ingredient-detail.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IProps {
    image: string;
    name: string;
    price: number;
}

function IngredientDetail({ image, name, price }: IProps) {
    return (
        <>
            <img src={image} alt={name} />
            <div className={`${style.box} mt-2 mb-2`}>
                <span className="mr-2 text text_type_digits-default">{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.name} text text_type_main-default`}>{name}</p>
        </>
    );
}

export default IngredientDetail;
