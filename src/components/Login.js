
import '../App.css';
import { useState, React } from 'react';
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function LoginForm() {

  const baseURL = "http://localhost:8080/MicroService-1.0-SNAPSHOT/api/employee/login";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var okstatus = 0;

  const handleChange_email = event => {
    setEmail(event.target.value);
  };

  const handleChange_password = event => {
     setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault(); //important to not reload page
    
    await axios.post(baseURL,
      {
        email: email,
        password: password
      }).then((response)=>{
        console.log(response);
        // handler(response.data);
        window.sessionStorage.setItem('user', JSON.stringify(response.data));
        window.location.reload(true);
      })
      .catch((error)=>{
        console.log(error);
        alert("Invalid Credentials");
      })

  }

  return (
    <>
    <div className="Container" style={{width:"50%", marginLeft:"25%"}}>    
    <h2>Admin Login</h2>
    <br />
     <Form onSubmit={handleSubmit} title="Admin Login">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" onChange={handleChange_email} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={handleChange_password} placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    </div>
    <div>
      
    </div>
    </>
    

  );
}

export default LoginForm;
