import {Nav, Container, Navbar, Row, Col, Button} from "react-bootstrap";
import {Outlet} from "react-router-dom";

export const HomeLayout = () =>{
    return(
        <>
            <Container fluid>
                <Row >
                    <Col lg={2}>
                        <Row>
                                <Navbar collapseOnSelect expand="lg" >
                                    <Container className={"flex-column"}>
                                        <div style={{background:"#badacb",padding:"10px",borderRadius:"10px",border:"2px solid #020d08"}}>
                                            <Navbar.Brand href="/dashboard"><h2>BOOKSCAPE</h2></Navbar.Brand>
                                            <h6>Explore, Discover, Read</h6>
                                        </div>
                                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                        <Navbar.Collapse id="responsive-navbar-nav">
                                            <Nav className="flex-column mt-3">
                                                <Nav.Link href="/dashboard"><Button variant={"success"} style={{width:"10rem",height:"3.5rem"}}>Dashboard</Button></Nav.Link>
                                                <Nav.Link href="/books"><Button variant={"success"} style={{width:"10rem",height:"3.5rem"}}>Books</Button></Nav.Link>
                                                <Nav.Link href="/categories"><Button variant={"success"} style={{width:"10rem",height:"3.5rem"}}>Categories</Button></Nav.Link>
                                                <Nav.Link href="/authors"><Button variant={"success"} style={{width:"10rem",height:"3.5rem"}}>Authors</Button></Nav.Link>
                                                <Nav.Link href="/publications"><Button variant={"success"} style={{width:"10rem",height:"3.5rem"}}>Publications</Button></Nav.Link>
                                                <Nav.Link href="/orders"><Button variant={"success"} style={{width:"10rem",height:"3.5rem"}}>Orders</Button></Nav.Link>
                                                <Nav.Link href="/customers"><Button variant={"success"} style={{width:"10rem",height:"3.5rem"}}>Customers</Button></Nav.Link>
                                                <Nav.Link href="/discounts"><Button variant={"success"} style={{width:"10rem",height:"3.5rem"}}>Discounts</Button></Nav.Link>
                                            </Nav>
                                        </Navbar.Collapse>
                                    </Container>
                                </Navbar>
                        </Row>
                    </Col>

                <Col>
                    <Outlet/>
                </Col>
                </Row>
            </Container>
        </>
    )
}

