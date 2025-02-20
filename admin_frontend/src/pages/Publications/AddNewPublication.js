import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import backgroundImage from "../../assests/newPublicationsBackground.png";
import {useState} from "react";
import {postRequest} from "../../services/ApiServices";

const AddNewPublication =() => {

    const [publisherName, setPublisherName] = useState("")
    const [publisherAddress, setPublisherAddress] = useState("")
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showValidationAlert, setShowValidationAlert] = useState(false)

    const handlePublicationName = (event) => {
        setPublisherName(event.target.value)
    }

    const handlePublisherAddress = (event) => {
        setPublisherAddress(event.target.value)
    }

    const handleSave = async (event) =>{
        event.preventDefault()

            if(!publisherName || !publisherAddress){
                setShowValidationAlert(true)
            }else{
                try{
                    const data={
                        publisherName:publisherName,
                        publisherAddress:publisherAddress
                    }

                    await postRequest("/publications",data)
                    setShowSuccessAlert(true)
                    setPublisherName("")
                    setPublisherAddress("")

                }catch (error){
                    console.log(error)
                }
            }

    }

    return (
        <>
            <style>
                {`
                    body {
                        background-color: #f3f2f7;                  
                    }
                `}
            </style>

            <Container>
                <Row style={{backgroundColor: "#198452", color: "white", marginBottom: "5px"}}>
                    <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Add New Publications</h1>
                </Row>
                <Row style={{marginTop: "50px"}}>
                    <Col xs={12} md={6} lg={6} style={{margin: "auto",display:"flex",justifyContent:"center"}}>
                        <img
                            src={backgroundImage}
                            alt={"New Publications background"} style={{height: "100%",width:"100%"}}/>
                    </Col>
                    <Col lg={5} style={{margin:"auto"}}>
                        <Form onSubmit={handleSave} >
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Publication Name
                                </Form.Label>
                                <Col>
                                    <Form.Control type="text" placeholder="Enter publisher Name " value={publisherName}
                                                  onChange={handlePublicationName}/>
                                </Col>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Author's Bio
                                </Form.Label>
                                <Col>
                                    <Form.Control type="text" placeholder="Enter publisher's address "
                                                  value={publisherAddress}
                                                  onChange={handlePublisherAddress}/>
                                </Col>
                            </Form.Group>

                            <Button type="submit" variant={"success mb-4"}>Add Publication</Button>
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

export default AddNewPublication