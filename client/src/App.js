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
// import { collection, getDocs } from "firebase/firestore";
// import db from "./firebase/firebase-config";
// import Auth from './Auth';



function App() {

  // useEffect(() => {

  //   const obtainData = async () => {

  //     const data = await getDocs(collection(db, "users"));
  //     // console.log(data.docs[0].data());
  //     data.forEach((user) => {
  //       console.log(user.data());
  //     })

  //   }

  //   obtainData();

  // }, [])

  return (

    <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route path="/home/:id" component={Detail}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>

          <Route path="/admin/agregar-publicacion" component={Created}/>
          <Route path="/admin/eliminar-publicacion" component={PostsDelete}/>
          <Route path="/admin/editar-stock" component={StockEdit}/>
          <Route path="/admin/control-de-usuarios" component={UsersControl}/>
          <Route path="/admin" component={Admin}/>
        </Switch>
      </BrowserRouter>

  );

}

export default App;
