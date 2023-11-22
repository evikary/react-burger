import React from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';

function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <main className={style.main}>
        <BurgerIngridients></BurgerIngridients>
      </main>
    </div>
  );
}

export default App;
