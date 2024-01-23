import Orders from '../../components/orders/orders';
import style from './feed.module.css';

function Feed() {
    return (
        <div className={`${style.container} mt-30`}>
            <Orders />
        </div>
    );
}

export default Feed;
