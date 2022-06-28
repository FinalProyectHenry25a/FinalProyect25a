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
<<<<<<< HEAD
=======
import Cart from './components/cart/Cart';
// import { collection, getDocs } from "firebase/firestore";
// import db from "./firebase/firebase-config";
// import Auth from './Auth';
>>>>>>> df62b1d73c4991f44f24ec76d38e4c2e342ae0ca


const adminEmail = 'santi@santi.santi';

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/mi-perfil" component={MiPerfil} />
=======
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route path="/home/:id" component={Detail}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/mi-perfil" component={MiPerfil}/>

          <Route path="/admin/agregar-publicacion" component={Created}/>
          <Route path="/admin/eliminar-publicacion" component={PostsDelete}/>
          <Route path="/admin/editar-stock" component={StockEdit}/>
          <Route path="/admin/control-de-usuarios" component={UsersControl}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/cart" component={Cart} />

        </Switch>
      </BrowserRouter>
>>>>>>> df62b1d73c4991f44f24ec76d38e4c2e342ae0ca

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
