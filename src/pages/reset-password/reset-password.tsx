import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './reset-password.module.css';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [value, setValue] = useState('');
    const onChange = (e: any) => {
        setValue(e.target.value);
        setPassword(e.target.value);
    };
    return (
        <main>
            <section className={style.container}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: '24px', paddingTop: '24px', paddingBottom: '24px' }}>
                    <PasswordInput placeholder="Введите новый пароль" onChange={onChange} value={password} name={'password'} extraClass="mb-2" />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                </div>
                <Button htmlType="button" type="primary" size="medium">
                    Сохранить
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

export default ResetPassword;
