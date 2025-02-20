import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getRequest} from "../../services/ApiServices";

const Customers =()=>{

    const [customers,setCustomers] = useState([])
    const [orders,setOrders] = useState([])
    const [searchText,setSearchText] = useState("")
    const [searchResults,setSearchResults] = useState([])

    useEffect(() => {
        getAllCustomers()
        getAllOrders()
    }, []);

    const getAllCustomers = async ()=>{
        try{
            const response = await getRequest("/customers")
            if(response){
                setCustomers(response.data)
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

    const handleSearchText =(event) =>{
        setSearchText(event.target.value)
    }

    const showSearchResults =(event) =>{
        event.preventDefault()
        const searchResults = customers.filter(customer =>customer.customerName.toLowerCase().includes(searchText.toLowerCase()))
        setSearchResults(searchResults)
    }

    const clearSearch =(event)=>{
        event.preventDefault()
        setSearchResults([])
        setSearchText("")
    }


    return(
        <>
            <Container>
                <style>
                    {`
                    body {
                        background-color: #f3f2f7;                  
                    }
                `}
                </style>

                <Row style={{backgroundColor: "#198452", color: "white"}}>
                    <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Customers</h1>
                </Row>

                <Row style={{display: "flex", marginTop: "40px"}}>
                    <Col>
                        <Form inline>
                            <Row>
                                <Col  xs={12} md={9} lg={7}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search"
                                        className=" mr-sm-2"
                                        value={searchText}
                                        onChange={handleSearchText}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button type="submit" variant="success m-1" onClick={showSearchResults} >Search</Button>
                                    <Button type="submit" variant="success m-1" onClick={clearSearch}>Clear
                                        Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                {searchResults.length>0 && (
                    <Row>
                        <h5 className={"my-2"}>Search Results...</h5>
                        <Table responsive striped bordered hover>
                            <thead>
                            <tr>
                                <th>Customer Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>User name</th>
                                <th>No of orders</th>
                            </tr>
                            </thead>

                            {searchResults.map(customer => {
                                const orderCount = orders.filter(order => order.customer.customerId === customer.customerId).length

                                return (
                                    <tbody>
                                    <tr key={customer.customerId}>
                                        <td>{customer.customerId}</td>
                                        <td>{customer.customerName}</td>
                                        <td>{customer.customerEmail}</td>
                                        <td>{customer.customerContact}</td>
                                        <td>{customer.username}</td>
                                        <td>{orderCount}</td>
                                    </tr>
                                    < /tbody>
                                )
                            })}
                        </Table>

                    </Row>
                )}

                <Row style={{backgroundColor: "#198452", color: "white",marginTop:"20px"}}>
                    <h4 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>All Customers</h4>
                </Row>

                <Row  style={{marginTop:"20px"}}>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>Customer Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>User name</th>
                            <th>No of orders</th>
                        </tr>
                        </thead>

                        {customers && customers.map(customer=>{
                           const orderCount = orders.filter(order => order.customer.customerId === customer.customerId).length

                            return (
                                <tbody>
                                <tr key={customer.customerId}>
                                    <td>{customer.customerId}</td>
                                    <td>{customer.customerName}</td>
                                    <td>{customer.customerEmail}</td>
                                    <td>{customer.customerContact}</td>
                                    <td>{customer.username}</td>
                                    <td>{orderCount}</td>
                                </tr>
                                < /tbody>
                            )})}
                    </Table>
                </Row>
            </Container>
        </>
    )
}

export default Customers