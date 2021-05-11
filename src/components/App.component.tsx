import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login/Login.component';
import { MainPage } from './pages/MainPage/MainPage.component';

export const App: FunctionComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/profile" component={MainPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
