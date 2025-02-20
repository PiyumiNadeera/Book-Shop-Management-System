import {useEffect, useState} from "react";
import {deleteRequest, getRequest, putRequest} from "../../services/ApiServices";
import {Button, Col, Container, Form, Modal, Offcanvas, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


const Publications =()=>{

    const [publications,setPublications] = useState([])
    const [books,setBooks] = useState([])
    const [publisherId,setPublisherId] = useState(0)
    const [publisherName,setPublisherName] = useState("")
    const [publisherAddress,setPublisherAddress] = useState("")
    const [show, setShow] = useState(false);

    const [searchText,setSearchText] = useState("")
    const [searchResults,setSearchResults] = useState([])

    const handleClose = () => setShow(false);

    const [deletingId,setDeletingId] = useState(0)

    const [showDeleteAlert,setShowDeleteAlert] = useState(false)
    const handleDeletionShow =()=> setShowDeleteAlert(true)
    const handleDeleteClose =()=> setShowDeleteAlert(false)

    const navigate = useNavigate()


    useEffect(() => {
        getAllPublications()
        getAllBooks()
    }, []);

    const getAllPublications = async () =>{
        try{
            const response = await getRequest("/publications")
            if(response){
                console.log(response.data)
                setPublications(response.data)
            }
        }catch (error){
            console.log(error)
        }
    }

    const getAllBooks = async () =>{
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

    const handleUpdate = (publisherId,publisherName,publisherAddress)=>{
        setShow(true)
        setPublisherId(publisherId)
        setPublisherName(publisherName)
        setPublisherAddress(publisherAddress)

    }

    const handlePublisherName =(event) =>{
        setPublisherName(event.target.value)
    }

    const handlePublisherAddress =(event) =>{
        setPublisherAddress(event.target.value)
    }

    const updateInfo = async () =>{
        try{
            const data ={
                publisherName: publisherName,
                publisherAddress: publisherAddress
            }
            const response = await putRequest(`/publications/${publisherId}`,data)
            if(response){
                setPublisherId(0)
                setPublisherName("")
                setPublisherAddress("")
                const allPublishers = getAllPublications()
                setPublications(allPublishers.data)
            }
        }catch (error){
            console.log(error)
        }
    }

    const handleDelete =(id)=>{
        setDeletingId(id)
        handleDeletionShow()

    }


    const handleDeletePublication = async ()=>{
        try{
            const response = await deleteRequest(`/publications/${deletingId}`)
            if(response){
                const allPublications = getAllPublications()
                setPublications(allPublications.data)
                handleDeleteClose()
            }
        }catch(error){
            console.log(error)
        }
    }

    const handleSearchText =(event) =>{
        setSearchText(event.target.value)
    }

    const handleSearch =(event)=>{
        event.preventDefault()
        const filteredPublishers = publications.filter(publication => publication.publisherName.toLowerCase().includes(searchText.toLowerCase()))
        setSearchResults(filteredPublishers)
    }

    const handleCloseSearch =(event)=>{
        event.preventDefault()
        setSearchResults([])
        setSearchText("")
    }

    const handleRedirect =()=>{
        navigate("/addNewPublication")
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
                    <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Publications</h1>
                </Row>

                <Row style={{display: "flex", marginTop: "40px"}}>
                    <Col xs={12} md={9} lg={8}>
                        <Form inline>
                            <Row >
                                <Col xs={12} md={9} lg={7}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search"
                                        className=" mr-sm-2"
                                        value={searchText}
                                        onChange={handleSearchText}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button type="submit" variant="success m-1" onClick={handleSearch}>Search</Button>
                                    <Button type="submit" variant="success m-1" onClick={handleCloseSearch}>Clear Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col xs="auto" lg={4} style={{display:"flex",justifyContent:"right"}}>
                        <button type="button" className="btn btn-success m-1 mb-4" onClick={handleRedirect}><h5>Add New Publication</h5></button>
                    </Col>
                </Row>

                {searchResults.length>0 && (
                    <Row>
                        <h5 className={"my-2"}>Search Results...</h5>
                        <Table responsive striped bordered hover>
                            <thead>
                            <tr>
                                <th>Publication Id</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Book Count</th>
                            </tr>
                            </thead>
                        {searchResults.map(publication=>{
                            const bookCount =  books.filter(book => book.publisher.publisherName === publication.publisherName).length

                            return (
                                <tbody>
                                <tr key={publication.publisherId}>
                                    <td>{publication.publisherId}</td>
                                    <td>{publication.publisherName}</td>
                                    <td>{publication.publisherAddress}</td>
                                    <td>{bookCount}</td>
                                    <td>
                                        <Button variant={"success m-1"} onClick={()=>handleUpdate(publication.publisherId,publication.publisherName,publication.publisherAddress)}>Update</Button>
                                        <Button variant={"danger m-1"} onClick={()=>handleDelete(publication.publisherId)}>Delete</Button>
                                    </td>
                                 </tr>
                            < /tbody>
                            )})}
                         </Table>
                        </Row>
                )}

                <Row style={{backgroundColor: "#198452", color: "white",marginTop:"20px"}}>
                    <h4 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>All Publications</h4>
                </Row>

                <Row style={{marginTop: "10px"}}>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>Publication Id</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Book Count</th>
                        </tr>
                        </thead>

                        {publications && publications.map(publication=>{
                            const bookCount =  books.filter(book => book.publisher.publisherName === publication.publisherName).length

                            return (
                                <tbody>
                                <tr key={publication.publisherId}>
                                    <td>{publication.publisherId}</td>
                                    <td>{publication.publisherName}</td>
                                    <td>{publication.publisherAddress}</td>
                                    <td>{bookCount}</td>
                                    <td>
                                        <Button variant={"success m-1"} onClick={()=>handleUpdate(publication.publisherId,publication.publisherName,publication.publisherAddress)}>Update</Button>
                                        <Button variant={"danger m-1"} onClick={()=>handleDelete(publication.publisherId)}>Delete</Button>
                                    </td>
                                </tr>
                                < /tbody>
                            )})}
                    </Table>
                </Row>
                <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                    <Offcanvas.Header closeButton style={{backgroundColor:"#a3ceba"}}>
                        <Offcanvas.Title >Publication Information</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form onSubmit={updateInfo} style={{marginTop:"20px"}}>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <img
                                    src={"https://img.freepik.com/free-vector/flat-design-office-printer-illustration_23-2150268493.jpg?uid=R185323971&ga=GA1.1.1842316375.1731293893"}
                                    style={{width: "250px"}}/>
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Publication Id
                                </Form.Label>
                                <Col >
                                    <Form.Control type="text" value={publisherId}
                                                  readOnly={true}/>
                                </Col>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label >
                                    Publication Name
                                </Form.Label>
                                <Col >
                                    <Form.Control type="text" placeholder="Enter publisher's name " value={publisherName}
                                                  onChange={handlePublisherName}/>
                                </Col>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label >
                                    Publication Address
                                </Form.Label>
                                <Col >
                                    <Form.Control type="text"  placeholder="Enter publisher's address" value={publisherAddress}
                                                  onChange={handlePublisherAddress}/>
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
                        <Modal.Title>Delete Publication</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to delete the publication?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleDeleteClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleDeletePublication}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default Publications