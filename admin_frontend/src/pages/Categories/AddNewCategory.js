import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {useRef, useState} from "react";
import {postRequestFile} from "../../services/ApiServices";
import backgroundImage from "../../assests/NewCategoryBackground.png";


const AddNewCategory =()=>{

    const [categoryName,setCategoryName] = useState(null)
    const [categoryImage,setCategoryImage] = useState(null)

    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showValidationAlert,setShowValidationAlert]=useState(false)

    const imageRef = useRef(null)

    const handleCategoryName=(event)=>{
        setCategoryName(event.target.value)
    }

    const handleCategoryImage=(event)=>{
        setCategoryImage(event.target.files[0])
    }

    const addNewCategory = async (event)=>{
            event.preventDefault()

            if (!categoryName || !categoryImage){
                setShowValidationAlert(true)
            }else{
                try{
                    const formData = new FormData

                    formData.append("categoryName",categoryName)
                    formData.append("categoryImage",categoryImage)

                    await postRequestFile("/categories",formData)
                    console.log("Category added successfully")
                    setCategoryName("")
                    setCategoryImage(null)
                    imageRef.current.value=""
                    setShowSuccessAlert(true)

                }catch(error){
                    console.log(error)
                }
            }

    }


    return(
        <>
        <Container>
            <Row style={{backgroundColor: "#198452", color: "white", marginBottom: "5px"}}>
                <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Add New Categories</h1>
            </Row>
            <Row style={{marginTop:"80px"}}>
                <Col xs={12} md={6} lg={6} style={{margin: "auto",display:"flex",justifyContent:"center"}}>
                            <img
                                src={backgroundImage}
                                alt={"New Categories background"} style={{height: "100%",width:"100%"}}/>
                </Col>
                <Col>
                    <Form onSubmit={addNewCategory} style={{marginTop:"20px"}}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Category Name
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" placeholder="Enter the name of the category" value={categoryName}
                                              onChange={handleCategoryName}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formFile" className="mb-3">
                            <Form.Label column sm={2}>Category Image</Form.Label>
                            <Col sm={8}>
                                <Form.Control type="file" ref={imageRef} onChange={handleCategoryImage}/>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{span: 10, offset: 2}}>
                                <Button type="submit" variant="success">Add Category</Button>
                            </Col>
                        </Form.Group>
                    </Form>

                </Col>
            </Row>
            {showSuccessAlert &&
                <div style={{margin: "auto", width: "50%"}}>
                    <Alert show={showSuccessAlert} variant="success" style={{display: "flex"}}>
                        <h5>
                            Category successfully added
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
                <div style={{margin: "auto", width: "50%"}}>
                    <Alert show={showValidationAlert} variant="danger" style={{display: "flex"}}>
                        <h5>
                            One or more filed are empty !!!
                        </h5>

                        <div className="d-flex justify-content-end" style={{marginLeft: "auto"}}>
                            <Button onClick={() => setShowValidationAlert(false)} variant="danger">
                                Close
                            </Button>
                        </div>
                    </Alert>
                </div>
            }

        </Container>
        </>
    )
}

export default AddNewCategory