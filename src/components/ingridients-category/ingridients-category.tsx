import style from './ingridients-category.module.css';
import IngridientDetail from '../ingridient-details/ingridient-detail';

function IngridientsСategory(props: any) {
    return (
        <div className='pb-10'>
            <h2 className="text text_type_main-medium">{props.children}</h2>
            <ul className={`${style.container} pt-6 pl-4 pr-4`}>
                {props.ingridients.map((item: any) => {
                    return (
                        <li key={item._id} className={style.item}>
                            <IngridientDetail image={item.image} name={item.name} price={item.price}></IngridientDetail>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default IngridientsСategory;