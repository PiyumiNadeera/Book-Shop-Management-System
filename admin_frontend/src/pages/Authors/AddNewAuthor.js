import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import backgroundImage from "../../assests/newAuthorBackground.png"
import {useState} from "react";
import {postRequest} from "../../services/ApiServices";

const AddNewAuthor =()=>{

    const [authorName,setAuthorName] = useState("")
    const [authorBio,setAuthorBio] = useState("")

    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showValidationAlert,setShowValidationAlert]=useState(false)

    const handleAuthorName = (event) =>{
        setAuthorName(event.target.value)
    }

    const handleAuthorBio =(event) =>{
        setAuthorBio(event.target.value)
    }


    const handleSave = async (event) =>{

            event.preventDefault()

            if(!authorName || !authorBio){
                setShowValidationAlert(true)
            }else{
                try{
                    const data ={
                        authorName : authorName,
                        bio : authorBio
                    }
                    const response = await postRequest("/authors",data)
                    if(response){
                        console.log("Author successfully added")
                        setShowSuccessAlert(true)
                        setAuthorName("")
                        setAuthorBio("")
                    }
                }catch (error){
                    console.log(error)
                }
            }

    }

    return(
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
                    <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Add New Authors</h1>
                </Row>
                <Row style={{marginTop:"80px"}}>
                    <Col xs={12} md={6} lg={6} style={{display:"flex",justifyContent:"center"}}>
                        <img
                                src={backgroundImage}
                                alt={"New Authors background"} style={{height: "100%",width:"100%"}}/>
                    </Col>
                    <Col lg={5}>
                            <Form onSubmit={handleSave} style={{marginTop:"20px"}}>
                                <Form.Group className="mb-3">
                                    <Form.Label >
                                        Author Name
                                    </Form.Label>
                                    <Col >
                                        <Form.Control type="text" placeholder="Enter author Name " value={authorName}
                                                      onChange={handleAuthorName}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label >
                                        Author's Bio
                                    </Form.Label>
                                    <Col >
                                        <Form.Control as="textarea" rows={5}  placeholder="Enter author's new bio " value={authorBio}
                                                      onChange={handleAuthorBio}/>
                                    </Col>
                                </Form.Group>

                                <Button type="submit" variant={"success mb-3"} >Add Author</Button>
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
                                    One or more fields are empty!!!
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

export default AddNewAuthor