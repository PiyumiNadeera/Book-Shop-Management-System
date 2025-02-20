import {Col, Card, Row, Container, Form, Button} from 'react-bootstrap'
import DashboardCard from "../components/DashboardCard";
import CoverImage from "../assests/cover_image.png"
import {getRequest} from "../services/ApiServices";
import {useEffect, useState} from "react";

const Dashboard = () =>{

    const username = sessionStorage.getItem("adminUsername")

    const [books,setBooks] = useState([])
    const [authors,setAuthors] = useState([])
    const [categories,setCategories] = useState([])
    const [orders,setOrders] = useState([])
    const [revenue,setRevenue] = useState(0.0)
    const [date,setDate] = useState("")

    useEffect(() => {
        getAllBooks()
        getAllAuthors()
        getAllCategories()
        getAllOrders()

    }, []);

    useEffect(()=>{
        calculateRevenue()
    },[orders])

    useEffect(() => {
        showDate()
    }, [date]);

    const getAllBooks =async ()=>{
        try{
            const response = await getRequest("/books")
            if(response){
                setBooks(response.data)
            }
        }catch (error){
            console.log(error)
        }
    }

    const getAllAuthors = async ()=>{
        try{
            const response = await getRequest("/authors")
            if(response){
                setAuthors(response.data)
            }
        }catch (error) {
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

    const getAllOrders = async ()=>{
        try{
            const response = await getRequest("/orders")
            setOrders(response.data)
        }catch(error){
            console.log(error)
        }
    }

    const calculateRevenue =()=>{
        const totalRevenue = orders.reduce((currentTotal,order)=>currentTotal+order.price,0)
        setRevenue(totalRevenue)
    }

    const showDate =()=>{
        const today = new Date()
        setDate(`${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`)
    }

    const handleLogout =()=>{
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("adminId");
            sessionStorage.removeItem("adminUsername");
            window.location.href="/";
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
            <Container fluid>
                <Row style={{backgroundColor: "#198452", color: "white"}}>
                    <div style={{marginTop: "20px", display: "flex"}}>
                        <Col>
                            <h5>Dashboard</h5>
                            <p>Hello {username}...</p>
                        </Col>
                        <Col style={{display: "inline-flex", justifyContent: "right"}}>
                            <div>
                                <Button type="submit" variant="danger" style={{height: "35px"}} onClick={handleLogout}>Log Out</Button>
                                <p style={{textAlign:"end"}}>{date}</p>
                            </div>
                        </Col>
                    </div>
                </Row>

                <Row className="jumbotron py-5" style={{backgroundColor: "#a3ceba", height: "100%", marginTop: "20px", display: "flex"}}>
                        <Col xs={12} md={6} lg={9}  >
                            <div>
                                <h1 className="display-4 ">Welcome to the Admin Dashboard!</h1>
                                <h3 className="lead">Manage your bookstore with ease and efficiency!</h3>
                                <hr className="my-4"/>
                                <p>Add, update, or remove books, categories, authors, and publications—all in one place.
                                    <br/>
                                    Keep track of your inventory, sales, and customer interactions with intuitive,
                                    user-friendly
                                    tools.
                                    <br/><br/>
                                    Start managing your bookstore today and make your business run smoothly!
                                </p>
                            </div>
                        </Col>
                        <Col xs={12} md={6} lg={3} style={{margin: "auto"}}>
                            <img src={CoverImage} alt={"Cover Image"}
                                 style={{width: "300px", height: "300px"}}></img>
                        </Col>
                </Row>


                <Row style={{justifyContent: "center", margin: "auto"}} xs={1} md={2}>
                    <DashboardCard cardTitle={"Total Books"} cardValue={books.length} cardIcon={<svg
                        xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#198452"
                        className="bi bi-book" viewBox="0 0 16 16">
                        <path
                            d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                    </svg>}></DashboardCard>
                    <DashboardCard cardTitle={"Total Authors"} cardValue={authors.length} cardIcon={<svg
                        xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#198452"
                        className="bi bi-pen" viewBox="0 0 16 16">
                        <path
                            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                    </svg>}></DashboardCard>
                    <DashboardCard cardTitle={"Total Categories"} cardValue={categories.length} cardIcon={<svg
                        xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#198452"
                        className="bi bi-card-checklist" viewBox="0 0 16 16">
                        <path
                            d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                        <path
                            d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
                    </svg>}></DashboardCard>
                    <DashboardCard cardTitle={"Total Revenue"} cardValue={revenue.toFixed(2)} cardIcon={<svg
                        xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#198452"
                        className="bi bi-cash-coin" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
                        <path
                            d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
                        <path
                            d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
                        <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
                    </svg>}></DashboardCard>
                </Row>
            </Container>

        </>
    )
}

export default Dashboard;