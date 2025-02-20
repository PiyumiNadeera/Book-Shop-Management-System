import {Alert, Button, Col, Container, Form, Modal, Offcanvas, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {deleteRequest, getRequest, putRequest, putRequestFile} from "../../services/ApiServices";
import {useEffect, useState} from "react";

const Authors =()=>{

    const [authors,setAuthors] = useState([])
    const [books,setBooks] = useState([])
    const [searchResultAuthors,setSearchResultAuthors] = useState([])
    const [authorId,setAuthorId] = useState(null)
    const [authorName,setAuthorName] = useState("")
    const [authorBio,setAuthorBio] = useState("")
    const [searchText,setSearchText] = useState("")
    const [show, setShow] = useState(false);
    const [deletingId,setDeletingId] = useState(0)
    const [showDeleteAlert,setShowDeleteAlert] = useState(false)
    const handleDeletionShow =()=> setShowDeleteAlert(true)
    const handleDeleteClose =()=> setShowDeleteAlert(false)

    const navigate = useNavigate();

    const handleClose = () => setShow(false);

    const handleShow = (authorId,authorName,authorBio) => {
        setShow(true)
        setAuthorId(authorId)
        setAuthorName(authorName)
        setAuthorBio(authorBio)
    }

    useEffect(() => {
        getAllAuthors()
        getAllBooks()
    }, []);

    const handleRedirect =()=>{
        navigate("/addNewAuthor")
    }

    const getAllAuthors = async ()=>{
        try{
            const response = await getRequest("/authors")
            if(response){
                setAuthors(response.data)
                console.log(response.data)
            }
        }catch (error) {
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

    const handleAuthorName =(event) =>{
        setAuthorName(event.target.value)
    }

    const handleAuthorBio =(event) =>{
        setAuthorBio(event.target.value)
    }

    const handleUpdate = async () =>{
        try{
            const data ={
                authorName:authorName,
                bio:authorBio
            }

            const response =await putRequest(`/authors/${authorId}`,data)
            if(response){
                setAuthorId(0)
                setAuthorName("")
                setAuthorBio("")
                getAllAuthors()
            }
        }catch(error){
            console.log(error)
        }
    }

    const handleDelete = (id)=>{
        setDeletingId(id)
        handleDeletionShow()
    }

    const handleDeleteAuthors = async () =>{
        try{
            const response = await deleteRequest(`/authors/${deletingId}`)
            if(response){
                handleDeleteClose()
                const allAuthors = getAllAuthors()
                setAuthors(allAuthors.data)
            }
        }catch(error){
            console.log(error)
        }
    }

    const handleSearchText =(event) =>{
        setSearchText(event.target.value)
    }

    const showSearchResults =(event)=>{
        event.preventDefault()
        const searchResults = authors.filter(author =>author.authorName.toLowerCase().includes(searchText.toLowerCase()))
        setSearchResultAuthors(searchResults)
    }

    const handleClearSearch =(event)=>{
        event.preventDefault()
        setSearchResultAuthors([])
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
                    <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Authors</h1>
                </Row>

                <Row style={{display: "flex", marginTop: "40px"}}>
                    <Col xs={12} md={9} lg={8}>
                        <Form inline>
                            <Row>
                                <Col xs={12} md={9} lg={7}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search"
                                        className=" mr-sm-2"
                                        value={searchText}
                                        onChange={handleSearchText}
                                    />
                                </Col>
                                <Col >
                                    <Button type="submit" variant="success m-1" onClick={showSearchResults}>Search</Button>
                                    <Button type="submit" variant="success m-1" onClick={handleClearSearch}>Clear Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col xs="auto" lg={4} style={{display:"flex",justifyContent:"right"}}>
                        <button type="button" className="btn btn-success m-1 mb-4" onClick={handleRedirect}><h5>Add New Author</h5></button>
                    </Col>
                </Row>
                <Row>
                    {searchResultAuthors.length>0 && (
                        <>
                            <h5 className={"my-3"}>Search Results...</h5>
                            <Table responsive striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Author Id</th>
                                    <th>Author Name</th>
                                    <th>Bio</th>
                                    <th>Book Count</th>
                                </tr>
                                </thead>

                                {searchResultAuthors.map(author=>{
                                    const bookCount =  books.filter(book => book.author.authorName === author.authorName).length

                                    return (
                                        <tbody>
                                        <tr key={author.authorId}>
                                            <td>{author.authorId}</td>
                                            <td>{author.authorName}</td>
                                            <td>{author.bio}</td>
                                            <td>{bookCount}</td>
                                            <td>
                                                <Button variant={"success mx-2"}
                                                        onClick={() => handleShow(author.authorId, author.authorName, author.bio)}>Update</Button>
                                                <Button variant={"danger"}
                                                        onClick={() => handleDelete(author.authorId)}>Delete</Button>
                                            </td>
                                        </tr>
                                < /tbody>
                                    )})}
                                </Table>
                        </>
                    )
                }
                </Row>
                <Row style={{backgroundColor: "#198452", color: "white",marginTop:"20px", marginBottom: "20px"}}>
                    <h4 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>All Authors</h4>
                </Row>
                <Row>
                    <Table responsive striped bordered hover>
                        <thead>
                        <tr>
                            <th>Author Id</th>
                            <th>Author Name</th>
                            <th colSpan={3}>Bio</th>
                            <th>Book Count</th>

                        </tr>
                        </thead>
                        <tbody>
                        {authors && authors.map(author=>{
                            const bookCount =  books.filter(book => book.author.authorName === author.authorName).length
                            return(
                                <>
                                    <tr key={author.authorId}>
                                        <td>{author.authorId}</td>
                                        <td>{author.authorName}</td>
                                        <td colSpan={3}>{author.bio}</td>
                                        <td>{bookCount}</td>
                                        <td >
                                            <Button variant={"success m-1"} onClick={()=>handleShow(author.authorId,author.authorName,author.bio)}>Update</Button>
                                            <Button variant={"danger m-1"} onClick={()=>handleDelete(author.authorId)}>Delete</Button>
                                        </td>
                                    </tr>
                                </>
                            )})}
                        < /tbody>
                    </Table>
                </Row>
                <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                    <Offcanvas.Header closeButton style={{backgroundColor:"#a3ceba"}}>
                        <Offcanvas.Title >Author Information</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form onSubmit={handleUpdate} style={{marginTop:"20px"}}>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <img
                                    src={"https://img.freepik.com/free-vector/notebook-concept-illustration_114360-387.jpg?ga=GA1.1.1842316375.1731293893"}
                                    style={{width: "250px"}}/>
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Author Id
                                </Form.Label>
                                <Col >
                                    <Form.Control type="text" value={authorId}
                                                  readOnly={true}/>
                                </Col>
                            </Form.Group>
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
                                    Bio
                                </Form.Label>
                                <Col >
                                    <Form.Control as="textarea" rows={3}  placeholder="Enter author's new bio " value={authorBio}
                                                  onChange={handleAuthorBio}/>
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
                        <Modal.Title>Delete Author</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to delete the author?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleDeleteClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleDeleteAuthors}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            </>
            )
            }

            export default Authors