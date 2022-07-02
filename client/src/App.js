import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import Identify from './components/login/indentify';
import Posts from './components/Admin/posts';
import ProductToEdit from './components/Admin/ProductToEdit';

<<<<<<< HEAD
=======


const adminEmail = 'fran20@gmail.com';

>>>>>>> 6da1dc6ae36cefdb33c58fad9df35185b850928d
function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/login" component={Login} />
        <Route path="/identify" component={Identify} />
        <Route path="/register" component={Register} />
        <Route path="/mi-perfil" component={MiPerfil} />
        <Route path="/favoritos" component={Favourites} />
        <Route path="/mis-compras" component={MisCompras} />
        <Route path="/cart" component={Cart} />
        <Route path="/mercadopago" component={mp}/>
<<<<<<< HEAD
        <Route path="/admin/agregar-publicacion" component={Created} />
        <Route path="/admin/eliminar-publicacion" component={PostsDelete} />
        <Route path="/admin/editar-stock" component={StockEdit}/>
        <Route path="/admin/control-de-usuarios" component={UsersControl}/>
        <Route path="/admin" component={Admin} />      
=======
        <Route path="/admin/agregar-publicacion" render={ () => <Created userRole={adminEmail}/> } />
        <Route path="/admin/eliminar-publicacion" render={ () => <PostsDelete userRole={adminEmail}/> } />
        <Route path="/admin/editar-stock" render={ () => <StockEdit userRole={adminEmail}/> } />
        <Route path="/admin/posts" component={Posts}/>
        <Route path="/admin/ProductToEdit/:id" component={ProductToEdit}/>
        <Route path="/admin/control-de-usuarios" render={ () => <UsersControl userRole={adminEmail}/> } />
        <Route path="/admin" render={ () => <Admin userRole={adminEmail}/> } />      
>>>>>>> 6da1dc6ae36cefdb33c58fad9df35185b850928d
      </Switch>
    </BrowserRouter>
  );
}

export default App;
