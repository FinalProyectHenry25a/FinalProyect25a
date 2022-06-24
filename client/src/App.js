import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/home';
import Detail from './components/Detail/detail';
import Created from './components/Created/created'


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route path="/home/:id" component={Detail}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/agregado" component={Created}/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
