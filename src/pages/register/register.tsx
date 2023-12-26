import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './register.module.css';

function Register() {
    const [value, setValue] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChange = (e: any) => {
        setValue(e.target.value);
        setEmail(e.target.value);
        setPassword(e.target.value);
    };

    return (
        <main>
            <section className={style.container}>
                <h1 className="text text_type_main-medium">Регистрация</h1>
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: '24px', paddingTop: '24px', paddingBottom: '24px' }}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                    />
                    <EmailInput onChange={onChange} value={email} name={'email'} isIcon={false} />
                    <PasswordInput onChange={onChange} value={password} name={'password'} extraClass="mb-2" />
                </div>
                <Button htmlType="button" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '80px' }}>
                    <p className={`text text_type_main-default text_color_inactive ${style.text}`}>Уже зарегистрированы?</p>
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

export default Register;
