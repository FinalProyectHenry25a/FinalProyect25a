import React from 'react'
import { Link } from 'react-router-dom'

export default function PostsDelete (){
    return (
        <div>
            <Link to='/admin'><button>◀ Back</button></Link>
            <h1>borro publicaciones</h1>
        </div>
    )
}