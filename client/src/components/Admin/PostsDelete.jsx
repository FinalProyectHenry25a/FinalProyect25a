import React from 'react'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'; //s
//import Button from 'react-bootstrap/Button';  //s traigo solo el componente
import { Button, Alert, Card, Form, Container, Row, Col, Navs } from 'react-bootstrap';   //s traigo toda la librería


export default function PostsDelete (){
    return (

        <div>

            <button className = 'btn btn-primary btn-lg' variant='primary'>Boton bootstrap</button>
            <Button variant='secondary'>Boton bootstrap</Button>
            <Button variant='success'>Boton bootstrap</Button>
            <Button variant='danger'>Boton bootstrap</Button>
            <Button variant='warning'>Boton bootstrap</Button>
            <Button variant='dark'>Boton bootstrap</Button>

            <br/><br/>

            <Alert variant='primary'>Alert bootstrap</Alert>
            <Alert className='col-6' variant='secondary'>Alert bootstrap</Alert>
            <Alert style={{ background: '#C4484C', width:'50%'}} variant='success'>Alert bootstrap</Alert>
            
            <br/><br/>

            <div className='row align-items-center justify-content-center'>
                <Card className='col-5'>  {/*col-5 abarca todos.  col-sm-5 col-md-5 col-lg-5 col-xl-5 */}
                    <Card.Img src="https://es.digitaltrends.com/wp-content/uploads/2022/03/moto-g-power-2022.jpg?fit=720%2C720"/>
                    <Card.Body>
                        <Card.Title>titulo</Card.Title>
                        <Card.Text>texto sobre la card</Card.Text>
                       {/*  <Button>leer mas</Button> */}
                    </Card.Body>
                </Card>
                <Card className='col-5 p-5 m-5' >  {/* padding p-5 margin m-5*/}
                    <Card.Img src="https://es.digitaltrends.com/wp-content/uploads/2022/03/moto-g-power-2022.jpg?fit=720%2C720"/>
                    <Card.Body>
                        <Card.Title>titulo</Card.Title>
                        <Card.Text>texto sobre la card</Card.Text>
                       {/*  <Button>leer mas</Button> */}
                    </Card.Body>
                </Card>
            </div>

            <br/><br/>

            <div className= 'container'> {/* es como un div . simil <Container>*/}   
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>completar email</Form.Label>
                            <Form.Control type='email' placeholder='aaa@aaa.com'/>   {/* input */}
                            <Form.Text className='text-muted'>nunca compartiremos esta info</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>completar contraseña</Form.Label>
                            <Form.Control type='password' placeholder='123'/>   
                            <br/>
                        </Form.Group>
                    </Col>
                </Row>
            </div>
            <br/><br/>



            {/* _______________________________________ */}
            <br/><br/>

            <Link to='/admin'><button>◀ Back</button></Link>
            <h1>borro publicaciones</h1>
        </div>
    )
}