import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendForgotData } from '../../services/api';
import style from './forgot-password.module.css';

function ForgotPassword() {
    const [data, setData] = useState({ email: '' });
    const navigate = useNavigate();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleClick = () => {
        navigate('/login');
    };

    const recoverPassword = async () => {
        const res = await sendForgotData(data);
        if ((res.message = 'Reset email sent')) {
            localStorage.setItem('reset-password', 'approve');
            navigate('/reset-password');
        }
    };

    return (
        <main>
            <section className={style.container}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: '24px', paddingTop: '24px', paddingBottom: '24px' }}>
                    <EmailInput placeholder="Укажите e-mail" onChange={onChange} value={data.email} name={'email'} isIcon={false} />
                </div>
                <Button onClick={recoverPassword} htmlType="button" type="primary" size="medium">
                    Восстановить
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '80px' }}>
                    <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Вспомнили пароль?</p>
                    <Link to="/login">
                        <Button onClick={handleClick} htmlType="button" type="secondary" size="medium">
                            Войти
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default ForgotPassword;
