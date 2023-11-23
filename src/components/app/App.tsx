import React from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <>
      <AppHeader />
      <main className={style.main}>
        <BurgerIngridients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
