import {Button, Card, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import {deleteRequest} from "../services/ApiServices";

const CategoryCard =({CardTitle,CardImage,BookCount,HandleDeleteAction,HandleUpdateAction})=>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete =()=>{
        HandleDeleteAction();
        handleClose();
    }

    return(
        <>
            <Card style={{ width: '14rem',margin:'auto',backgroundColor:'#a3ceba' ,marginBottom:'5px'}}>
                <Card.Img variant="top" src={CardImage} style={{padding:'8px'}}/>
                <Card.Body>
                    <Card.Title style={{textAlign:"center"}}>{CardTitle}</Card.Title>
                    <Row>
                        <h6 style={{textAlign:"center"}}>Books Count : {BookCount}</h6>
                    </Row>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <Button className={"bg-success mx-2"} onClick={HandleUpdateAction} >Update</Button>
                        <Button variant="danger" onClick={handleShow}>
                            Delete
                        </Button>

                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Category</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Do you want to delete the category?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="danger" onClick={handleDelete}>Delete</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                </Card.Body>
            </Card>
        </>
    )
}

export default CategoryCard;