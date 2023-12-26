import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import style from './profile.module.css';

function Profile() {
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
                <aside>
                    <ul>
                        <li className={`text text_type_main-medium ${style.link}`}>Профиль</li>
                        <li className={`text text_type_main-medium ${style.link}`}>История заказов</li>
                        <li className={`text text_type_main-medium ${style.link}`}>Выход</li>
                    </ul>
                </aside>
                <div className={style.box2}>
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '24px', paddingBottom: '24px' }}>
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
                            icon="EditIcon"
                        />
                        <EmailInput placeholder="E-mail" onChange={onChange} value={email} name={'email'} isIcon={true} />
                        <PasswordInput placeholder="Пароль" onChange={onChange} value={password} name={'password'} icon="EditIcon" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <Button htmlType="button" type="primary" size="medium">
                            Сохранить
                        </Button>
                        <Button htmlType="button" type="secondary" size="medium">
                            Отмена
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Profile;
