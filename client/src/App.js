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
import Favourites from './components/User/Favourites';
import MisCompras from './components/User/MisCompras';
import mp from './components/MP/mp';
import ChangePassword from './components/login/changePassword';
import Identify from './components/login/indentify';



const adminEmail = 'santi@santi.santi';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/login" component={Login} />
        <Route path="/identify" component={Identify} />
        <Route path="/changePassword" component={ChangePassword}/>
        <Route path="/register" component={Register} />
        <Route path="/mi-perfil" component={MiPerfil} />
        <Route path="/favoritos" component={Favourites} />
        <Route path="/mis-compras" component={MisCompras} />
        <Route path="/cart" component={Cart} />
        <Route path="/mercadopago" component={mp}/>

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
