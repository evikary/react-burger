import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import style from './modal.module.css';

const modalRoot = document.getElementById('react-modals')!;

interface IProps {
    onClose: () => void;
    children: React.ReactNode;
}

function Modal({ onClose, children }: IProps) {
    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return createPortal(
        <>
            <div className={`pl-10 pr-10 pt-10 pb-15 ${style.container}`}>
                <div onClick={onClose} className={style.close}>
                    <CloseIcon type="primary" />
                </div>
                {children}
            </div>
            <ModalOverlay onClose={onClose} />
        </>,
        modalRoot,
    );
}

export default Modal;
