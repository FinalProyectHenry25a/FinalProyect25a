import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import Comprar from '../Comprar/Comprar'
import axios from 'axios'


function App() {
  const [datos, setDatos] = useState("")
  const cart = useSelector(state => state.cart)
  console.log(cart)
  

  useEffect(()=>{
    axios
    .post("http://localhost:3001/mercadopago/")
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