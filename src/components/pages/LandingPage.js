import React, { useState }  from 'react';
import {withRouter,Link} from 'react-router-dom'
import { Nav,Navbar,Container, Row, Col, Card, Jumbotron, CardDeck} from 'react-bootstrap'
import '../css/LandingPage.css'

 const LandingPage = (props) => {
//    const [base, setBase] = useState('');

    return (
        <div className="text-center">
            <div id="nav">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand >Note Taking Management System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            {/* <Nav className="mr-auto"></Nav> */}
                            <Nav className="ml-auto  ">
                                <Nav.Link href="#login" >Login</Nav.Link>
                                <Nav.Link href="#signup" >SignUp</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                </Navbar>
            </div>

            <div className="text-center" id="home">
            <Jumbotron style={{background:'white'}}>
                <h1>Capture What's on your mind</h1>
                <p>
                    This is a simple way of storing your important information in a organized way.
                </p>
                <br></br>
                <p>
                    <Link to="/signup" className="btn " style={{background:'#ffef5e ', color:'black', fontWeight:'600'}}>Sign Up Now</Link>
                    <br></br>
                    {/* <p style={{fontWeight:'500'}} onClick={(e)=> this.props.history.push('/login')}>Already have an account? Login</p> */}
                </p>

            </Jumbotron>
            </div>
            <div id="about" className="text-center" >
                <h1>How it works?</h1>
                <p>Add your notes, lists and reminders</p>
                <Container>
                    <Row>
                        <Col xs={10} md={4}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Use It Everywhere</Card.Title>
                                    <Card.Text>
                                    Notes stay updated across all your devices, automatically.
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={10} md={4}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Stay Organised</Card.Title>
                                    <Card.Text>
                                    Your Saved Notes stays organised and saves your time.
                                    </Card.Text>
                                
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={10} md={4}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Capture what matters</Card.Title>
                                    <Card.Text>
                                    Add notes, lists for shopping etc
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={10} md={4}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>It’s free</Card.Title>
                                    <Card.Text>
                                    Apps, backups, sharing – it’s all completely free.
                                    </Card.Text>
                                  
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div id="features">
            <h1>Features</h1>
                <Container>

                    <p><span> &#x2714;</span> Keep important info handy by syncing your notes to all your devices. </p>
                    <p><span> &#x2714;</span> Go paperless. Keep the important information organised. </p>
                    <p><span> &#x2714;</span> Share or add a to-do list </p>
                </Container>
            </div>
            
            <div id="footer">
                @2022.All Copyrights Reserved
            </div>
        </div>

    )
}
export default withRouter(LandingPage);