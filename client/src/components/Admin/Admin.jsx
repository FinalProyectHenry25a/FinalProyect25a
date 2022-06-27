import React from "react";
import {Link} from 'react-router-dom';

export default function Admin (){
    return (
        <div>
            <h1>Administración de la página</h1>
            <Link to='/admin/agregar-publicacion'><button>Publicar nuevo artículo</button></Link>
            <br/>
            <Link to = "/admin/eliminar-publicacion"><button>Eliminar Publicación</button></Link>
            <br/>
            <Link to="/admin/editar-stock" ><button>Modificar stock de productos</button></Link>
            <br/>
            <Link to="/admin/control-de-usuarios"><button>Administrar usuarios</button></Link>
            <h3>Ventas realizadas:</h3>
        </div>
    )
}