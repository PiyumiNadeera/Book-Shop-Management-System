import {Button, Col, Container, Form, Offcanvas, Row, Table} from "react-bootstrap";
import CategoryCard from "../../components/CategoryCard";
import {useEffect, useState} from "react";
import {deleteRequest, getRequest, putRequestFile} from "../../services/ApiServices";
import {useNavigate} from "react-router-dom";


const Categories =() =>{

    const [books,setBooks] = useState([])
    const [categories,setCategories] = useState([])
    const [categoryId,setCategoryId] = useState(0)
    const [categoryName,setCategoryName] = useState("")
    const [categoryImage,setCategoryImage] = useState("")
    const [search,setSearch] = useState("")
    const [filteredCategories,setFilteredCategories] = useState([])
    const [show, setShow] = useState(false);

    const navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCategoryNameUpdate =(event)=>{
        setCategoryName(event.target.value)
    }

    const handleCategoryImageUpdate =(event) =>{
        setCategoryImage(event.target.files[0])
    }

    useEffect(() => {
        getAllBooks()
        getAllCategories()
    }, []);

    const getAllBooks = async ()=>{
        try{
            const response = await getRequest("/books")
            if(response){
                setBooks(response.data)
            }else{
                setBooks([])
            }
        }catch (error){
            console.log(error)
        }
    }

    const getAllCategories = async () =>{
        try{
            const response = await getRequest("/categories")
            if(response){
                setCategories(response.data)
            }
        }catch (error) {
            console.log(error)
        }

    }

    const getBookCount =(categoryName)=>{
        const categorizedBooks = books.filter(book => book.category.categoryName === categoryName)
        var bookCount = categorizedBooks.length
        return bookCount
    }

    const renderCategorizedBooks =(categoryName)=>{
        const categorizedBooks = books.filter(book => book.category.categoryName === categoryName)

        return(
            <>
                <Table responsive striped bordered hover >
                    <thead>
                    <tr>
                        <th>Book Id</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Discount</th>
                        <th>Stock Count</th>
                        <th>Price</th>
                        <th>Publisher</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categorizedBooks.map(book => {
                            return (
                                <>
                                    <tr key={book.bookId}>
                                        <td>{book.bookId}</td>
                                        <td>{book.bookName}</td>
                                        <td>{book.author.authorName}</td>
                                        <td>{book.discount.discountType}</td>
                                        <td>{book.stockCount}</td>
                                        <td>{book.price}</td>
                                        <td>{book.publisher.publisherName}</td>
                                    </tr>
                                </>
                            )
                    })}
                    < /tbody>
                </Table>
            </>
        )
    }

    const handleDelete = async (categoryId) =>{
        try{
            const response = await deleteRequest(`/categories/${categoryId}`)
            if(response){
                console.log("Category successfully deleted")
                window.location.reload()
            }
        }catch (error){
            console.log(error)
        }
    }

    const viewCategory =  (categoryId,categoryName,categoryImage) =>{
        setCategoryId(categoryId)
        setCategoryName(categoryName)
        setCategoryImage(categoryImage)
        handleShow()
    }

    const handleUpdate = async () =>{
        try{
            const formData = new FormData()

            formData.append("categoryName",categoryName);
            if(categoryImage){
                formData.append("categoryImage",categoryImage);
            }

            const response = await putRequestFile(`/categories/${categoryId}`,formData)
            if(response){
                console.log("Category successfully updated")
                window.location.reload()
            }
        }catch (error) {
            console.log(error)
        }
    }

    const handleSearch =(event)=>{
        setSearch(event.target.value)
    }

    const showSearchResults = (event) =>{
        event.preventDefault()
        const searchResults = categories.filter(category=>category.categoryName.toLowerCase().includes(search.toLowerCase()))
        setFilteredCategories(searchResults)
    }

    const handleClearSearch =(event)=>{
        event.preventDefault()
        setFilteredCategories([])
        setSearch("")
    }

    const handleRedirect =()=>{
        navigate("/addNewCategory");
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
                <Row style={{backgroundColor: "#198452", color: "white"}}>
                    <h1 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>Categories</h1>
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
                                        value={search}
                                        onChange={handleSearch}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button type="submit" variant="success m-1" onClick={showSearchResults}>Search</Button>
                                    <Button type="submit" variant="success m-1" onClick={handleClearSearch}>Clear Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col xs="auto" lg={4} style={{display:"flex",justifyContent:"right"}}>
                        <button type="button" className="btn btn-success m-1" onClick={handleRedirect}><h5>Add New Category</h5></button>
                    </Col>
                </Row>

                <Row>
                    {filteredCategories.length>0 &&  (
                        <>
                            <h5>Search Results</h5>
                            {filteredCategories.map(result=>(
                                <>
                                    <CategoryCard CardTitle={result.categoryName} CardImage={result.categoryImage} BookCount={getBookCount(result.categoryName)} HandleDeleteAction={()=>handleDelete(result.categoryId)} HandleUpdateAction={()=>
                                    {viewCategory(result.categoryId, result.categoryName, result.categoryImage)}}></CategoryCard>
                                </>
                            ))}
                        </>
                    )}
                </Row>

                <Row style={{backgroundColor: "#198452", color: "white",marginTop:"20px"}}>
                    <h4 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>All Categories</h4>
                </Row>

                <Row style={{marginTop: "10px"}}>
                    {categories.map(category=>(
                            <CategoryCard CardTitle={category.categoryName} CardImage={category.categoryImage} BookCount={getBookCount(category.categoryName)} HandleDeleteAction={()=>handleDelete(category.categoryId)} HandleUpdateAction={()=>
                            {viewCategory(category.categoryId, category.categoryName, category.categoryImage)}}></CategoryCard>
                    ))}
                </Row>

                {categories.map(category=> (
                   <>
                       <Row style={{backgroundColor: "#198452", color: "white",marginTop:"20px",marginBottom:"20px"}}>
                           <h4 style={{textAlign: "center", marginTop: "10px", marginBottom: "20px"}}>{category.categoryName}</h4>
                       </Row>

                       <Row>
                           {renderCategorizedBooks(category.categoryName)}

                       </Row>
                   </>
                ))}

            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton style={{backgroundColor:"#a3ceba"}}>
                    <Offcanvas.Title >Category Information</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <h4 style={{textAlign:"center", backgroundColor:"#a3ceba"}}>{categoryName}</h4>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <img src={categoryImage} alt="Book image" style={{width: "200px", height: "250px"}}/>
                    </div>
                    <Form onSubmit={handleUpdate} style={{marginTop:"20px"}}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Category Id
                            </Form.Label>
                            <Col >
                                <Form.Control type="text" value={categoryId}
                                              readOnly={true}/>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label >
                                New Category Name
                            </Form.Label>
                            <Col >
                                <Form.Control type="text" placeholder="Enter new category name " value={categoryName}
                                              onChange={handleCategoryNameUpdate}/>
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label >New Category Image</Form.Label>
                            <Col >
                                <Form.Control type="file" name="categoryImage" onChange={handleCategoryImageUpdate}/>
                            </Col>
                        </Form.Group>
                        <Button type="submit" variant={"success"} >Update</Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>

            </Container>
        </>
    )

}

export default Categories;
