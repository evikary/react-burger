import style from './modal-overlay.module.css';

interface IProps {
    onClose: () => void;
}

function ModalOverlay({ onClose }: IProps) {
    return <div onClick={onClose} className={style.overlay}></div>;
}

export default ModalOverlay;
