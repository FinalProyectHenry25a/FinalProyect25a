import React from 'react'
import { Link } from 'react-router-dom'

export default function UsersControl (){
    return (
        <div>
            <Link to='/admin'><button>◀ Back</button></Link>
            <h1>edito usuarios</h1>
        </div>
    )
}