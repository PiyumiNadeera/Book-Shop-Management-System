import {Alert, Button, Col, Container, Form, Row, Toast} from "react-bootstrap";
import {useEffect, useState,useRef} from "react";
import {getRequest, postRequestFile, putRequest, putRequestFile} from "../../services/ApiServices";
import "react-datepicker/dist/react-datepicker.css";

const UpdateBook =()=>{

    const bookUpdateId = sessionStorage.getItem("bookUpdateId")

    const [authors,setAuthors] = useState(null)
    const [categories,setCategories] = useState(null)
    const [discounts,setDiscounts] = useState(null)
    const [publishers,setPublishers] = useState(null)

    const [bookId,setBookId] = useState(0)
    const [bookName,setBookName] = useState("")
    const [bookImage,setBookImage] = useState(null)
    const [bookImageUrl,setBookImageUrl] = useState("")
    const [authorId, setAuthorId] = useState(0)
    const [categoryId,setCategoryId] = useState(0)
    const [discountId, setDiscountId] = useState(0)
    const [bookPrice,setBookPrice] = useState(0.0)
    const [stockCount,setStockCount] = useState(0)
    const [publisherId,setPublisherId] = useState(0)


    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showValidationAlert,setShowValidationAlert]=useState(false)

    const imageRef = useRef(null)


    useEffect(() => {
        getBookInfo();
        getAllAuthors();
        getAllCategories();
        getAllDiscounts();
        getAllPublishers();
    }, [bookUpdateId]);


    const handleBookName = (event) =>{
        setBookName(event.target.value)
    }

    const handleBookImage =(event) =>{
        setBookImage(event.target.files[0])
    }

    const handleAuthorId =(event) =>{
        setAuthorId(event.target.value)
    }

    const handleCategoryId =(event) =>{
        setCategoryId(event.target.value)
    }

    const handleDiscountId =(event) =>{
        setDiscountId(event.target.value)
    }

    const handleStockCount =(event) =>{
        setStockCount(event.target.value)
    }

    const handleBookPrice =(event) =>{
        setBookPrice(event.target.value)
    }

    const handlePublisherId= (event) =>{
        setPublisherId(event.target.value)
    }


    const getAllAuthors = async () =>{
        const response = await getRequest("/authors")
        if(response){
            console.log("All the authors fetched successfully");
            setAuthors(response.data);
        }else{
            console.log("Something went wrong with fetching authors")
        }
    }

    const getAllCategories = async () =>{
        const response = await getRequest("/categories")
        if(response){
            console.log("All categories fetched successfully");
            setCategories(response.data);
        }else{
            console.log("Something went wrong with fetching categories");
        }
    }

    const getAllDiscounts = async () =>{
        const response = await getRequest("/discounts")
        if(response){
            console.log("All discounts fetched successfully");
            setDiscounts(response.data)
        }else{
            console.log("Something went wrong with fetching discounts");
        }
    }

    const getAllPublishers = async () =>{
        const response = await getRequest("/publications")
        if(response){
            console.log("All publishers fetched successfully");
            setPublishers(response.data)
        }else{
            console.log("Something went wrong with fetching publishers");
        }
    }

    const getBookInfo = async ()=>{
        const response = await getRequest(`/books/${bookUpdateId}`)
        setBookId(response.data.bookId)
        setBookName(response.data.bookName)
        setBookImageUrl(response.data.bookImage)
        setStockCount(response.data.stockCount)
        setBookPrice(response.data.price)
        imageRef.current = response.data.bookImage;
        setAuthorId(response.data.author.authorId)
        setCategoryId(response.data.category.categoryId)
        setDiscountId(response.data.discount.discountId)
        setPublisherId(response.data.publisher.publisherId)
    }

    const updateBook = async (event) => {
        event.preventDefault()
            try {
                const bookDetails = {
                    "bookName": bookName,
                    "price": bookPrice,
                    "stockCount": stockCount,
                    "author": authorId,
                    "category":categoryId,
                    "discount": discountId,
                    "publisher": publisherId,
                }

                const bookInformation = new FormData();

                bookInformation.append("bookDetails", JSON.stringify(bookDetails))
                if(bookImage){
                    bookInformation.append("bookImage", bookImage)
                }

                const response = await putRequestFile(`/books/${bookUpdateId}`,bookInformation)

                if (response) {
                    getBookInfo()
                    setShowSuccessAlert(true)
                    setBookName("")
                    setBookImage(null)
                    setBookPrice(0.0)
                    setStockCount(0)
                    setCategoryId(0)
                    setAuthors(0)
                    setPublishers(0)
                    setDiscounts(0)

                    if (imageRef.current) {
                        imageRef.current.value = "";
                    }
                } else {
                    console.log("Something went wrong. Try again");
                }
            } catch (error) {
                console.log(error)
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

            <Container >
                    <Row  style={{backgroundColor: "#198452", color: "white", marginBottom: "5px"}}>
                        <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Update Book Information</h1>
                    </Row>

                <Row style={{display:"flex"}}>

                <Col xs={12} md={6} lg={4} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <img src={bookImageUrl} style={{height:"400px",width:"300px"}}/>
                </Col>

                <Col xs={12} md={6} lg={8}>
                <Row style={{display: "flex", marginTop: "40px"}}>
                    <Col>
                        <Form onSubmit={updateBook}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>
                                    Book Id
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" placeholder="Enter the name of the book" value={bookId}
                                                  readOnly={true}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>
                                    Book Name
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" placeholder="Enter the name of the book" value={bookName}
                                                  onChange={handleBookName}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formFile" className="mb-3">
                                <Form.Label column sm={2}>Book Image</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="file" ref={imageRef} onChange={handleBookImage}/>
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formGridState">
                                <Form.Label column sm={2}>Author</Form.Label>
                                <Col sm={8}>
                                    <Form.Select defaultValue="Choose the author..." onChange={handleAuthorId}
                                                 value={authorId}>
                                        {authors && authors.map(author => {
                                            return (
                                                <option value={author.authorId}>{author.authorName}</option>
                                            )
                                        })}
                                        <option value={0}>Other</option>

                                    </Form.Select>
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formGridState">
                                <Form.Label column sm={2}>Category</Form.Label>
                                <Col sm={8}>
                                    <Form.Select defaultValue="Choose the category..." onChange={handleCategoryId}
                                                 value={categoryId}>
                                        {categories && categories.map(category => {
                                            return (
                                                <option value={category.categoryId}>{category.categoryName}</option>
                                            )
                                        })}
                                        <option value={0}>Other</option>
                                    </Form.Select>

                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-3" controlId="formGridState">
                                <Form.Label column sm={2}>Discount</Form.Label>
                                <Col sm={8}>
                                    <Form.Select defaultValue="Choose the discount..." onChange={handleDiscountId}
                                                 value={discountId}>
                                        {discounts && discounts.map(discount => {
                                            return (
                                                <option value={discount.discountId}>{discount.discountType}</option>
                                            )
                                        })}
                                        <option value={0}>Other</option>
                                    </Form.Select>

                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>
                                    Stock Count
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="number" placeholder="Enter the available book count"
                                                  value={stockCount} onChange={handleStockCount}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>
                                    Book Price
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="number" step={0.01} placeholder="Enter the price of the book"
                                                  value={bookPrice} onChange={handleBookPrice}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formGridState">
                                <Form.Label column sm={2}>Publisher</Form.Label>
                                <Col sm={8}>
                                    <Form.Select defaultValue="Choose the publisher..." onChange={handlePublisherId}
                                                 value={publisherId}>
                                        {publishers && publishers.map(publisher => {
                                            return (
                                                <option value={publisher.publisherId}>{publisher.publisherName}</option>
                                            )
                                        })}
                                        <option value={0}>Other</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{span: 10, offset: 2}}>
                                    <Button type="submit" variant="success">Update Book</Button>
                                </Col>
                            </Form.Group>
                        </Form>

                    </Col>
                </Row>
                {showSuccessAlert &&
                    <div style={{margin: "auto", width: "50%"}}>
                        <Alert show={showSuccessAlert} variant="success" style={{display: "flex"}}>
                            <h5>
                                Book updated saved
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
                                <Button onClick={() => setShowValidationAlert(false)} variant="outline-danger">
                                    X
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

export default UpdateBook;