import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/home';
import Detail from './components/Detail/detail';
import Created from './components/Created/created';
import Admin from './components/Admin/Admin';
import Posts from './components/Admin/posts';
import StockEdit from './components/Admin/StockEdit';
import UsersControl from './components/Admin/UsersControl';
import MiPerfil from './components/User/MiPerfil';
import Cart from './components/cart/Cart';
import Favourites from './components/User/Favourites';
import MisCompras from './components/User/MisCompras';
import mp from './components/MP/mp';
import Identify from './components/login/indentify';
import Contacto from './components/Contacto/contacto';
import ProductToEdit from './components/Admin/ProductToEdit';
import Users from './components/Admin/users';
<<<<<<< HEAD
import BannedUser from './components/User/BannedUser';
=======
import Preguntas from './components/Admin/Preguntas';
>>>>>>> f56342f91b691216f00faab6ae28cfa2eb183aa4
import LandingPage from './components/landingPage/LandingPage';


function App() {

  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/banned" component={BannedUser} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/:id" component={Detail} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/identify" component={Identify} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/mi-perfil" component={MiPerfil} />
        <Route exact path="/favoritos" component={Favourites} />
        <Route exact path="/mis-compras" component={MisCompras} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/mercadopago" component={mp}/>
        <Route exact path="/admin/agregar-publicacion" component={Created} />
        <Route exact path="/admin/publicaciones" component={Posts} />
        <Route exact path="/admin/editar-stock" component={StockEdit}/>
        <Route exact path="/admin/control-de-usuarios" component={UsersControl}/>
        <Route exact path="/admin" component={Admin} />      
        <Route exact path="/admin/users" component={Users}/> 
        <Route exact path="/admin/ProductToEdit/:id" component={ProductToEdit}/> 
        <Route exact path="/contacto" component={Contacto} /> 
<<<<<<< HEAD
=======
        <Route exact path="/admin/preguntas" component={Preguntas}/>
>>>>>>> f56342f91b691216f00faab6ae28cfa2eb183aa4
      </Switch>
    </BrowserRouter>
  );
}

export default App;
