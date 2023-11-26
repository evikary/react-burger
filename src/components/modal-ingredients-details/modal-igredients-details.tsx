import style from './modal-igredients-details.module.css';
import { IIngredient } from '../../utils/types';

interface IProps {
    details: IIngredient;
}

function ModalIngredientsDetails({ details }: IProps) {
    return (
        <>
            <h2 className={`text text_type_main-large ${style.title}`}>Детали ингредиента</h2>
            <img src={details.image_large} alt={details.name} />
            <p className="mt-4 text text_type_main-medium">{details.name}</p>
            <div className={`mt-8 ${style.box}`}>
                <div className={style.box_mini}>
                    <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
                    <span className="text text_type_digits-default text_color_inactive">{details.calories}</span>
                </div>
                <div className={style.box_mini}>
                    <span className="text text_type_main-default text_color_inactive">Белки, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{details.proteins}</span>
                </div>
                <div className={style.box_mini}>
                    <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{details.fat}</span>
                </div>
                <div className={style.box_mini}>
                    <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{details.carbohydrates}</span>
                </div>
            </div>
        </>
    );
}

export default ModalIngredientsDetails;
