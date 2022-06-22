import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/home';
import Detail from './components/detail/Detalle'

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route exact path="/home" component={Home}/>
          <Route path="/home/:id" component={Detail} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
