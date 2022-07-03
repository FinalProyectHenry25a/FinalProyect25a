import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Comprar from '../Comprar/Comprar'
import axios from 'axios'
import {getLocalCart} from '../../Actions'

function App() {
  const [datos, setDatos] = useState("")
  const cart = useSelector(state => state.cart)
  

  useEffect(()=>{
    axios
    .get("http://localhost:3001/mercadopago")
    .then((data)=>{
      setDatos(data.data)
      console.info('Contenido de data:', data)
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