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
    },[id])

    const PID = useSelector((state) => state.phonesId)


return(
    <div>
        <Link to='/home'><button>◀ Back</button></Link>
        <div>
        <h1>{PID.brand} {PID.model}</h1>
        <img src={PID.images} />
        <h3>Price : ${PID.price}</h3>
        <h3>release Date: {PID.releaseDate}</h3>
        <h3>Rating : {PID.rating}</h3>
        <h3>Resolution : {PID.resolution}</h3>
        <h3>Color : {PID.color}</h3>
        <h3>Processor : {PID.processor}</h3>
        <h3>memory RAM : {PID.ram}</h3>
        <h3>memory ROM : {PID.rom}</h3>
        <h3>Network : {PID.network}</h3>
        <h3>Batery : {PID.batery}</h3>
        <h3>Frontal Camera{PID.frontal_cam}</h3>
        <h3>Main Camera: {PID.main_cam}</h3>
        <h3>Inches : {PID.inches}</h3>
        <h3>Screen : {PID.screen}</h3>
        <h3>Stock : {PID.stock}</h3>
        </div>
    </div>
)

}