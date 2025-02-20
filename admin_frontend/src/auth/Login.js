import {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import loginImage from "../assests/login.jpg"

const Login =()=>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    const navigate = useNavigate();


    const handleUsername = (event)=>{
        setUsername(event.target.value);
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }

    const handleSubmit =async (event)=>{
        event.preventDefault();

        const data ={
            username:username,
            password: password
        }

        try{
            const response = await axios.post("http://localhost:8080/admin/login",data);

            setError("");
            setUsername("");
            setPassword("");
            sessionStorage.setItem("token",response.data.token);
            sessionStorage.setItem("adminId",response.data.id);
            sessionStorage.setItem("adminUsername",response.data.username);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            navigate("/dashboard");
        }catch(error){
            if(error.response.status === 401){
                setError("Something went wrong. Please check the username and the password");
            }
        }
    }

    return(
      <Container fluid>
          <Row>
              <div style={{backgroundColor: "#00b074", padding: "10px"}}>
                  <h2 style={{paddingLeft: "10px", color: "white"}}>BOOKSCAPE</h2>
              </div>
          </Row>

          <Row style={{justifyContent: "center", display: "flex", marginTop: "40px"}}>
              <Col xs={12} md={4} lg={5} style={{margin: "auto"}}>
                  <img src={loginImage} alt={"Login image"} style={{height: "auto", width: "100%"}}></img>
              </Col>
              <Col lg={4} style={{margin: "auto"}}>
                  <div style={{border:"1px solid black",borderRadius:"10px",margin:"10px"}}>
                      <h1 style={{textAlign:"center",margin:"10px"}}>Login</h1>
                      <Form onSubmit={handleSubmit} style={{width: "auto",padding:"30px"}}>
                          <Form.Group className="mb-3" controlId="formBasicUsername">
                              <Form.Label><h6>Username</h6></Form.Label>
                              <Form.Control type="text" placeholder="Enter username" onChange={handleUsername} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label><h6>Password</h6></Form.Label>
                              <Form.Control type="password" placeholder="Password" onChange={handlePassword}/>
                          </Form.Group>
                          <Button variant="success" type="submit" >
                              Login
                          </Button>
                      </Form>
                      {error && <div className="text-danger">{error}</div>}

                  </div>
              </Col>
          </Row>
</Container>
)
    ;
}

export default Login;