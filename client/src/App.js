//import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/home';
import Detail from './components/Detail/detail';
import Created from './components/Created/created'
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
          <Route path="/agregado" component={Created}/>
        </Switch>
      </BrowserRouter>

  );

}

export default App;
