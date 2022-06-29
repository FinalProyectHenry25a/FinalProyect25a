import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/home';
import Detail from './components/Detail/detail';
import Created from './components/Created/created';
import Admin from './components/Admin/Admin';
import PostsDelete from './components/Admin/PostsDelete';
import StockEdit from './components/Admin/StockEdit';
import UsersControl from './components/Admin/UsersControl';
import MiPerfil from './components/User/MiPerfil';
import Cart from './components/cart/Cart';



const adminEmail = 'admin@admin.admin';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/mi-perfil" component={MiPerfil} />

        <Route path="/admin/agregar-publicacion" render={ () => <Created userRole={adminEmail}/> } />
        <Route path="/admin/eliminar-publicacion" render={ () => <PostsDelete userRole={adminEmail}/> } />
        <Route path="/admin/editar-stock" render={ () => <StockEdit userRole={adminEmail}/> } />
        <Route path="/admin/control-de-usuarios" render={ () => <UsersControl userRole={adminEmail}/> } />
        <Route path="/admin" render={ () => <Admin userRole={adminEmail}/> } />      
      </Switch>
    </BrowserRouter>
  );
}

export default App;
