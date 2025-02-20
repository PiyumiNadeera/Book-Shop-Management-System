import {Alert, Button, Col, Container, Form, Row, Toast} from "react-bootstrap";
import {useEffect, useState,useRef} from "react";
import {getRequest, postRequestFile} from "../../services/ApiServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import books from "./Books";

const AddNewBook =()=>{

    const [isAuthorVisible, setIsAuthorVisible] = useState(false)
    const [isCategoryVisible,setIsCategoryVisible] = useState(false)
    const [isDiscountVisible, setIsDiscountVisible] = useState(false)
    const [isPublisherVisible,setIsPublisherVisible] = useState(false)

    const [isAuthorChecked,setIsAuthorChecked] = useState(false)
    const [isCategoryChecked,setIsCategoryChecked] = useState(false)
    const [isDiscountChecked,setIsDiscountChecked] = useState(false)
    const [isPublisherChecked,setIsPublisherChecked] = useState(false)

    const [authors,setAuthors] = useState(null)
    const [categories,setCategories] = useState(null)
    const [discounts,setDiscounts] = useState(null)
    const [publishers,setPublishers] = useState(null)

    const [bookName,setBookName] = useState(null)
    const [bookImage,setBookImage] = useState(null)
    const [authorId, setAuthorId] = useState(0)
    const [authorName,setAuthorName] = useState(null)
    const [authorBio,setAuthorBio] =useState(null)
    const [categoryId,setCategoryId] = useState(0)
    const [categoryName,setCategoryName] = useState(null)
    const [discountId, setDiscountId] = useState(0)
    const [discountType,setDiscountType] = useState(null)
    const [discountValue,setDiscountValue] = useState(null)
    const [discountStartDate,setDiscountStartDate] = useState(new Date())
    const [discountEndDate,setDiscountEndDate] = useState(new Date())
    const [bookPrice,setBookPrice] = useState(null)
    const [stockCount,setStockCount] = useState(null)
    const [publisherId,setPublisherId] = useState(0)
    const [publisherName,setPublisherName] = useState(null)
    const [publisherAddress,setPublisherAddress] = useState(null)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showValidationAlert,setShowValidationAlert]=useState(false)

    const imageRef = useRef(null)


    useEffect(() => {
        getAllAuthors();
        getAllCategories();
        getAllDiscounts();
        getAllPublishers();
    }, [bookName]);

    const handleNewAuthor = (event)=>{
        setIsAuthorVisible(event.target.checked)
        setIsAuthorChecked(event.target.checked)
        setAuthorId(0)
    }

    const handleNewCategory =(event) =>{
        setIsCategoryVisible(event.target.checked)
        setIsCategoryChecked(event.target.checked)
        setCategoryId(0)
    }

    const handleNewDiscount =(event) =>{
        setIsDiscountVisible(event.target.checked)
        setIsDiscountChecked(event.target.checked)
        setDiscountId(0)
    }

    const handleNewPublisher =(event) =>{
        setIsPublisherVisible(event.target.checked)
        setIsPublisherChecked(event.target.checked)
        setPublisherId(0)
    }


    const handleBookName = (event) =>{
        setBookName(event.target.value)
    }

    const handleBookImage =(event) =>{
        setBookImage(event.target.files[0])
    }

    const handleAuthorId =(event) =>{
        setAuthorId(event.target.value)
    }

    const handleAuthorName =(event)=>{
        setAuthorName(event.target.value)
    }

    const handleAuthorBio =(event) =>{
        setAuthorBio(event.target.value)
    }

    const handleCategoryId =(event) =>{
        setCategoryId(event.target.value)
    }

    const handleCategoryName = (event) =>{
        setCategoryName(event.target.value)
    }

    const handleDiscountId =(event) =>{
        setDiscountId(event.target.value)
    }

    const handleDiscountType = (event) =>{
        setDiscountType(event.target.value)
    }

    const handleDiscountValue = (event) =>{
        setDiscountValue(event.target.value)
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

    const handlePublisherName=(event) =>{
        setPublisherName(event.target.value)
    }

    const handlePublisherAddress =(event) =>{
        setPublisherAddress(event.target.value)
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

    const addNewBook = async (event) => {
        event.preventDefault()
            if(bookName==="" || bookImage===null || bookPrice==="" || stockCount==="" ||
                ((isAuthorVisible ===true && authorId===0) && (authorName===null || authorBio===null)) || (isAuthorVisible===false && authorId===0)||
                (categoryId===0 && isCategoryVisible===true && categoryName===null)|| (isCategoryVisible===false && categoryId===0)||
                ((isDiscountVisible===true && discountId===0) && (discountType===null||discountValue===null||discountStartDate===null|| discountEndDate===null)) || (isDiscountVisible===false && discountId===0)||
                (isPublisherVisible===true && (publisherName===null||publisherAddress===null))||(isPublisherVisible===false && publisherId===0)){
                setShowValidationAlert(true)
            }else {

            try {
                const newAuthorDetails = (authorId === 0) ? {authorName: authorName, bio: authorBio} : null;
                const newCategoryDetails = (categoryId === 0) ? {categoryName: categoryName} : null;
                const newPublisherDetails = (publisherId === 0) ? {
                    publisherName: publisherName,
                    publisherAddress: publisherAddress
                } : null
                const newDiscountDetails = (discountId === 0) ? {
                    discountType: discountType,
                    discountValue: discountValue,
                    discountStartDate: discountStartDate,
                    discountEndDate: discountEndDate
                } : null

                const bookDetails = {
                    "bookName": bookName,
                    "price": bookPrice,
                    "stockCount": stockCount,
                    "author":
                        (authorId === 0) ? null : authorId,
                    "category":
                        (categoryId === 0) ? null : categoryId,
                    "discount":
                        (discountId === 0) ? null : discountId,
                    "publisher":
                        (publisherId === 0) ? null : publisherId,
                    "newAuthor": newAuthorDetails,
                    "newCategory": newCategoryDetails,
                    "newPublisher": newPublisherDetails,
                    "newDiscount": newDiscountDetails
                }

                const bookInfo = new FormData();

                bookInfo.append("bookDetails", JSON.stringify(bookDetails))
                bookInfo.append("bookImage", bookImage)

                console.log("BOOK INFO" + bookInfo)
                const response = await postRequestFile("/books", bookInfo);


                if (response) {
                    console.log("Book saved successfully");
                    setShowSuccessAlert(true)
                    setBookName("")
                    setBookImage(null)
                    setBookPrice("")
                    setStockCount("")
                    setAuthorName("")
                    setAuthorBio("")
                    setPublisherName("")
                    setPublisherAddress("")
                    setDiscountType("")
                    setDiscountValue("")
                    setDiscountStartDate(null)
                    setDiscountEndDate(null)
                    setCategoryName("")
                    setCategories(0)
                    setAuthors(0)
                    setPublishers(0)
                    setDiscounts(0)
                    setIsAuthorVisible(false)
                    setIsCategoryVisible(false)
                    setIsDiscountVisible(false)
                    setIsPublisherVisible(false)
                    setIsAuthorChecked(false)
                    setIsCategoryChecked(false)
                    setIsDiscountChecked(false)
                    setIsPublisherChecked(false)

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
                    <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Add New Books</h1>
                </Row>

                <Row style={{display: "flex", marginTop: "40px"}}>
                    <Col>
                        <Form onSubmit={addNewBook}>
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
                                    <Form.Select defaultValue="Choose the author..." onChange={handleAuthorId}>
                                        {authors && authors.map(author => {
                                            return (
                                                <option value={author.authorId}>{author.authorName}</option>
                                            )
                                        })}
                                        <option value={0}>Other</option>

                                    </Form.Select>
                                    <div className="form-check mt-3">
                                        <input className="form-check-input " type="checkbox" checked={isAuthorChecked}
                                               id="flexCheckDefault" onChange={handleNewAuthor}/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Add a new author
                                        </label>
                                        {isAuthorVisible &&
                                            <div>
                                                <Form.Group as={Row} className="my-3">
                                                    <Form.Label column sm={3}>
                                                        Author's Name
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="text"
                                                                      placeholder="Enter the name of the new author"
                                                                      value={authorName} onChange={handleAuthorName}/>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="mb-3">
                                                    <Form.Label column sm={3}>
                                                        Bio of the author
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="text"
                                                                      placeholder="Enter the bio of the new author"
                                                                      value={authorBio} onChange={handleAuthorBio}/>
                                                    </Col>
                                                </Form.Group>
                                            </div>
                                        }
                                    </div>
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formGridState">
                                <Form.Label column sm={2}>Category</Form.Label>
                                <Col sm={8}>
                                    <Form.Select defaultValue="Choose the category..." onChange={handleCategoryId}>
                                        {categories && categories.map(category => {
                                            return (
                                                <option value={category.categoryId}>{category.categoryName}</option>
                                            )
                                        })}
                                        <option value={0}>Other</option>
                                    </Form.Select>
                                    <div className="form-check mt-3">
                                        <input className="form-check-input " type="checkbox" checked={isCategoryChecked}
                                               id="flexCheckDefault" onChange={handleNewCategory}/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Add a new category
                                        </label>
                                        {isCategoryVisible &&
                                            <div>
                                                <Form.Group as={Row} className="my-3">
                                                    <Form.Label column sm={3}>
                                                        Category Name
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="text"
                                                                      placeholder="Enter the name of the new category"
                                                                      value={categoryName}
                                                                      onChange={handleCategoryName}/>
                                                    </Col>
                                                </Form.Group>
                                            </div>
                                        }
                                    </div>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-3" controlId="formGridState">
                                <Form.Label column sm={2}>Discount</Form.Label>
                                <Col sm={8}>
                                    <Form.Select defaultValue="Choose the discount..." onChange={handleDiscountId}>
                                        {discounts && discounts.map(discount => {
                                            return (
                                                <option value={discount.discountId}>{discount.discountType}</option>
                                            )
                                        })}
                                        <option value={0}>Other</option>
                                    </Form.Select>
                                    <div className="form-check mt-3">
                                        <input className="form-check-input " type="checkbox" checked={isDiscountChecked}
                                               id="flexCheckDefault" onChange={handleNewDiscount}/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Add a new discount
                                        </label>
                                        {isDiscountVisible &&
                                            <div>
                                                <Form.Group as={Row} className="my-3">
                                                    <Form.Label column sm={3}>
                                                        Discount Type
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="text"
                                                                      placeholder="Enter the type of the new discount"
                                                                      value={discountType}
                                                                      onChange={handleDiscountType}/>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="my-3">
                                                    <Form.Label column sm={3}>
                                                        Discount Value
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="number" step={0.01}
                                                                      placeholder="Enter the value of the new discount"
                                                                      value={discountValue}
                                                                      onChange={handleDiscountValue}/>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="my-3">
                                                    <Form.Label column sm={3}>
                                                        Discount Start Date
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <DatePicker selected={discountStartDate}
                                                                    onChange={(date) => setDiscountStartDate(date)}/>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="my-3">
                                                    <Form.Label column sm={3}>
                                                        Discount End Date
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <DatePicker selected={discountEndDate}
                                                                    onChange={(date) => setDiscountEndDate(date)}/>
                                                    </Col>
                                                </Form.Group>
                                            </div>
                                        }
                                    </div>
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
                                    <Form.Select defaultValue="Choose the publisher..." onChange={handlePublisherId}>
                                        {publishers && publishers.map(publisher => {
                                            return (
                                                <option value={publisher.publisherId}>{publisher.publisherName}</option>
                                            )
                                        })}
                                        <option value={0}>Other</option>
                                    </Form.Select>
                                    <div className="form-check mt-3">
                                        <input className="form-check-input " type="checkbox"
                                               checked={isPublisherChecked}
                                               id="flexCheckDefault" onChange={handleNewPublisher}/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Add a new publisher
                                        </label>
                                        {isPublisherVisible &&
                                            <div>
                                                <Form.Group as={Row} className="my-3">
                                                    <Form.Label column sm={3}>
                                                        Publisher Name
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="text"
                                                                      placeholder="Enter the name of the new publisher"
                                                                      value={publisherName}
                                                                      onChange={handlePublisherName}/>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="my-3">
                                                    <Form.Label column sm={3}>
                                                        Publisher address
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="text"
                                                                      placeholder="Enter the address of the new publisher"
                                                                      value={publisherAddress}
                                                                      onChange={handlePublisherAddress}/>
                                                    </Col>
                                                </Form.Group>
                                            </div>
                                        }
                                    </div>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Col sm={{span: 10, offset: 2}}>
                                    <Button type="submit" variant="success">Save Book</Button>
                                </Col>
                            </Form.Group>
                        </Form>

                    </Col>
                </Row>
                {showSuccessAlert &&
                    <div style={{margin: "auto", width: "50%"}}>
                        <Alert show={showSuccessAlert} variant="success" style={{display: "flex"}}>
                            <h5>
                                Book successfully saved
                            </h5>

                            <div className="d-flex justify-content-end" style={{marginLeft: "auto"}}>
                                <Button onClick={() => {setShowSuccessAlert(false)}} variant="outline-success">
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

            </Container>


        </>
    )

}

export default AddNewBook;