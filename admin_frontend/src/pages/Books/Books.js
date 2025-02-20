import {deleteRequest, getRequest} from "../../services/ApiServices";
import {useEffect, useState} from "react";
import {Button, Col, Container, Form, Offcanvas, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Books = ()=>{

    const [books,setBooks] = useState([])

    const [bookId,setBookId] = useState(null)
    const [bookImage,setBookImage] = useState("")
    const [bookName,setBookName] = useState("")
    const [authorName,setAuthorName] = useState("")
    const [categoryName,setCategoryName] = useState("")
    const [discountType,setDiscountType] = useState("")
    const [discountValue,setDiscountValue] = useState(0)
    const [stockCount,setStockCount] = useState(0)
    const [bookPrice,setBookPrice] = useState(0)
    const [publisherName,setPublisherName] = useState("")
    const [searchText,setSearchText] = useState("")
    const [searchResults,setSearchResults] = useState([])


    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false)
    }


    const handleShow = (id,image,name,author,category,discount_type,discount_value,stock,price,publisher) => {
        setShow(true)
        setBookId(id)
        setBookImage(image)
        setBookName(name)
        setAuthorName(author)
        setCategoryName(category)
        setDiscountType(discount_type)
        setDiscountValue(discount_value)
        setStockCount(stock)
        setBookPrice(price)
        setPublisherName(publisher)
    }

    const handleUpdate =(bookUpdateId)=>{
        navigate("/updateBook")
        sessionStorage.setItem("bookUpdateId",bookUpdateId);
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    const handleRedirect =()=>{
        navigate("/addNewBook");
    }

    const handleDelete = async (bookId)=>{
        try{
            const response = await deleteRequest(`/books/${bookId}`)

            if(response){
                console.log("Book successfully deleted")
                const allBooks =  getAllBooks()
                setBooks(allBooks.data)
            }else{
                console.log("Something went wrong. Try again")
            }
        }catch(error){
            console.log(error)
        }
    }

    const getAllBooks = async ()=>{
        try {
            const response = await getRequest("/books");
            if (response) {
                console.log("Books fetched successfully");
                console.log(response.data)
                setBooks(response.data);
            } else {
                console.error("No books found.");
                setBooks([]);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    const handleSearchText =(event)=>{
        setSearchText(event.target.value)
    }

    const handleSearch =(event)=>{
        event.preventDefault()
        const searchResults = books.filter(book=>book.bookName.toLowerCase().includes(searchText.toLowerCase()))
        setSearchResults(searchResults)
    }

    const handleClearSearch =(event)=>{
        event.preventDefault()
        setSearchResults([])
        setSearchText("")
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

            <Container fluid>
                <Row style={{backgroundColor: "#198452", color: "white"}}>
                    <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Books</h1>
                </Row>

                <Row style={{display: "flex", marginTop: "40px"}}>
                    <Col xs={12} md={9} lg={8} >
                            <Form inline>
                                <Row>
                                    <Col xs={12} lg={7}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Search"
                                            className=" m-1"
                                            value={searchText}
                                            onChange={handleSearchText}
                                        />
                                    </Col>
                                    <Col >
                                        <Button type="submit" variant="success m-1" onClick={handleSearch}>Search</Button>
                                        <Button type="submit" variant="success m-1" onClick={handleClearSearch}>Clear Search</Button>
                                    </Col>
                                </Row>
                            </Form>
                    </Col>
                    <Col lg={4} style={{display:"flex",justifyContent:"right"}} xs={"auto"}>
                        <button type="button" className="btn btn-success m-1" onClick={handleRedirect}><h5>Add New Books</h5></button>
                    </Col>
                </Row>
                {searchResults.length>0 && (
                    <Row >
                        <h5>Search Results</h5>
                        <Table responsive striped bordered hover>
                            <thead>
                            <tr>
                                <th>Book Id</th>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Discount</th>
                                <th>Stock Count</th>
                                <th>Price</th>
                                <th>Publisher</th>
                            </tr>
                            </thead>
                            <tbody>
                            {searchResults.map(book => {
                                return (
                                    <>
                                        <tr>
                                            <td>{book.bookId}</td>
                                            <td>{book.bookName}</td>
                                            <td>{book.author.authorName}</td>
                                            <td>{book.category.categoryName}</td>
                                            <td>{book.discount.discountType}</td>
                                            <td>{book.stockCount}</td>
                                            <td>{book.price.toFixed(2)}</td>
                                            <td>{book.publisher.publisherName}</td>
                                            <td colSpan={2}>
                                                <button type="button" className="btn btn-success m-1"
                                                        onClick={() => handleShow(book.bookId, book.bookImage, book.bookName, book.author.authorName, book.category.categoryName,
                                                            book.discount.discountType, book.discount.discountValue, book.stockCount, book.price, book.publisher.publisherName)}>View
                                                </button>
                                                <button type="button" className="btn btn-success m-1"
                                                        onClick={() => {
                                                            handleUpdate(book.bookId)
                                                        }}>Update
                                                </button>
                                                <button type="button" className="btn btn-danger m-1"
                                                        onClick={() => handleDelete(book.bookId)}>Delete
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                            < /tbody>
                        </Table>

                    </Row>
                )}

                <Row style={{backgroundColor: "#198452", color: "white",marginTop:"20px"}}>
                    <h4 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>All Books</h4>
                </Row>

                <Row style={{justifyContent: "center",marginTop: "30px"}} >
                    <Table responsive striped bordered hover xs={4} md={12} lg={12}>
                        <thead>
                        <tr>
                            <th>Book Id</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Discount</th>
                            <th>Stock Count</th>
                            <th>Price</th>
                            <th>Publisher</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books && books.map(book => {
                            return (
                                <>
                                <tr>
                                    <td>{book.bookId}</td>
                                    <td >{book.bookName}</td>
                                    <td>{book.author.authorName}</td>
                                    <td>{book.category.categoryName}</td>
                                    <td>{book.discount.discountType}</td>
                                    <td>{book.stockCount}</td>
                                    <td>{book.price.toFixed(2)}</td>
                                    <td>{book.publisher.publisherName}</td>
                                    <td colSpan={2}>
                                        <button type="button" className="btn btn-success m-1" onClick={()=>handleShow(book.bookId,book.bookImage,book.bookName,book.author.authorName,book.category.categoryName,
                                            book.discount.discountType,book.discount.discountValue,book.stockCount,book.price,book.publisher.publisherName)}>View</button>
                                        <button type="button" className="btn btn-success m-1 " onClick={()=>{handleUpdate(book.bookId)}}>Update</button>
                                        <button type="button" className="btn btn-danger m-1"
                                                onClick={() => handleDelete(book.bookId)}>Delete
                                        </button>
                                    </td>
                                </tr>
                                </>
                            )
                        })}
                        < /tbody>
                    </Table>
                </Row>
            </Container>

            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton style={{backgroundColor:"#a3ceba"}}>
                    <Offcanvas.Title >Book Information</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <h4 style={{textAlign:"center", backgroundColor:"#a3ceba"}}>{bookName}</h4>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <img src={bookImage} alt="Book image" style={{width: "200px", height: "250px"}}/>
                    </div>

                    <div style={{margin: " 5% 5%"}}>
                        <p><b>Book Id : </b>{bookId}</p>
                        <p><b>Author's name : </b>{authorName}</p>
                        <p><b>Original Price : </b>Rs.{bookPrice.toFixed(2)}</p>
                        <p><b>Category : </b>{categoryName}</p>
                        <p><b>Available Stock : </b>{stockCount}</p>
                        <p><b>Publication : </b>{publisherName}</p>
                        <p><b>Discount Type : </b>{discountType}</p>
                        <p><b>Discount Rate : </b>{discountValue}%</p>
                        <p><b>Price with Discounts : </b>Rs.{(bookPrice-bookPrice*discountValue).toFixed(2)}</p>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </>

    )
}

export default Books;