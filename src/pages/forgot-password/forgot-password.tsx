import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './forgot-password.module.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const onChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handleClick = () => {
        navigate('/reset-password');
    };

    return (
        <main>
            <section className={style.container}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: '24px', paddingTop: '24px', paddingBottom: '24px' }}>
                    <EmailInput placeholder="Укажите e-mail" onChange={onChange} value={email} name={'email'} isIcon={false} />
                </div>
                <Button onClick={handleClick} htmlType="button" type="primary" size="medium">
                    Восстановить
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '80px' }}>
                    <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Вспомнили пароль?</p>
                    <Link to="/login">
                        <Button htmlType="button" type="secondary" size="medium">
                            Войти
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default ForgotPassword;
