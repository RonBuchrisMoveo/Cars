import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { AppHeader } from 'js/cmps/AppHeader';
import { About } from 'js/pages/About';
import { Login } from 'js/pages/Login';
import { MainApp } from 'js/pages/MainApp';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from 'js/store';
import { useEffect } from 'react';
import { CarForm } from 'js/cmps/CarForm';



export const App =()=> {
  const dispatch = useDispatch()

  useEffect(() => {
    const secret=(document.cookie).slice(7)
    if(secret){
      dispatch(setUser(secret))
    }
  }, [])

    return (
    <div className="app-container">
        <HashRouter>
      <AppHeader />
      <main>
          <Switch>
            <Route path="/edit/:carId">{<CarForm/>}</Route>
            <Route path="/edit">{<CarForm/>}</Route>
            <Route path="/about">{<About/>}</Route>
            <Route path="/login">{<Login/>}</Route>
            <Route path="/">{<MainApp/>}</Route>
          </Switch>
      </main>
        </HashRouter>
    </div>

    
  );
}


