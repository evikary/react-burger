import style from './ingridients-category.module.css';
import IngridientDetail from '../ingridient-details/ingridient-detail';

function IngridientsСategory(props: any) {
    console.log('f', props);
    return (
        <div className='pb-10'>
            <h2 className="text text_type_main-medium">{props.children}</h2>
            <ul className={`${style.container} pt-6 pl-4 pr-4`}>
                {props.ingridients.map((item: any) => {
                    console.log('item', item)
                    return (
                        <li className={style.item}>
                            <IngridientDetail key={item._id} image={item.image} name={item.name} price={item.price}></IngridientDetail>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default IngridientsСategory;