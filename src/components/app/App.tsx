import React from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <main className={style.main}>
        <BurgerIngridients></BurgerIngridients>
        <BurgerConstructor></BurgerConstructor>
      </main>
    </div>
  );
}

export default App;
