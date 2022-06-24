import React from "react";
import { useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { filterOrder } from "./ActionsFilter";

const FilterAndOrder = () => {
    const dispatch = useDispatch()
    const [send, setSend] = useState({
     byRom: null,
     byRam: null,
     byBrand: null,
     byPrice: null,
     byNetwork: null,
     byProcessor: null,
     byOrder: null
    });
   

  

    function filterOnChange (e){
          setSend({
            ...send,
            byBrand: e.target.value,
            
              //  byRom:document.getElementById('byRom').value,
              //  byRam:document.getElementById('byRam').value,
               
          //   byPrice:document.getElementById('byPrice').value,
          //   byNetwork:document.getElementById('byNetwork').value,
          //   byProcessor:document.getElementById('byProcessor').value,
          //   byOrder:document.getElementById('byOrder').value,
  
      
          })
    dispatch(filterOrder(send))
    console.log(send)
    
}
    
    

    return(
        <div>
            
            <button name="Samsung" value="Samsung" onClick={filterOnChange}>Samsung</button>
            <button name="Apple" value="Apple" onClick={filterOnChange}>Apple</button>
            <button name="Motorola" value="Motorola" onClick={filterOnChange}>Motorola</button>
            <button name="Xiaomi" value="Xiaomi" onClick={filterOnChange}>Xiaomi</button>
            <button name="Huawei" value="Huawei" onClick={filterOnChange}>Huawei</button>
        </div>
    )
    
}

export default FilterAndOrder