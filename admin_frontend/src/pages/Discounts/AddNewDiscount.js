import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import backgroundImage from "../../assests/newDiscountBackground.png";
import DatePicker from "react-datepicker";
import {useState} from "react";
import {postRequest} from "../../services/ApiServices";

const AddNewDiscount =()=>{

    const [discountType,setDiscountType] = useState("")
    const [discountValue,setDiscountValue] = useState(0.00)
    const [discountStartDate,setDiscountStartDate] = useState(null)
    const [discountEndDate,setDiscountEndDate] = useState(null)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showValidationAlert, setShowValidationAlert] = useState(false)

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

    const handleSave = async (event) =>{
        event.preventDefault()

        if(!discountType || !discountValue){
            setShowValidationAlert(true)
        }else{
            try{
                const data={
                    discountType:discountType,
                    discountValue:discountValue,
                    discountStartDate:discountStartDate,
                    discountEndDate:discountEndDate
                }

                await postRequest("/discounts",data)
                setShowSuccessAlert(true)
                setDiscountType("")
                setDiscountValue(0.0)
                setDiscountStartDate(null)
                setDiscountEndDate(null)


            }catch (error){
                console.log(error)
            }
        }

    }

    return(
        <>
            <Container>
                <Row style={{backgroundColor: "#198452", color: "white", marginBottom: "5px"}}>
                    <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Add New Discount</h1>
                </Row>
                <Row>
                    <Col lg={6}>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <img
                                src={backgroundImage}
                                alt={"New Publications background"} style={{height: "80vh"}}/>
                        </div>
                    </Col>
                    <Col>
                    <Form  style={{marginTop: "100px"}} onSubmit={handleSave}>
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
                                <Form.Control type="number" step={0.01} value={discountValue} onChange={handleDiscountValue}  placeholder="Enter discount value" />
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
                                <DatePicker placeholderText="Enter discount end date" selected={discountEndDate} onChange={handleDiscountEndDate} dateFormat="yyyy-MM-dd"/>
                            </Col>
                        </Form.Group>

                        <Button type="submit" variant={"success"} >Update</Button>
                    </Form>
                        {showSuccessAlert &&
                            <div style={{marginTop: "20px"}}>
                                <Alert show={showSuccessAlert} variant="success" style={{display: "flex"}}>
                                    <h5>
                                        Author successfully added
                                    </h5>

                                    <div className="d-flex justify-content-end" style={{marginLeft: "auto"}}>
                                        <Button onClick={() => setShowSuccessAlert(false)} variant="outline-success">
                                            OK
                                        </Button>
                                    </div>
                                </Alert>
                            </div>
                        }
                        {showValidationAlert &&
                            <div style={{marginTop: "20px"}}>
                                <Alert show={showValidationAlert} variant="danger" style={{display: "flex"}}>
                                    <h6>
                                        One or more fields are empty !!!
                                    </h6>

                                    <div className="d-flex justify-content-end" style={{marginLeft: "auto"}}>
                                        <Button onClick={() => setShowValidationAlert(false)} variant="danger">
                                            Close
                                        </Button>
                                    </div>
                                </Alert>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default AddNewDiscount