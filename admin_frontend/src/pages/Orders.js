import {Button, Col, Container, Dropdown, Form, Modal, Offcanvas, Row, Table} from "react-bootstrap";
import {getRequest, putRequest} from "../services/ApiServices";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Orders =()=>{

    const [orders,setOrders] = useState([])
    const [orderId,setOrderId] = useState(0)
    const [price,setPrice] = useState(0.0)
    const [status,setStatus] = useState("")
    const [orderDate,setOrderDate] = useState(null)
    const [customerId,setCustomerId] = useState(0)
    const [customerName,setCustomerName] = useState("")
    const [adminId,setAdminId] = useState(0)
    const [adminName,setAdminName] = useState("")
    const [show, setShow] = useState(false)

    const navigate = useNavigate()

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        getAllOrders()
    }, []);

    const getAllOrders = async ()=>{
        try{
            const response = await getRequest("/orders")
            setOrders(response.data)
        }catch(error){
            console.log(error)
        }
    }

    const handleUpdate =(id,price,status,date,cusId,cusName,adminId,adminName)=>{
        handleShow()
        setOrderId(id)
        setPrice(price)
        setStatus(status)
        setOrderDate(date)
        setCustomerId(cusId)
        setCustomerName(cusName)
        setAdminId(adminId)
        setAdminName(adminName)
    }

    const handleStatus =(event)=>{
        setStatus(event)
        console.log(status)
    }

    const handleStatusUpdate = async ()=>{
        try{
            const data={
                status:status
            }
            const response = await putRequest(`/orders/${orderId}`,data)
            if (response){
                setOrderId(0)
                setPrice(0.0)
                setStatus("")
                setOrderDate("")
                setCustomerId(0)
                setCustomerName("")
                setAdminId(0)
                setAdminName("")
            }
        }catch(error){
            console.log(error)
        }
    }


    const showCustomerInfo =(cusId)=>{
        sessionStorage.setItem("customerInfoId",cusId)
         navigate(`/customerInfo/${cusId}`)

    }

    return(
        <Container>
            <style>
                {`
                    body {
                        background-color: #f3f2f7;                  
                    }
                `}
            </style>

            <Row style={{backgroundColor: "#198452", color: "white"}}>
                <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Orders</h1>
            </Row>
            <Row>
                <Table responsive striped bordered hover className="my-3">
                    <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Order Date</th>
                        <th>Order Time</th>
                        <th>Customer Id</th>
                        <th>Customer Name</th>
                        <th>Approved By</th>
                        <th>Admin Id</th>

                    </tr>
                    </thead>

                    {orders && orders.map(order=>{
                        return (
                            <tbody>
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.price.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>{new Date(order.orderDate).toISOString().split("T")[0]}</td>
                                <td>{new Date(order.orderDate).toISOString().split("T")[1].split(".")[0]}</td>
                                <td><Button variant="secondary" style={{width: "45px"}}
                                            onClick={() => showCustomerInfo(order.customer.customerId)}>{order.customer.customerId}</Button>
                                </td>
                                <td>{order.customer.customerName}</td>
                                <td>{order.admin.adminName}</td>
                                <td>{order.admin.adminId}</td>

                                <td>
                                    <Button variant={"success"}
                                            onClick={() => handleUpdate(order.orderId, order.price, order.status, order.orderDate, order.customer.customerId, order.customer.customerName, order.admin.adminId, order.admin.adminName)}>Update
                                        Status</Button>
                                </td>
                            </tr>
                            < /tbody>
                        )
                    })}
                </Table>
            </Row>
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton style={{backgroundColor:"#a3ceba"}}>
                    <Offcanvas.Title >Update Order Status</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form style={{marginTop:"20px"}} onSubmit={handleStatusUpdate}>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <img
                                src={"https://img.freepik.com/free-vector/add-cart-concept-illustration_114360-1445.jpg?ga=GA1.1.1842316375.1731293893&semt=ais_hybrid"}
                                style={{width: "250px"}}/>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Order Id
                            </Form.Label>
                            <Col >
                                <Form.Control type="text" readOnly={true} value={orderId}/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Price
                            </Form.Label>
                            <Col >
                                <Form.Control type="number"  readOnly={true} value={price}/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Status
                            </Form.Label>
                            <Col >
                                <Dropdown onSelect={handleStatus}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {status}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        <Dropdown.Item eventKey="Completed" >Completed</Dropdown.Item>
                                        <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Order Date
                            </Form.Label>
                            <Col >
                                <Form.Control type="text" readOnly={true} value={new Date(orderDate).toISOString().split("T")[0]}/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Customer ID
                            </Form.Label>
                            <Col >
                                <Form.Control type="number" readOnly={true} value={customerId}/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Customer Name
                            </Form.Label>
                            <Col >
                                <Form.Control type="text" readOnly={true} value={customerName}/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Admin ID
                            </Form.Label>
                            <Col >
                                <Form.Control type="number" readOnly={true} value={adminId}/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Admin Name
                            </Form.Label>
                            <Col >
                                <Form.Control type="text" readOnly={true} value={adminName}/>
                            </Col>
                        </Form.Group>

                        <Button type="submit" variant={"success"} >Update</Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    )

}

export default Orders