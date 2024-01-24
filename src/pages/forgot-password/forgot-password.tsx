import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendForgotData } from '../../services/api';
import { IFormForgotData } from '../../utils/types';
import style from './forgot-password.module.css';

function ForgotPassword() {
    const [data, setData] = useState<IFormForgotData>({ email: '' });
    const navigate = useNavigate();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleClick = () => {
        navigate('/login');
    };

    const recoverPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await sendForgotData(data);
        if ((res.message = 'Reset email sent')) {
            localStorage.setItem('reset-password', 'approve');
            navigate('/reset-password');
        }
    };

    return (
        <main>
            <form className={style.container} onSubmit={recoverPassword}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                <div className={style.boxInputs}>
                    <EmailInput placeholder="Укажите e-mail" onChange={onChange} value={data.email} name={'email'} isIcon={false} />
                </div>
                <Button htmlType="submit" type="primary" size="medium">
                    Восстановить
                </Button>
                <div className={`pt-20 ${style.boxBtns}`}>
                    <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Вспомнили пароль?</p>
                    <Link to="/login">
                        <Button onClick={handleClick} htmlType="button" type="secondary" size="medium">
                            Войти
                        </Button>
                    </Link>
                </div>
            </form>
        </main>
    );
}

export default ForgotPassword;
