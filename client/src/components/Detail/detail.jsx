import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDetails } from '../../Actions/index';
import { Link, useParams } from "react-router-dom";

export default function Detail () {
    const dispatch = useDispatch();
    const {id} = useParams();
    
    useEffect(()=>{
        dispatch(getDetails(id)) 
    },[dispatch , id])

    const PID = useSelector(state => state.phonesId)


return(
    <div>
        <Link to='/home'><button className="back">◀ Back</button></Link>
        <div>
        <h1>{PID.brand}</h1>
        <h1>{PID.model}</h1>
        <img src={PID.images} alt="out" /> 
        <h1>{PID.price}</h1>
        <h3>{PID.releaseDate}</h3>
        <h3>{PID.rating}</h3>
        <h3>{PID.color}</h3>
        <h3>{PID.processor}</h3>
        <h3>{PID.ram}</h3>
        <h3>{PID.rom}</h3>
        <h3>{PID.network}</h3>
        <h3>{PID.batery}</h3>
        <h3>{PID.frontal_cam}</h3>
        <h3>{PID.main_cam}</h3>
        <h3>{PID.inches}</h3>
        <h3>{PID.screen}</h3>
        <h3>{PID.resolution}</h3>
        <h3>{PID.stock}</h3>
                            </div>
    </div>
)

}