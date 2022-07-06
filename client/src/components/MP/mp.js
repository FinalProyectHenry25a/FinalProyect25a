import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import Comprar from '../Comprar/Comprar'
import axios from 'axios'
import {getLocalCart} from '../../Actions'
import { auth } from '../../firebase/firebase-config'

function App() {
  const [datos, setDatos] = useState("")
  const cart = useSelector(state => state.cart)
  
  

  //  useEffect(()=>{
  //    axios
  //    .get("http://localhost:3001/mercadopago/")
  //    .then((data)=>{
  //      setDatos(data.data)
  //      console.info('Contenido de data:', data)
  //    }).catch(err => console.error(err))
  //  },[])
  const productos = cart.map(e => ({
    title: e.model,
    unit_price: e.price,
    quantity: e.qty
  }))


  useEffect(()=>{
    let pack = []
    pack.push(cart)
    pack.push(auth.currentUser.email)
    axios
    .post(`http://localhost:3001/mercadopago`, pack)
    .then((data)=>{
      setDatos(data.data)
    }).catch(err => console.error(err))
  },[])

  return (
    <div className="App">
       { !datos
        ? <p>Aguarde un momento....</p>  
        : <Comprar productos={cart} data={datos}/>
       } 
    </div>
  );
}

export default App;