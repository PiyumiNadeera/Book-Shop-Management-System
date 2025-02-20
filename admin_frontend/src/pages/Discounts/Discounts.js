import {useEffect, useState} from "react";
import {deleteRequest, getRequest, putRequest} from "../../services/ApiServices";
import {Button, Col, Container, Form, Modal, Offcanvas, Row, Table} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {useNavigate} from "react-router-dom";

const Discounts =()=>{

    const [discounts,setDiscounts] = useState([])
    const [books,setBooks] = useState([])
    const [show, setShow] = useState(false)
    const [discountId,setDiscountId] = useState(0)
    const [discountType,setDiscountType] = useState("")
    const [discountValue,setDiscountValue] = useState(0.00)
    const [discountStartDate,setDiscountStartDate] = useState(null)
    const [discountEndDate,setDiscountEndDate] = useState(null)
    const [deletingId,setDeletingId] = useState(0)
    const [showDeleteAlert,setShowDeleteAlert] = useState(false)
    const [searchText,setSearchText] = useState("")
    const [searchResults,setSearchResults] = useState([])
    const navigate = useNavigate()

    const handleDeletionShow =()=> setShowDeleteAlert(true)
    const handleDeleteClose =()=> setShowDeleteAlert(false)

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleRedirect =()=>{
        navigate("/addNewDiscount")
    }

    useEffect(() => {
        getAllDiscounts()
        getAllBooks()
    }, []);

    const getAllDiscounts = async () =>{
        try{
            const response = await getRequest("/discounts")
            if(response){
                setDiscounts(response.data)
                console.log(response.data)
            }
        }catch (error){
            console.log(error)
        }
    }

    const getAllBooks = async () => {
        try{
            const response = await getRequest("/books")
            if(response){
                setBooks(response.data)
                console.log(response.data)
            }
        }catch (error){
            console.log(error)
        }
    }

    const handleUpdate =(id,type,value,startDate,endDate)=>{
        handleShow()
        setDiscountId(id)
        setDiscountType(type)
        setDiscountValue(value)
        setDiscountStartDate(startDate)
        setDiscountEndDate(endDate)
    }

    const handleDiscountType =(event) =>{
        setDiscountType(event.target.value)
    }

    const handleDiscountValue =(event) =>{
        setDiscountValue(event.target.value)
    }

    const handleDiscountStartDate =(date) =>{
        if (date) {
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            setDiscountStartDate(localDate);
        }
    }

    const handleDiscountEndDate =(date) =>{
        if (date) {
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            setDiscountEndDate(localDate);
        }
    }

    const handleDiscountUpdate = async () =>{
        try{
            const data ={
                discountId:discountId,
                discountType:discountType,
                discountValue:discountValue,
                discountStartDate:discountStartDate,
                discountEndDate:discountEndDate
            }

            const response = await putRequest(`/discounts/${discountId}`,data)
            if(response){
                setDiscountId(0)
                setDiscountType("")
                setDiscountValue(0.0)
                setDiscountStartDate(null)
                setDiscountEndDate(null)
            }
        }catch(error){
            console.log(error)
        }
    }

    const handleDelete =  (id)=>{
        handleDeletionShow()
        setDeletingId(id)
    }

    const handleDiscountDelete = async ()=>{
        try{
            const response = await deleteRequest(`/discounts/${deletingId}`)
            if(response){
                handleDeleteClose()
                setDeletingId(0)
                const allDiscounts = getAllDiscounts()
                setDiscounts(allDiscounts.data)
            }
        }catch(error){
            console.log(error)
        }
    }

    const handleSearchText =(event)=>{
        setSearchText(event.target.value)
    }

    const showSearchResults =(event)=>{
        event.preventDefault()
        const filteredDiscounts =  discounts.filter(discount=>discount.discountType.toLowerCase().includes(searchText.toLowerCase()))
        setSearchResults(filteredDiscounts)
    }

    const handleClearSearch =(event)=>{
        event.preventDefault()
        setSearchText("")
        setSearchResults([])
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
                    <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Discounts</h1>
                </Row>

                <Row style={{display: "flex", marginTop: "40px"}}>
                    <Col xs={12} md={9} lg={8}>
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
                                    <Button type="submit" variant="success m-1" onClick={showSearchResults}>Search</Button>
                                    <Button type="submit" variant="success m-1" onClick={handleClearSearch}>Clear Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col xs="auto" lg={4} style={{display:"flex",justifyContent:"right"}}>
                        <button type="button" className="btn btn-success m-1" onClick={handleRedirect} ><h5>Add New Discount</h5></button>
                    </Col>
                </Row>
                {searchResults.length>0 && (
                    <Row>
                        <h5 className={"my-2"}>Search Results...</h5>
                        <Table responsive striped bordered hover>
                            <thead>
                            <tr>
                                <th>Discount Id</th>
                                <th>Type</th>
                                <th>Value</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Books Count</th>
                            </tr>
                            </thead>

                            {searchResults.map(discount=>{
                                const bookCount =  books.filter(book => book.discount.discountId === discount.discountId).length

                                return (
                                    <tbody>
                                    <tr key={discount.discountId}>
                                        <td>{discount.discountId}</td>
                                        <td>{discount.discountType}</td>
                                        <td>{discount.discountValue}</td>
                                        <td>{new Date(discount.discountStartDate).toISOString().split("T")[0]}</td>
                                        <td>{new Date(discount.discountEndDate).toISOString().split("T")[0]}</td>
                                        <td>{bookCount}</td>
                                        <td>
                                            <Button variant={"success m-1"} onClick={()=>handleUpdate(discount.discountId,discount.discountType,discount.discountValue,discount.discountStartDate,discount.discountEndDate)}>Update</Button>
                                            <Button variant={"danger m-1"} onClick={()=>handleDelete(discount.discountId)}>Delete</Button>
                                        </td>
                                    </tr>
                                    < /tbody>
                                )})}
                        </Table>
                    </Row>
                )}

                <Row style={{backgroundColor: "#198452", color: "white",marginTop:"20px"}}>
                    <h4 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>All Discounts</h4>
                </Row>

                <Row style={{marginTop:"20px"}}>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>Discount Id</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Books Count</th>
                        </tr>
                        </thead>

                        {discounts && discounts.map(discount=>{
                            const bookCount =  books.filter(book => book.discount.discountId === discount.discountId).length

                            return (
                                <tbody>
                                <tr key={discount.discountId}>
                                    <td>{discount.discountId}</td>
                                    <td>{discount.discountType}</td>
                                    <td>{discount.discountValue}</td>
                                    <td>{new Date(discount.discountStartDate).toISOString().split("T")[0]}</td>
                                    <td>{new Date(discount.discountEndDate).toISOString().split("T")[0]}</td>
                                    <td>{bookCount}</td>
                                    <td>
                                        <Button variant={"success m-1"} onClick={()=>handleUpdate(discount.discountId,discount.discountType,discount.discountValue,discount.discountStartDate,discount.discountEndDate)}>Update</Button>
                                        <Button variant={"danger m-1"} onClick={()=>handleDelete(discount.discountId)}>Delete</Button>
                                    </td>
                                </tr>
                                < /tbody>
                            )})}
                    </Table>
                </Row>
                <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                    <Offcanvas.Header closeButton style={{backgroundColor:"#a3ceba"}}>
                        <Offcanvas.Title >Discounts Information</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form style={{marginTop:"20px"}} onSubmit={handleDiscountUpdate}>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <img
                                    src={"https://img.freepik.com/free-vector/sale-full-shopping-cart-red-pictogram_1284-8505.jpg?uid=R185323971&ga=GA1.1.1842316375.1731293893&semt=ais_hybrid_sidr"}
                                    style={{width: "250px"}}/>
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Discount Id
                                </Form.Label>
                                <Col >
                                    <Form.Control type="text" readOnly={true} value={discountId}/>
                                </Col>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label >
                                    Type
                                </Form.Label>
                                <Col >
                                    <Form.Control type="text" value={discountType} onChange={handleDiscountType} placeholder="Enter discount type " />
                                </Col>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label >
                                    Value
                                </Form.Label>
                                <Col >
                                    <Form.Control type="number" step={0.01} value={discountValue} onChange={handleDiscountValue}  placeholder="Enter discount value"/>
                                </Col>
                            </Form.Group>
                            <Form.Group className="my-3">
                                <Form.Label >
                                    Discount Start Date
                                </Form.Label>
                                <Col>
                                    <DatePicker placeholderText="Enter discount start date" selected={discountStartDate} onChange={handleDiscountStartDate} dateFormat="yyyy-MM-dd"/>
                                </Col>
                            </Form.Group>
                            <Form.Group  className="my-3">
                                <Form.Label >
                                    Discount End Date
                                </Form.Label>
                                <Col>
                                    <DatePicker placeholderText="Enter discount end date" selected={discountEndDate} onChange={handleDiscountEndDate}  dateFormat="yyyy-MM-dd"/>
                                </Col>
                            </Form.Group>

                            <Button type="submit" variant={"success"} >Update</Button>
                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>
                <Modal
                    show={showDeleteAlert}
                    onHide={handleDeleteClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Discount</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to delete the discount?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleDeleteClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleDiscountDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            </>
    )
}

export default Discounts