import style from './ingredients-category.module.css';
import { v4 as uuidv4 } from 'uuid';
import IngredientDetail from '../ingredient-details/ingredient-detail';
import { IConstructorContext, IIngredient } from '../../utils/types';
import { useContext, useState } from 'react';
import Modal from '../modal/modal';
import ModalIngredientsDetails from '../modal-ingredients-details/modal-igredients-details';
import { ConstructorContext } from '../../services/constructorContext';

interface IProps {
    ingredients: IIngredient[];
    children: React.ReactNode;
}

function IngredientsСategory({ ingredients, children }: IProps) {
    const { ingredientsConstructor, setIngredientsConstructor } = useContext<IConstructorContext>(ConstructorContext);
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState<IIngredient | null>(null);

    const handleClick = (item: IIngredient) => {
        if (item.type === 'bun') {
            setIngredientsConstructor({ ...ingredientsConstructor, bun: item });
        } else {
            setIngredientsConstructor({ ...ingredientsConstructor, toppings: [...ingredientsConstructor.toppings, { ...item, key: uuidv4() }] });
        }
        setDetail(item);
        setOpen(true);
    };

    return (
        <div className="pb-10">
            <h2 className="text text_type_main-medium">{children}</h2>
            <ul className={`${style.container} pt-6 pl-4 pr-4`}>
                {ingredients.map((item) => {
                    return (
                        <li onClick={() => handleClick(item)} key={item._id} className={style.item}>
                            <IngredientDetail image={item.image} name={item.name} price={item.price} />
                        </li>
                    );
                })}
            </ul>
            {open && detail !== null && (
                <Modal onClose={() => setOpen(false)}>
                    <ModalIngredientsDetails details={detail} />
                </Modal>
            )}
        </div>
    );
}

export default IngredientsСategory;
