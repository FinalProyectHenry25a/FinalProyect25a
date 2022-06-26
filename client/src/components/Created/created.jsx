import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postPhone } from "../../Actions/index"

   
export default function PhoneCreate(){
    const dispatch = useDispatch()

    const [input,setInput] = useState({
        brand: "",
        model: "",
        releaseDate : "",
        rating : "",
        price : "",
        images : "",
        color : "",
        processor : "",
        ram : "",
        rom : "",
        network : "",
        batery : "",
        frontal_cam : "",
        main_cam : "",
        inches : "",
        screen : "",
        resolution : "",
        stock : "",
    })

    function handleOnChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })}

    function handleBrand(e){
            setInput({
                ...input,
                brand: e.target.value
            })
        }
        function handleRAM(e){
            setInput({
                ...input,
                ram: e.target.value
            })
        }
        function handleROM(e){
            setInput({
                ...input,
                rom: e.target.value
            })
        }
        function handleNetwork(e){
            setInput({
                ...input,
                network: e.target.value
            })
        }

        function handleSubmit(e){
                 e.preventDefault();
                 dispatch(postPhone(input))
                 alert ("the Phone has been created successfully")
                 setInput({
                    brand: "",
                    model: "",
                    releaseDate : "",
                    rating : "",
                    price : "",
                    images : "",
                    color : "",
                    processor : "",
                    ram : "",
                    rom : "",
                    network : "",
                    batery : "",
                    frontal_cam : "",
                    main_cam : "",
                    inches : "",
                    screen : "",
                    resolution : "",
                    stock : "",
                    })
    }

return(
    <div>
        <Link to='/admin'><button>◀ Back</button></Link>
        <form onSubmit={(e) => handleSubmit(e)}>
                <h3> Model :  
                <input type="text"
                value= {input.model}
                name= "model"
                onChange={(e)=> handleOnChange(e)}/>
                </h3>
                <div>
                <label>
                    <h3> Brand : 
                <select onChange={(e)=> handleBrand(e)}>
                            <option value="Samsung">Samsung</option>
                            <option value="Apple">Apple</option>
                            <option value="Huawei">Huawei</option>
                            <option value="Oppo">Oppo</option>
                            <option value="Motorola">Motorola</option>
                            <option value="Xiaomi">Xiaomi</option>
                    </select>  
                    </h3>
                </label>
                </div>
                <div>
                    <h3> Release Date:
                <input type="date"
                value= {input.released}
                name= "releaseDate" 
                onChange={(e)=> handleOnChange(e)}/>
                </h3>
                </div>
                <div>
                <h3> Price : $  
                <input type="number"
                value= {input.price}
                name= "price"
                onChange={(e)=> handleOnChange(e)}/>
                </h3>
                </div>
                <div>
                <h3> Images :
                <input type="text"
                value= {input.images}
                name= "images" 
                onChange={(e)=> handleOnChange(e)}/>
                </h3>
                </div>
                <div>
                <h3> Color :
                <input type="text"
                value= {input.color}
                name= "color" 
                onChange={(e)=> handleOnChange(e)}/>
                </h3>
                </div>
                <div>
                <label>
                    <h3> Memory RAM : 
                <select onChange={(e)=> handleRAM(e)}>
                            <option value="4Gb">4Gb</option>
                            <option value="6Gb">6Gb</option>
                            <option value="8Gb">8Gb</option>
                            <option value="12Gb">12Gb</option>
                    </select>  
                    </h3>
                </label>
                </div>
                <div>
                <label>
                    <h3> Memory ROM : 
                <select onChange={(e)=> handleROM(e)}>
                            <option value="32Gb">32Gb</option>
                            <option value="64Gb">64Gb</option>
                            <option value="128Gb">128Gb</option>
                            <option value="256Gb">256Gb</option>
                    </select>  
                    </h3>
                </label>
                </div>
                <div>
                <h3> Processor :
                <input type="text"
                value= {input.processor}
                name= "processor" 
                onChange={(e)=> handleOnChange(e)}/>
                </h3>
                </div>
                <div>
                <label>
                    <h3> Network : 
                <select onChange={(e)=> handleNetwork(e)}>
                            <option value="3G">3G</option>
                            <option value="4G">4G</option>
                            <option value="5G">5G</option>
                    </select>  
                    </h3>
                </label>
                </div>
                <div>
                <h3> Resolution :
                <input type="text"
                placeholder="ancho X alto"
                value= {input.resolution}
                name= "resolution" 
                onChange={(e)=> handleOnChange(e)}/>
                </h3>
                </div>
                <div>
                <h3> Stock :
                <input type="number"
                value= {input.stock}
                name= "stock" 
                onChange={(e)=> handleOnChange(e)}/>
                </h3>
                </div>
                <div>
                <h3> Batery :
                <input type="number"
                value= {input.batery}
                name= "batery" 
                onChange={(e)=> handleOnChange(e)}/>
                </h3>
                </div>
                <div>
                <h3> Frontal camera :
                <input type="number"
                value= {input.frontal_cam}
                name= "frontal_cam" 
                onChange={(e)=> handleOnChange(e)}/>Mpx
                </h3>
                </div>
                <div>
                <h3> Main camera :
                <input type="number"
                value= {input.main_cam}
                name= "main_cam" 
                onChange={(e)=> handleOnChange(e)}/>Mpx
                </h3>
                </div>
                <div>
                <h3> Inches :
                <input type="number"
                value= {input.inches}
                name= "inches" 
                onChange={(e)=> handleOnChange(e)}/>
                </h3>
                </div>
                <div>
                <h3> Rating :
                <input type="number"
                value= {input.rating}
                name= "rating" 
                onChange={(e)=> handleOnChange(e)}/>
                </h3>
                </div>
                <div>
                <h3> Screen :
                <input type="text"
                value= {input.screen}
                name= "screen" 
                onChange={(e)=> handleOnChange(e)}/>
                </h3>
                </div>
                <button type="submit">Crear</button>
                </form>

    </div>
)}