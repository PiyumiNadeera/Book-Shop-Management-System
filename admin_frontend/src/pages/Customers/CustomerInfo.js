import {Button, Col, Container, Dropdown, Form, Row, Table} from "react-bootstrap";
import {getRequest} from "../../services/ApiServices";
import {useEffect, useState} from "react";

const CustomerInfo =()=>{
    const customerId = sessionStorage.getItem("customerInfoId")


    const [customerInfo,setCustomerInfo] = useState("")
    const [orders,setOrders] = useState([])
    const [filteredOrders,setFilteredOrders] = useState([])

    const orderCount = orders.filter(order => order.customer.customerId === customerInfo.customerId).length


    useEffect(() => {
        getCustomerInfo()
        getAllOrders()
    }, [customerId]);

    useEffect(() => {
        filterOrders()
    }, [orders,customerInfo]);

    const getCustomerInfo = async ()=>{
        try{
            const response = await getRequest(`/customers/${customerId}`)
            if(response){
               setCustomerInfo(response.data)
            }
        }catch(error){
            console.log(error)
        }
    }

    const getAllOrders = async ()=>{
        try{
            const response = await getRequest("/orders")
            setOrders(response.data)
        }catch(error){
            console.log(error)
        }
    }

    const filterOrders = ()=>{
        const filteredOrdersList = orders.filter(order => order.customer.customerId === customerInfo.customerId)
        setFilteredOrders(filteredOrdersList)
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
                <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Customer Information</h1>
            </Row>
            <Row style={{display: "flex", justifyContent: "center", marginBottom: "20px",marginTop:"20px"}}>
                <div style={{
                    backgroundColor: "#198452",
                    color: "white",
                    width: "fit-content",
                    paddingLeft: "300px",
                    paddingRight: "300px"
                }}>
                    <h2 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>{customerInfo?.customerName?.toUpperCase() || "N/A"}</h2>
                </div>
            </Row>
            <Row>
                    <Col xs={6} md={6} lg={6}>
                        <Form style={{marginTop:"20px"}}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Customer ID
                            </Form.Label>
                            <Col lg={8}>
                                <Form.Control type="number" readOnly={true} value={customerInfo.customerId}/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Customer Name
                            </Form.Label>
                            <Col lg={8}>
                                <Form.Control type="text"  readOnly={true} value={customerInfo.customerName}/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Contact Number
                            </Form.Label>
                            <Col lg={8}>
                                <Form.Control type="text"  readOnly={true} value={customerInfo.customerContact}/>
                            </Col>
                        </Form.Group>
                        </Form>
                    </Col>
                    <Col lg={6}>
                        <Form style={{marginTop:"20px"}}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Username
                            </Form.Label>
                            <Col lg={8}>
                                <Form.Control type="text" readOnly={true} value={customerInfo.username}/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Order Count
                            </Form.Label>
                            <Col lg={8}>
                                <Form.Control type="text" readOnly={true} value={orderCount}/>
                            </Col>
                        </Form.Group>
                        </Form>
                    </Col>
            </Row>
            <Row >
                <h4 style={{textAlign: "center", marginTop: "40px", marginBottom: "20px"}}>Orders</h4>
            </Row>
            <Row>
                <Table responsive striped bordered hover className="my-3">
                    <thead>
                    <tr>
                        <th>Order Id</th>
                        <th >Price</th>
                        <th>Status</th>
                        <th>Order Date</th>
                        <th>Order Time</th>
                        <th rowSpan={2}>Approved Admin Id</th>
                        <th rowSpan={2}>Approved Admin Name</th>
                    </tr>
                    </thead>

                    {filteredOrders && filteredOrders.map(order=>{
                        return (
                            <tbody>
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.price}</td>
                                <td>{order.status}</td>
                                <td>{new Date(order.orderDate).toISOString().split("T")[0]}</td>
                                <td>{new Date(order.orderDate).toISOString().split("T")[1].split(".")[0]}</td>
                                <td>{order.admin.adminId}</td>
                                <td>{order.admin.adminName}</td>
                            </tr>
                            < /tbody>
                        )
                    })}
                </Table>
            </Row>



        </Container>
    )
}

export default CustomerInfo